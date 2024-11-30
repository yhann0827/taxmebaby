import json
from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import TaxReliefSubcategory, UserTransaction, TransactionItem, Plan, Invoice
from .utils import categorize_created_items, perform_ocr, query_gpt_for_planning_analysis
from .utils import categorize_transaction_items, perform_ocr, query_gpt_for_planning_analysis
from rest_framework.views import APIView


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
        })

    # Return the data as JSON
    return JsonResponse(data, safe=False)

# @csrf_exempt
# def analyze_item(request):
#     if request.method == "POST":
#         categorize_transaction_items()
#         # Return a success response
#         return JsonResponse({"message": "Transaction items categorization process started."}, status=200)
#     else:
#         return JsonResponse({"error": "Invalid request method."}, status=405)


def get_transaction_items(request):
    transaction_items = TransactionItem.objects.all()

    transaction_items_data = []
    for item in transaction_items:
        # Check if the tax_relief_subcategory exists, and if it does, get the category display
        tax_relief_category_display = (
            item.tax_relief_subcategory.get_category_display() if item.tax_relief_subcategory else None
        )

        # Similarly, ensure related fields are accessed safely without select_related
        invoice = item.invoice
        user_transaction = invoice.user_transaction if invoice else None

        item_data = {
            "item_description": item.item_description,
            "amount_including_tax": str(item.amount_including_tax),
            "tax_relief_subcategory": tax_relief_category_display,  # Use the display name
            "transaction": {
                "transaction_id": user_transaction.transaction_id if user_transaction else None,
                "transaction_date": user_transaction.date.strftime('%Y-%m-%d') if user_transaction else None,  # Format the date to string if available
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
        category = plan.get_category_display()
        plan_data = {
            "title": plan.title,
            "category": category,
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


def list_labeled_transaction(request):
    labeled_transactions = UserTransaction.objects.filter(is_deductable=True)
    data = [
        {
            "transaction_id": transaction.transaction_id,
            "source": transaction.source,
            "account": transaction.account,
            "date": transaction.date,
            "transaction_description": transaction.transaction_description,
            "transaction_remarks": transaction.transaction_remarks,
            "amount_including_tax": float(transaction.amount_including_tax),
            "transaction_type": transaction.transaction_type,
        }
        for transaction in labeled_transactions
    ]
    return JsonResponse({"labeled_transactions": data}, safe=False)


def list_unlabeled_transaction(request):
    unlabeled_transactions = UserTransaction.objects.filter(is_deductable=False)
    data = [
        {
            "transaction_id": transaction.transaction_id,
            "source": transaction.source,
            "account": transaction.account,
            "date": transaction.date,
            "transaction_description": transaction.transaction_description,
            "transaction_remarks": transaction.transaction_remarks,
            "amount_including_tax": float(transaction.amount_including_tax),
            "transaction_type": transaction.transaction_type,
        }
        for transaction in unlabeled_transactions
    ]
    return JsonResponse({"unlabeled_transactions": data}, safe=False)

def invoice_transaction_items(request, transaction_id):
    try:
        transaction = UserTransaction.objects.get(transaction_id=transaction_id)
        items = TransactionItem.objects.filter(transaction=transaction).values(
            "id", "item_description", "amount_including_tax", "tax_relief_subcategory__category"
        )

        return JsonResponse({"transaction_id": transaction_id, "items": list(items)}, safe=False)
    except UserTransaction.DoesNotExist:
        return JsonResponse({"error": "Transaction not found"}, status=404)


def analyse_user_plans(request):
    try:
        tax_relief_subcategories = TaxReliefSubcategory.objects.filter(current_amount__gt=0)
        tax_relief_subcategories = [subcat for subcat in tax_relief_subcategories if subcat.category not in ['individual_dependents', 'disabled_equipment', 'epf', 'socso', 'sspn', 'donation_gift']]
        plans = Plan.objects.all()

        query = """You are now a financial planner that specialises in tax. Your role is to help customers maximise the tax relief offered by the government in order for the customer to pay as least amount of tax as possible. The following information about the Malaysian tax relief as well as its maximum amount of claims are as follows:
        1. Education Fee for Self: 7000
        2. Medical Expenses for Self, Spouse or Children: 10000
        3. Medical Expenses for Parent: 8000
        4. Life Insurance: 3000
        5. Education & Medical Insurance: 3000
        6. Private Retirement Scheme (PRS): 3000
        7. Lifestyle (Reading Materials, Electronics, Internet, etc.: 2500
        8. Lifestyle - Additional Relief for Sports Activity: 500
        9. Electric Vehicle Charging Facilities: 2500

        This particular user has only utilise the following certain tax relief to a certain extent, as detailed below:
        """

        for idx in range(len(tax_relief_subcategories)):
            subcategory = tax_relief_subcategories[idx]
            query += f"{idx+1}. {subcategory.get_category_display()}: {subcategory.current_amount}\n"

        query += "\nGiven that the following user plans to make the following purchases now, recommend steps for the user to maximise tax relief. If the users have already fully utilise certain tax relief categories, recommend the user to make the purchase next year. Additionally, give recommendations for tax relief categories that the users have not utilise. Bear in mind that this user is a fresh graduate, and earns a monthly salary of 4500 in Malaysia.\n"

        for idx in range(len(plans)):
            plan = plans[idx]
            query += f"{idx+1}. {plan.title} which costs {plan.price}\n"

        query += "\nGive your response in JSON format. The JSON output should have 2 keys: ‘planned_purchases’ and ‘additional recommendations’. Each of the planned_purchases should have ‘item’, ‘cost’, ‘action’ and ‘comment’ as keys. Each of the additional_recommendations should have ‘category’, ‘action’ and ‘comment’ as keys."
        response = query_gpt_for_planning_analysis(query)

        return JsonResponse({"message": "Items have been successfully extracted from invoices.", "response": response}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Enountered error. {e=}"}, status=500)


class UploadPDFView(APIView):
    def post(self, request):
        try:
            file_path = request.data.get('file_path')
            user_transaction_id = int(request.data.get('user_transaction_id'))

            user_transaction = UserTransaction.objects.filter(transaction_id=user_transaction_id).first()

            Invoice.objects.create(
                file_path=file_path,
                user_transaction=user_transaction,
                is_e_invoice=True,
            )
            return JsonResponse({"success": True}, status=200)

        except Exception as e:
            return JsonResponse({"success": False, "error": e}, status=400)


