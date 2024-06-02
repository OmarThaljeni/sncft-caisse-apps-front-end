import { Component, ViewChild } from '@angular/core';
import { UpdateEncaissmentComponent } from '../update-encaissment/update-encaissment.component';
import { AddEncaissmentComponent } from '../add-encaissment/add-encaissment.component';
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
import { Encaissment } from '../../../models/encaissment';
import { EncaissmentService } from '../../../services/encaissement-service/encaissment.service';

@Component({
  selector: 'app-list-encaissment',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-encaissment.component.html',
  styleUrl: './list-encaissment.component.css'
})
export class ListEncaissmentComponent {
  displayedColumns = ['ref', 'banque','matricule', 'fullname', 'cin', 'motif', 'somme', 'actions'];
  dataSource: MatTableDataSource<Encaissment>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  listBank: any;
  constructor(private encaissmentService: EncaissmentService, private bankService: BankService, private notification: NotificationService, private dialogService: DialogService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllEncaissment();
  }



  getAllEncaissment() {
    const email = sessionStorage.getItem('loggedUser');
    if(email)
    this.encaissmentService.getAllEncaissment(email).subscribe((data: Encaissment[]) => {
      this.dataSource.data = data;
      console.log('data test',data)
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

  openCreateEncaissmentDialog(): void {
    const dialogRef = this.dialog.open(AddEncaissmentComponent, {
      width: '500px', // Set the width of the modal
      disableClose: true // Prevent closing the modal by clicking outside or pressing ESC
    });

    // You can optionally subscribe to the afterClosed event to get data when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteEncaissment(row: any) {
    this.dialogService.openConfirmDialog('Vous étes sur confirmer cette ecaissement ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.encaissmentService.deleteBank(row.id);
          resp.subscribe(() => {
            this.notification.success("Opertaion effectué avec succés!")
            window.location.reload();
          },
            error => {
              this.notification.warn("Opertaion echoué!")
              window.location.reload();
            }
          )
        }
      });
  }


  openUpdateEncDialog(row: any): void {
    const dialogRef = this.dialog.open(UpdateEncaissmentComponent, {
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