from django.urls import path
from . import views

urlpatterns = [
    path('tax-relief-categories/', views.list_tax_relief_cat, name='tax_relief_list'),
    path('user-transactions/', views.list_user_transactions, name='user_transaction_list'),  # New URL for user transactions
    # path('analyze_item/', views.analyze_item, name='analyze_item'),
    path('transaction-items/', views.get_transaction_items, name='get_transaction_items'),
]
