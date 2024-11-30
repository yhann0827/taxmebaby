from django.contrib import admin
from .models import TaxReliefSubcategory, UserTransaction, TransactionItem, EInvoice, Document

@admin.register(TaxReliefSubcategory)
class TaxReliefSubcategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'current_amount', 'maximum_amount')
    list_editable = ('current_amount',)

@admin.register(UserTransaction)
class UserTransactionAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'source', 'date', 'transaction_type', 'amount_including_tax')
    search_fields = ('transaction_id', 'source')

# Register the TransactionItem model
@admin.register(TransactionItem)
class TransactionItemAdmin(admin.ModelAdmin):
    list_display = ('e_invoice_reference_number', 'upload_document_reference_number', 'transaction', 'item_description', 'amount_including_tax', 'tax_relief_subcategory')
    search_fields = ('e_invoice_reference_number', 'item_description', 'transaction__transaction_id')

# E-Invoice Admin
@admin.register(EInvoice)
class EInvoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'file_path')
    search_fields = ('id__e_invoice_reference_number',)

# Document Admin
@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'path')
    search_fields = ('id__upload_document_reference_number',)