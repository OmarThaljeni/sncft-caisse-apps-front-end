import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/user-services/notification.service';
import { DialogService } from '../../../services/user-services/dialog.service';
import { TransactionService } from '../../../services/transaction-service/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transaction } from '../../../models/transaction';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent {
  displayedColumns = ['codeTransaction', 'nomTransaction', 'typeOperation','actions'];
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private notification : NotificationService,private dialogService : DialogService,private transactionService: TransactionService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe((data: Transaction[]) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  
  openCreateTransactionDialog(): void {
    const dialogRef = this.dialog.open(CreateTransactionComponent, {
      width: '500px', // Set the width of the modal
      disableClose: true // Prevent closing the modal by clicking outside or pressing ESC
    });

    // You can optionally subscribe to the afterClosed event to get data when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteTransaction(row: any) {
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette transaction ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.transactionService.deleteTransaction(row.id);
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


  openUpdateBankDialog(row : any): void {
    const dialogRef = this.dialog.open(UpdateTransactionComponent, {
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
