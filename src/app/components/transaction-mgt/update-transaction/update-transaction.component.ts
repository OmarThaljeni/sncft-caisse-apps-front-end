import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../../services/transaction-service/transaction.service';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-update-transaction',
  standalone: true,
  imports: [FormsModule,MatIcon,DragDropModule,ReactiveFormsModule],
  templateUrl: './update-transaction.component.html',
  styleUrl: './update-transaction.component.css'
})
export class UpdateTransactionComponent {
  transactionForm: FormGroup; // Define a FormGroup to hold the form controls

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTransactionComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transactionForm = this.fb.group({
      codeTransaction: [data.codeTransaction, Validators.required],
      nomTransaction: [data.nomTransaction, Validators.required],
      typeOperation: [data.typeOperation, Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      
      this.transactionService.updateTransaction(this.data.id,transactionData)
        .subscribe(res => {
          this.dialogRef.close(res);
          window.location.reload();
        }, error => {
          console.error('Error updating bank:', error);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}