import { DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BankService } from '../../../services/bank-service/bank.service';
import { Bank } from '../../../models/bank';
import { EncaissmentService } from '../../../services/encaissement-service/encaissment.service';

@Component({
  selector: 'app-add-encaissment',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, DragDropModule, ReactiveFormsModule],
  templateUrl: './add-encaissment.component.html',
  styleUrl: './add-encaissment.component.css'
})
export class AddEncaissmentComponent implements OnInit {
  transactionForm: FormGroup;
  selectedBank: Bank | undefined;
  banks: any;

  constructor(private encaissmentService: EncaissmentService, private fb: FormBuilder, private dialogRef: DialogRef, private bankService: BankService) {
    {
      this.transactionForm = this.fb.group({
        ref: [''],
        matricule: [''],
        fullname: [''],
        cin: [''],
        motif: [''],
        somme: [''],
        status: [''],
        banqueName: [''] // Assuming bank_id is part of your form
      });
    }
  }


  ngOnInit() {
    this.getAllBanks();
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const encData = this.transactionForm.value;
      console.log(encData);

      this.encaissmentService.createEncaissment(encData).subscribe(
        res => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAllBanks() {
    let resp = this.bankService.getAllBanks();
    resp.subscribe(res => {
      this.banks = res;
      console.log(res);
    })
  }
}
