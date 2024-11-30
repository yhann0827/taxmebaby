import json
import openai
import pdfplumber
import os
from dotenv import load_dotenv


load_dotenv("../.env")


def categorize_transaction_items():
    pass


def perform_ocr(file_path):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    try:
        extracted_text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text()

        query = """Given the content of the invoice, extract each item name, price and the total price paid for each item.
        Return the result in JSON format only. The output JSON should only have 'item', 'price_per_unit' and 'total_price' as keys.
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
        return extracted_response_json

        # save to db

    except json.JSONDecodeError:
        return extracted_response
    except Exception as e:
        return f"Error: {e}"