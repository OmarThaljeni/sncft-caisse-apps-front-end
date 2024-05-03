import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from '../../../models/bank';
import { BankService } from '../../../services/bank-service/bank.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CreateBankComponent } from '../create-bank/create-bank.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../services/user-services/dialog.service';
import { NotificationService } from '../../../services/user-services/notification.service';
import { UpdateBankComponent } from '../update-bank/update-bank.component';

@Component({
  selector: 'app-list-bank',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-bank.component.html',
  styleUrl: './list-bank.component.css'
})
export class ListBankComponent implements OnInit {
  displayedColumns = ['codeBank', 'socialRaison', 'codeComptable', 'rib','actions'];
  dataSource: MatTableDataSource<Bank>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private notification : NotificationService,private dialogService : DialogService,private bankService: BankService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllBanks();
  }

  getAllBanks() {
    this.bankService.getAllBanks().subscribe((data: Bank[]) => {
      this.dataSource.data = data;
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

  openCreateBankDialog(): void {
    const dialogRef = this.dialog.open(CreateBankComponent, {
      width: '500px', // Set the width of the modal
      disableClose: true // Prevent closing the modal by clicking outside or pressing ESC
    });

    // You can optionally subscribe to the afterClosed event to get data when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteBank(row: any) {
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette banque ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.bankService.deleteBank(row.id);
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
    const dialogRef = this.dialog.open(UpdateBankComponent, {
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
