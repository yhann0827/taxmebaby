from django.urls import path
from . import views

urlpatterns = [
    path('tax-relief-categories/', views.list_tax_relief_cat, name='tax_relief_list'),
    path('user-transactions/', views.list_user_transactions, name='user_transaction_list'),
    path('analyze_item/', views.analyze_item, name='analyze_item'),
    path('transaction-items/', views.get_transaction_items, name='get_transaction_items'),
    path('transactions/labeled/', views.list_labeled_transaction, name='list_labeled_transaction'),
    path('transactions/unlabeled/', views.list_unlabeled_transaction, name='list_unlabeled_transaction'),
    path('plans/', views.get_plans, name='get_plans'),
    path('create-plan/', views.create_plan, name='create_plan'),
    path('create_items_from_invoice/', views.create_items_from_invoice, name='create_items_from_invoice'),
    path('analyse_user_plans/', views.analyse_user_plans, name='analyse_user_plans')
]
