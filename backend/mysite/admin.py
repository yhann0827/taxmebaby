from django.contrib import admin
from .models import TaxReliefSubcategory, UserTransaction, TransactionItem, EInvoice, UploadedInvoice

@admin.register(TaxReliefSubcategory)
class TaxReliefSubcategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(UserTransaction)
class UserTransactionAdmin(admin.ModelAdmin):
    search_fields =['transaction_id']



@admin.register(TransactionItem)
class TransactionItemAdmin(admin.ModelAdmin):
    pass

@admin.register(EInvoice)
class EInvoiceAdmin(admin.ModelAdmin):
    pass


@admin.register(UploadedInvoice)
class UploadedInvoiceAdmin(admin.ModelAdmin):
    pass
