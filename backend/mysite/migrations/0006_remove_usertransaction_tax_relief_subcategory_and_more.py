# Generated by Django 5.1.3 on 2024-11-30 06:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0005_transactioninvoice_document_einvoice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usertransaction',
            name='tax_relief_subcategory',
        ),
        migrations.CreateModel(
            name='TransactionItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('e_invoice_reference_number', models.CharField(max_length=100, unique=True)),
                ('upload_document_reference_number', models.CharField(max_length=100, unique=True)),
                ('item_description', models.TextField()),
                ('amount_including_tax', models.DecimalField(decimal_places=2, max_digits=12)),
                ('tax_relief_subcategory', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mysite.taxreliefsubcategory')),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transaction_items', to='mysite.usertransaction')),
            ],
        ),
        migrations.AlterField(
            model_name='document',
            name='id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='document', serialize=False, to='mysite.transactionitem', to_field='upload_document_reference_number'),
        ),
        migrations.AlterField(
            model_name='einvoice',
            name='id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='e_invoice', serialize=False, to='mysite.transactionitem', to_field='e_invoice_reference_number'),
        ),
        migrations.DeleteModel(
            name='TransactionInvoice',
        ),
    ]
