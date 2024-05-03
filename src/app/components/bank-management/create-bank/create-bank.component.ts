import { Component } from '@angular/core';
import { BankService } from '../../../services/bank-service/bank.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Bank } from '../../../models/bank';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-bank',
  standalone: true,
  imports: [FormsModule,MatIcon,DragDropModule,ReactiveFormsModule],
  templateUrl: './create-bank.component.html',
  styleUrl: './create-bank.component.css'
})
export class CreateBankComponent {

  bankForm: FormGroup; // Define a FormGroup to hold the form controls

  constructor(private fb: FormBuilder, private dialogRef:DialogRef, private bankService : BankService) {
    // Initialize the bank form with an instance of the Bank class
    const initialBank = new Bank('', '', '', '');
    this.bankForm = this.fb.group({
      codeBank: [initialBank.codeBank],
      socialRaison: [initialBank.socialRaison],
      codeComptable: [initialBank.codeComptable],
      rib: [initialBank.rib]
    });
  }

  onSubmit() {
    // Get the bank data from the form
    const bankData = this.bankForm.value;
    let resp = this.bankService.createBank(bankData);
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
