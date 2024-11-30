from django.contrib import admin
from .models import TaxReliefSubcategory, UserTransaction, TransactionItem, Plan, Invoice

@admin.register(TaxReliefSubcategory)
class TaxReliefSubcategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(UserTransaction)
class UserTransactionAdmin(admin.ModelAdmin):
    search_fields =['transaction_id']

@admin.register(TransactionItem)
class TransactionItemAdmin(admin.ModelAdmin):
    pass

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    pass


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    pass
