import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailModalComponent } from './components/order-detail-modal/order-detail-modal.component';
import { OrdersService } from './service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'order_id',
    'full_name',
    'payment_type',
    'payable_charges',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;
  dataList = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isLoading: boolean = false;
  constructor(
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  ngAfterViewInit() {}

  getOrdersList() {
    this.isLoading = true;
    this.ordersService.getOrdersList('5f2a7e5a47b88').subscribe(
      (res: any) => {
        if (res.data && res.data.length > 0) {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataList = res.data;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          this.cdr.detectChanges();
        }
        this.isLoading = false;
      },
      (err) => {
        alert('Unable to get Order List');
        this.isLoading = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  viewDetails(data) {
    const dialogRef = this.dialog.open(OrderDetailModalComponent, {
      hasBackdrop: true,
      width: '60vw',
      height: '80vh',
      panelClass: 'custom-dialog-container',
      data: {
        data: data,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }
}
