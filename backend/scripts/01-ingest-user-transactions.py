from mysite.models import UserTransaction
import pandas as pd
from datetime import datetime


def run():
    df = pd.read_excel('data/01-transaction-mock-data.xlsx')

    for index, row in df.iterrows():
        transaction_id = row['Transaction Id']
        source = row['Source']
        account = row['Account Number']
        # date = datetime.strptime(row['Date'], "%m/%d/%Y").date()
        date = row['Date']
        transaction_description = row['Transaction Description']
        transaction_remarks = row['Transaction Remarks']
        amount_including_tax = float(row['Amount incl Tax'])
        if row['CR/DR'] == "CR":
            transaction_type = "credit"
        elif row['CR/DR'] == "DR":
            transaction_type = "debit"

        UserTransaction.objects.create(
            transaction_id=transaction_id,
            source=source,
            account=account,
            date=date,
            transaction_description=transaction_description,
            transaction_remarks=transaction_remarks,
            amount_including_tax=amount_including_tax,
            transaction_type=transaction_type
        )


        if index % 500 == 0:
            print(f"Processing row {index}...")