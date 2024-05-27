import { DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BankService } from '../../../services/bank-service/bank.service';
import { Bank } from '../../../models/bank';
import { DecaissementService } from '../../../services/encaissement-service/decaissement.service';

@Component({
  selector: 'app-add-decaissement',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, DragDropModule, ReactiveFormsModule],
  templateUrl: './add-decaissement.component.html',
  styleUrl: './add-decaissement.component.css'
})
export class AddDecaissementComponent implements OnInit {
  decaissementForm: FormGroup;
  selectedBank: Bank | undefined;
  banks: any;

  constructor(private decaissementService: DecaissementService, private fb: FormBuilder, private dialogRef: DialogRef, private bankService: BankService) {
    this.decaissementForm = this.fb.group({
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

  ngOnInit() {
    this.getAllBanks();
  }

  onSubmit() {
    if (this.decaissementForm.valid) {
      const decData = this.decaissementForm.value;
      this.decaissementService.createDecaissement(decData).subscribe(
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
    });
  }
}
