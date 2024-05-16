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
  selectedBank : Bank | undefined;
  banks: any;

  constructor(private encaissmentService: EncaissmentService,private fb: FormBuilder, private dialogRef: DialogRef, private bankService: BankService) {
    const initialTransaction = {
      ref: '',
      matricule: '',
      fullname: '',
      cin: '',
      motif: '',
      somme: '',
      banque: this.selectedBank // Assuming banque is a complex object and will be handled separately
    };

    this.transactionForm = this.fb.group({
      ref: [initialTransaction.ref],
      matricule: [initialTransaction.matricule],
      fullname: [initialTransaction.fullname],
      cin: [initialTransaction.cin],
      motif: [initialTransaction.motif],
      somme: [initialTransaction.somme],
      bank: [initialTransaction.banque]
      // You may handle 'banque' separately depending on its structure and input method
    });
  }
  ngOnInit() {
    this.getAllBanks();
  }

  onSubmit() {
    // Get the bank data from the form
    const encData = this.transactionForm.value;
    console.log(this.transactionForm);
    let resp = this.encaissmentService.createEncaissment(encData);
    resp.subscribe(res => {
      this.dialogRef.close();
      window.location.reload();
    },
  error => {
    console.log(error.error);
  }
  )
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
