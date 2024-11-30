from django.db import models
from django.core.exceptions import ValidationError

class TaxReliefSubcategory(models.Model):
    CATEGORY_CHOICES = [
        ('individual_dependents', 'Individual & Dependent Relatives'),
        ('education_fee', 'Education Fee for Self'),
        ('disabled_equipment', 'Equipment for Disabled Person'),
        ('medical_self_family', 'Medical Expenses for Self, Spouse or Children'),
        ('medical_parent', 'Medical Expenses for Parent'),
        ('epf', 'EPF'),
        ('socso', 'SOCSO'),
        ('life_insurance', 'Life Insurance'),
        ('education_medical_insurance', 'Education & Medical Insurance'),
        ('prs', 'Private Retirement Scheme (PRS)'),
        ('sspn', 'SSPN'),
        ('lifestyle', 'Lifestyle (Reading Materials, Electronics, Internet, etc.)'),
        ('lifestyle_sports', 'Lifestyle - Additional Relief for Sports Activity'),
        ('ev_charging', 'Electric Vehicle Charging Facilities'),
        ('donation_gift', 'Donation / Gift'),
    ]

    category = models.CharField(max_length=50, choices=[(c[0], c[1]) for c in CATEGORY_CHOICES], unique=True)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    maximum_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # New field to store the maximum amount

    def clean(self):
        # Ensure current amount does not exceed maximum amount
        if self.current_amount > self.maximum_amount:
            raise ValidationError(
                f"Current amount (RM {self.current_amount}) cannot exceed maximum amount (RM {self.maximum_amount})."
            )

    def __str__(self):
        return f"{self.get_category_display()} - Current: RM {self.current_amount}, Max: RM {self.maximum_amount}"


class UserTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    ]

    transaction_id = models.CharField(max_length=100, unique=True, primary_key=True)
    source = models.CharField(max_length=255)
    account = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateField()
    transaction_description = models.TextField()
    transaction_remarks = models.TextField(null=True, blank=True)
    amount_including_tax = models.DecimalField(max_digits=12, decimal_places=2)

    transaction_type = models.CharField(max_length=6, choices=TRANSACTION_TYPE_CHOICES)

    def __str__(self):
        return self.transaction_id


class EInvoice(models.Model):
    file_path = models.FileField(upload_to='e_invoices/')


class UploadedInvoice(models.Model):
    file_path = models.FileField(upload_to='uploaded_invoices/')


class TransactionItem(models.Model):
    e_invoice_reference_number = models.ForeignKey(
        EInvoice,
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    upload_document_reference_number = models.ForeignKey(
        UploadedInvoice,
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    transaction = models.ForeignKey(
        UserTransaction,
        on_delete=models.CASCADE
    )
    item_description = models.TextField()
    amount_including_tax = models.DecimalField(max_digits=12, decimal_places=2)
    tax_relief_subcategory = models.ForeignKey(
        'TaxReliefSubcategory',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
