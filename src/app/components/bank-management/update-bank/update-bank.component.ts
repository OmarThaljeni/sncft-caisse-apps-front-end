import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankService } from '../../../services/bank-service/bank.service';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-bank',
  standalone: true,
  imports: [FormsModule,MatIcon,DragDropModule,ReactiveFormsModule],
  templateUrl: './update-bank.component.html',
  styleUrl: './update-bank.component.css'
})
export class UpdateBankComponent {
  bankForm: FormGroup; // Define a FormGroup to hold the form controls

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateBankComponent>,
    private bankService: BankService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bankForm = this.fb.group({
      codeBank: [data.codeBank, Validators.required],
      socialRaison: [data.socialRaison, Validators.required],
      codeComptable: [data.codeComptable, Validators.required],
      rib: [data.rib, Validators.required]
    });
  }

  onSubmit() {
    if (this.bankForm.valid) {
      const bankData = this.bankForm.value;
      console.log(bankData);
      
      this.bankService.updateBank(this.data.id,bankData)
        .subscribe(res => {
          this.dialogRef.close(res);
          window.location.reload();
        }, error => {
          console.error('Error updating bank:', error);
        });
    } else {
      // Form is invalid, handle validation errors
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  
}
