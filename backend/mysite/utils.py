import json
import openai
import pdfplumber
import os
from dotenv import load_dotenv
from django.db import transaction

from .models import Invoice, TransactionItem


load_dotenv()


def categorize_transaction_items():
    pass


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

