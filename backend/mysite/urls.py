from django.urls import path
from . import views

urlpatterns = [
    path('tax-relief-categories/', views.list_tax_relief_cat, name='tax_relief_list'),
    path('user-transactions/', views.list_user_transactions, name='user_transaction_list'),
    # path('analyze_item/', views.analyze_item, name='analyze_item'),
    path('transaction-items/', views.get_transaction_items, name='get_transaction_items'),
    path('plans/', views.get_plans, name='get_plans'),
    path('create-plan/', views.create_plans, name='create_plans'),
    # path('extract_items_from_invoice/', views.extract_items_from_invoice, name='extract_items_from_invoice')
]
