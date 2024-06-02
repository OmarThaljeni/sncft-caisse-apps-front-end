import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../services/user-services/notification.service';
import { DialogService } from '../../../services/user-services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { BankService } from '../../../services/bank-service/bank.service';
import { Decaissement } from '../../../models/decaissment';
import { DecaissementService } from '../../../services/encaissement-service/decaissement.service';
import { UpdateDecaissementComponent } from '../update-decaissement/update-decaissement.component';
import { AddDecaissementComponent } from '../add-decaissement/add-decaissement.component';

@Component({
  selector: 'app-list-decaissement',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-decaissement.component.html',
  styleUrls: ['./list-decaissement.component.css']
})
export class ListDecaissementComponent {
  displayedColumns = ['ref', 'banque', 'matricule', 'fullname', 'cin', 'motif', 'somme', 'actions'];
  dataSource: MatTableDataSource<Decaissement>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  listBank: any;

  constructor(
    private decaissementService: DecaissementService,
    private bankService: BankService,
    private notification: NotificationService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllDecaissement();
  }

  getAllDecaissement() {
    const email = sessionStorage.getItem('loggedUser');
    if(email)
    this.decaissementService.getAllDecaissement(email).subscribe((data: Decaissement[]) => {
      this.dataSource.data = data;
      console.log('data test', data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateDecaissementDialog(): void {
    const dialogRef = this.dialog.open(AddDecaissementComponent, {
      width: '500px', // Set the width of the modal
      disableClose: true // Prevent closing the modal by clicking outside or pressing ESC
    });

    // You can optionally subscribe to the afterClosed event to get data when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteDecaissement(row: any) {
    this.dialogService.openConfirmDialog('Vous êtes sûr de confirmer cette décaissement ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.decaissementService.deleteDecaissement(row.id);
          resp.subscribe(() => {
            this.notification.success("Opération effectuée avec succès!")
            window.location.reload();
          },
            error => {
              this.notification.warn("Opération échouée!")
              window.location.reload();
            }
          );
        }
      });
  }

  openUpdateDecaissementDialog(row: any): void {
    const dialogRef = this.dialog.open(UpdateDecaissementComponent, {
      width: '500px', // Set the width of the modal
      disableClose: true,
      data: row // Prevent closing the modal by clicking outside or pressing ESC
    });

    // You can optionally subscribe to the afterClosed event to get data when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
