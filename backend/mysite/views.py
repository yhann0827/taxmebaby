import json
from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import TaxReliefSubcategory, UserTransaction, TransactionItem, Plan, Invoice
from .utils import categorize_transaction_items, perform_ocr


def list_tax_relief_cat(request):
    # Query all the TaxReliefSubcategory records
    tax_reliefs = TaxReliefSubcategory.objects.all()

    # Prepare the data to return
    data = []
    for relief in tax_reliefs:
        # Convert category to a human-readable format
        category_display = relief.get_category_display()

        # Append formatted data
        data.append({
            'category': category_display,
            'current_amount': relief.current_amount,
            'maximum_amount': relief.maximum_amount
        })

    # Return the data as JSON
    return JsonResponse(data, safe=False)


def list_user_transactions(request):
    # Query all the UserTransaction records
    user_transactions = UserTransaction.objects.all()

    # Prepare the data to return
    data = []
    for transaction in user_transactions:
        data.append({
            'transaction_id': transaction.transaction_id,
            'source': transaction.source,
            'date': transaction.date,
            'transaction_description': transaction.transaction_description,
            'transaction_remarks': transaction.transaction_remarks,
            'amount_including_tax': str(transaction.amount_including_tax),
            'transaction_type': transaction.transaction_type,  # Assuming transaction_type is a field in UserTransaction
            'tax_relief_subcategory': transaction.tax_relief_subcategory.category if transaction.tax_relief_subcategory else None  # If subcategory exists, include it
        })

    # Return the data as JSON
    return JsonResponse(data, safe=False)


@csrf_exempt
def analyze_item(request):
    if request.method == "POST":
        # Call the function to categorize transaction items
        categorize_transaction_items()
        # Return a success response
        return JsonResponse({"message": "Transaction items categorization process started."}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def get_transaction_items(request):
    transaction_items = TransactionItem.objects.all()

    transaction_items_data = []
    for item in transaction_items:
        item_data = {
            "item_description": item.item_description,
            "amount_including_tax": str(item.amount_including_tax),
            "tax_relief_subcategory": item.tax_relief_subcategory.category if item.tax_relief_subcategory else None,
            "transaction": {
                "transaction_id": item.invoice.user_transaction.transaction_id,
                "transaction_date": item.invoice.user_transaction.date.strftime('%Y-%m-%d'),  # Format the date to string
            }
        }

        transaction_items_data.append(item_data)

    return JsonResponse(transaction_items_data, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def create_plan(request):
    try:
        # extract the required fields
        data = json.loads(request.body)

        title = data.get('title')
        category = data.get('category')
        price = data.get('price')
        date = data.get('date')

        if not all([title, category, price, date]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # convert the date string to a datetime object
        try:
            parsed_date = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=400)

        item = Plan.objects.create(
            title=title,
            category=category,
            price=price,
            date=parsed_date
        )

        return JsonResponse({
            'success': True,
            'data': {
                'id': item.id,
                'title': item.title,
                'category': item.category,
                'price': str(item.price),
                'date': item.date.strftime('%Y-%m-%d')
            }
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def get_plans(request):
    plans = Plan.objects.all()

    plans_data = []
    for plan in plans:
        plan_data = {
            "title": plan.title,
            "category": plan.category,
            "price": plan.price,
            "date": plan.date
        }

        plans_data.append(plan_data)

    return JsonResponse(plans_data, safe=False)


@csrf_exempt
def create_items_from_invoice(request):
    if request.method == "POST":
        data = json.loads(request.body)
        invoice_id = data.get('invoice_id')
        file_path = Invoice.objects.filter(id=invoice_id).first().file_path

        extracted_response_json = perform_ocr(invoice_id, file_path)

        return JsonResponse({"message": "Items have been successfully extracted from invoices.", "response": extracted_response_json}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)
