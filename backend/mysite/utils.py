import json
import openai
import pdfplumber
import os
from dotenv import load_dotenv
from django.db import transaction

from .models import Invoice, TransactionItem, TaxReliefSubcategory, UserTransaction


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
        Only return the response in a list of JSON objects, where the keys of each JSON object are "item" which indicates the item names and "category" which indicates the Tax Relief category.
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


def categorize_created_items(items):
    try:
        item_descriptions = [{"id": item.id, "description": item.item_description} for item in items]
        descriptions = [desc["description"] for desc in item_descriptions]

        response = identify_tax_relief_categories(descriptions)
        print(f"{response=}")
        # [{'item': 'Bowling Ball', 'category': 'Additional lifestyle expenses for sports activities (including bowling ball)'}]

        for item in items:
            category_name = None
            for entry in response:
                if entry["item"] == item.item_description:
                    category_name = entry["category"]
                    break

            if category_name:
                if category_name == "Additional lifestyle expenses for sports activities (including bowling ball)":
                    category_name = "lifestyle_sports"
                elif category_name == "Lifestyle expenses (incl Luxury Items like smartphones, laptop, tablet etc.)":
                    category_name = "lifestyle"
                elif category_name == "Net deposit in Skim Simpanan Pendidikan Nasional (SSPN)":
                    category_name = "sspn"
                elif category_name == "Life insurance and EPF contributions":
                    category_name = "life_insurance"
                elif category_name == "Deferred Annuity and Private Retirement Scheme (PRS)":
                    category_name = "prs"
                elif category_name == "Medical treatment, special needs, and carer expenses for parents (Medical condition certified by a medical practitioner)":
                    category_name = "medical_parent"
                elif category_name == "Purchase of basic supporting equipment for disabled self, spouse, child, or parent":
                    category_name = "disabled_equipment"
                elif category_name == "Education fees (Self)":
                    category_name = "education_fee"
                elif category_name == "Medical expenses":
                    category_name = "medical_parent"
                elif category_name == "Expenses on medical and mental health examinations":
                    category_name = "medical_self_family"
                elif category_name == "Education and medical insurance":
                    category_name = "education_medical_insurance"
                elif category_name == "Contribution to the Social Security Organization (SOCSO)":
                    category_name = "socso"
                elif category_name == "Expenses on charging facilities for Electric Vehicles (EV) (not for business use)":
                    category_name = "ev_charging"

                subcategory = TaxReliefSubcategory.objects.filter(category=category_name).first()
                if subcategory:
                    item.tax_relief_subcategory = subcategory
                    item.save()

    except Exception as e:
        print(f"Error during categorization: {e}")


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
        created_items = []
        for item_details in extracted_response_json:
            item = item_details.get("item", "")
            total_price = float(item_details.get("total_price", "0.0"))

            invoice = Invoice.objects.filter(id=invoice_id).first()
            user_transaction = invoice.user_transaction

            created_item=TransactionItem.objects.create(
                transaction = user_transaction,
                invoice = invoice,
                item_description = item,
                amount_including_tax = total_price,
            )
            created_items.append(created_item)

        # Step 4: Categorize the created items
        categorize_created_items(created_items)

        return {"message": "Items have been successfully processed and categorized.", "items": extracted_response_json}

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
