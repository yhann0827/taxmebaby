from django.urls import path
from . import views

urlpatterns = [
    # get tax relief subcategory
    path('tax-relief-categories/', views.list_tax_relief_cat, name='tax_relief_list'),
    # get user transactions
    path('user-transactions/', views.list_user_transactions, name='user_transaction_list'),
    path('transactions/labeled/', views.list_labeled_transaction, name='list_labeled_transaction'),
    path('transactions/unlabeled/', views.list_unlabeled_transaction, name='list_unlabeled_transaction'),
    # get transaction items
    path('transaction-items/', views.get_transaction_items, name='get_transaction_items'),
    path('invoice_transaction_items/<str:transaction_id>/', views.invoice_transaction_items, name='invoice_transaction_items'),
    # get plans
    path('plans/', views.get_plans, name='get_plans'),
    # post invoices
    path('upload-invoice/', views.UploadPDFView.as_view(), name='upload_invoice'),
    # post transaction items
    path('create_items_from_invoice/', views.create_items_from_invoice, name='create_items_from_invoice'),
    # post plans
    path('create-plan/', views.create_plan, name='create_plan'),
    # llm analyze plans
    path('analyse_user_plans/', views.analyse_user_plans, name='analyse_user_plans'),
]
