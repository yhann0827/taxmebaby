import json
import openai
import pdfplumber
import os
from dotenv import load_dotenv
from django.db import transaction

from .models import Invoice, TransactionItem, TaxReliefSubcategory


load_dotenv()

def identify_tax_relief_categories(items):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    query = """Here is a list containing all Tax Relief catagories offered by the government:
        [
            "Medical treatment, special needs, and carer expenses for parents (Medical condition certified by a medical practitioner)",
            "Purchase of basic supporting equipment for disabled self, spouse, child, or parent",
            "Education fees (Self)",
            "Medical expenses",
            "Expenses on medical and mental health examinations",
            "Lifestyle expenses (incl Luxury Items like smartphones, laptop, tablet etc.)",
            "Additional lifestyle expenses for sports activities (including bowling ball)",
            "Net deposit in Skim Simpanan Pendidikan Nasional (SSPN)",
            "Life insurance and EPF contributions",
            "Deferred Annuity and Private Retirement Scheme (PRS)",
            "Education and medical insurance",
            "Contribution to the Social Security Organization (SOCSO)",
            "Expenses on charging facilities for Electric Vehicles (EV) (not for business use)"
        ]
        Based on the information above, go through the following list of items and highlight only the items that may fall into any of the Tax Relief category. 
        Only return the response in JSON where the keys are "item" which indicates the item names and "category" which indicates the Tax Relief category.
        Return only an empty JSON if no item is found to be relevant to any of the categories.
    
    """
    query += str(items)
            
    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": query},
            ]
        )
        
        extracted_response = response.choices[0].message.content
        extracted_response_json = json.loads(extracted_response)
        return extracted_response_json
    
    except Exception as e:
        return f"Error: {e}"

@transaction.atomic
def categorize_transaction_items():
    uncategorized_items = TransactionItem.objects.filter(tax_relief_subcategory__isnull=True)
    
    item_descriptions = [{"id": item.id, "description": item.item_description} for item in uncategorized_items]
    print(item_descriptions)
    response = identify_tax_relief_categories([desc["description"] for desc in item_descriptions])
    print(response)

    for item in uncategorized_items:
        category_name = None
        for entry in response:
            if entry["item"] == item.item_description:
                category_name = entry["category"]
                break

        if category_name:
            if category_name == "Additional lifestyle expenses for sports activities (including bowling ball)":
                category_name = "lifestyle_sports"
            subcategory = TaxReliefSubcategory.objects.filter(category=category_name).first()
            if subcategory:
                item.tax_relief_subcategory = subcategory
                item.save()

@transaction.atomic
def perform_ocr(invoice_id, file_path):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    try:
        extracted_text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text()

        query = """Given the content of the invoice, extract each item name, price and the total price paid for each item.
        Return the result in JSON format only. The output JSON should only have 'item', 'price_per_unit' and 'total_price' as keys.
        The 'price_per_unit' and 'total_price' keys should only have float values.
        \nHere is the content of the attached document:\n\n"""

        query += extracted_text

        response = openai.chat.completions.create(
            model="gpt-4",
            messages = [
                {"role": "system", "content": "You are a document parser."},
                {"role": "user", "content": query},
            ]
        )

        extracted_response = response.choices[0].message.content
        extracted_response_json = json.loads(extracted_response)

        # [
        #     {
        #         "item": "Bowling Ball",
        #         "price_per_unit": "RM400.00",
        #         "total_price": "RM400.00"
        #     },
        #     {
        #         "item": "Red Cow Energy Drink",
        #         "price_per_unit": "RM42.50",
        #         "total_price": "RM85.00"
        #     }
        # ]
        for item_details in extracted_response_json:
            item = item_details.get("item", "")
            total_price = float(item_details.get("total_price", "0.0"))

            TransactionItem.objects.create(
                invoice = Invoice.objects.filter(id=invoice_id).first(),
                item_description = item,
                amount_including_tax = total_price,
            )

        return extracted_response_json

    except json.JSONDecodeError:
        return extracted_response
    except Exception as e:
        return f"Error: {e}"


def query_gpt_for_planning_analysis(query):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages = [
                {"role": "system", "content": "You are now a financial planner that specialises in tax."},
                {"role": "user", "content": query},
            ]
        )

        extracted_response = response.choices[0].message.content
        extracted_response_json = json.loads(extracted_response)
        return extracted_response_json

    except json.JSONDecodeError:
        return extracted_response
    except Exception as e:
        return f"Error: {e}"

