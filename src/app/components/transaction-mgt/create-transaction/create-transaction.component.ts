import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TransactionService } from '../../../services/transaction-service/transaction.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [FormsModule,MatIcon,DragDropModule,ReactiveFormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent {
  transactionForm: FormGroup; // Define a FormGroup to hold the form controls

  constructor(private fb: FormBuilder, private dialogRef:DialogRef, private transactionService : TransactionService) {
    // Initialize the bank form with an instance of the Bank class
    const initialTransactinon = new Transaction('', '', '');
    this.transactionForm = this.fb.group({
      codeTransaction: [initialTransactinon.codeTransaction],
      nomTransaction: [initialTransactinon.nomTransaction],
      typeOperation: [initialTransactinon.typeOperation],
    });
  }

  onSubmit() {
    // Get the bank data from the form
    const transactionData = this.transactionForm.value;
    let resp = this.transactionService.createTransaction(transactionData);
    resp.subscribe(res => {
      this.dialogRef.close();
      window.location.reload();
    },
  error => {
    console.log(error);
  }
  )
  }
  


  closeDialog(): void {
    this.dialogRef.close();
  }

}
