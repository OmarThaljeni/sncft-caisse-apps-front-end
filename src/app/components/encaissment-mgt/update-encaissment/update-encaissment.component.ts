import { DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BankService } from '../../../services/bank-service/bank.service';
import { EncaissmentService } from '../../../services/encaissement-service/encaissment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-encaissment',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, DragDropModule, ReactiveFormsModule],
  templateUrl: './update-encaissment.component.html',
  styleUrl: './update-encaissment.component.css'
})
export class UpdateEncaissmentComponent implements OnInit {
  transactionForm: FormGroup;
  banks: any;

  constructor(private encaissmentService: EncaissmentService,
     private fb: FormBuilder, 
     private dialogRef: DialogRef, 
     private bankService: BankService,
     @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.transactionForm = this.fb.group({
      ref: [data.ref],
      matricule: [data.matricule],
      fullname: [data.fullname],
      cin: [data.cin],
      motif: [data.motif],
      somme: [data.somme],
      banqueName: [data.banqueName]
    });
  }

  ngOnInit() {
    this.getAllBanks();
    this.loadEncaissmentData();
  }

  loadEncaissmentData() {
    this.encaissmentService.geEncaissmentById(this.data.id).subscribe(
      data => {
        this.transactionForm.patchValue(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const encData = this.transactionForm.value;
      console.log(encData);

      this.encaissmentService.updateEncaissment(this.data.id, encData).subscribe(
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
