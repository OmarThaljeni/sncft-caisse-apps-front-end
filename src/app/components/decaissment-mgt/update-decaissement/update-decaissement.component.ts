import { DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BankService } from '../../../services/bank-service/bank.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DecaissementService } from '../../../services/encaissement-service/decaissement.service';

@Component({
  selector: 'app-update-decaissement',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, DragDropModule, ReactiveFormsModule],
  templateUrl: './update-decaissement.component.html',
  styleUrl: './update-decaissement.component.css'
})
export class UpdateDecaissementComponent implements OnInit {
  decaissementForm: FormGroup;
  banks: any;

  constructor(private decaissementService: DecaissementService,
     private fb: FormBuilder, 
     private dialogRef: DialogRef, 
     private bankService: BankService,
     @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.decaissementForm = this.fb.group({
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
    this.loadDecaissementData();
  }

  loadDecaissementData() {
    this.decaissementService.getDecaissementById(this.data.id).subscribe(
      data => {
        this.decaissementForm.patchValue(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.decaissementForm.valid) {
      const decData = this.decaissementForm.value;
      console.log(decData);

      this.decaissementService.updateDecaissement(this.data.id, decData).subscribe(
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
