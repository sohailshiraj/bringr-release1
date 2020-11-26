import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  searchValue = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isLoading: boolean = false;

  //Pagination
  public page_details = {
    total: 0,
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.getUUID()) {
      this.getOrdersList(this.getUUID());
    }
  }

  ngAfterViewInit() {}

  getOrdersList(user_id) {
    this.isLoading = true;
    this.ordersService
      .getOrdersListWithPagination(
        user_id,
        this.page_details.pageIndex,
        this.page_details.pageSize,
        this.searchValue
      )
      .subscribe(
        (res: any) => {
          this.page_details.total = res.orders_count ? res.orders_count : 0;
          if (res.data && res.data.length > 0) {
            this.dataSource = new MatTableDataSource(res.data);
            this.dataList = res.data;
            // setTimeout(() => {
            //   this.dataSource.paginator = this.paginator;
            //   this.dataSource.sort = this.sort;
            // });

            this.cdr.detectChanges();
          } else {
            this.dataSource = new MatTableDataSource([]);
          }
          this.isLoading = false;
        },
        (err) => {
          this.openSnackBar('Unable to get Order List');
          this.isLoading = false;
        }
      );
  }

  applyFilter(event) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
    if (event.code == 'Enter') {
      let filterValue = event.target.value;
      filterValue = filterValue.toLowerCase();
      if (this.getUUID()) {
        this.initializePageDetails();
        this.getOrdersList(this.getUUID());
      }
    }
  }

  onRemovingFocus(event) {
    let filterValue = event.target.value;
    filterValue = filterValue.toLowerCase();
    if (this.getUUID()) {
      this.initializePageDetails();
      this.getOrdersList(this.getUUID());
    }
  }

  initializePageDetails() {
    this.page_details = {
      total: 0,
      pageIndex: 0,
      pageSize: 10,
    };
    this.paginator.firstPage();
    this.cdr.detectChanges();
  }

  viewDetails(data) {
    const dialogRef = this.dialog.open(OrderDetailModalComponent, {
      hasBackdrop: true,
      maxHeight: '100%',
      height: '100%',
      panelClass: ['custom-dialog-container', 'sidebar-modal'],
      data: {
        data: data,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  getUUID() {
    let user_det = JSON.parse(atob(localStorage.getItem('user_details')));
    if (user_det) {
      return user_det.uuid;
    } else {
      return null;
    }
  }

  pageChanged(event) {
    console.log(event);
    this.page_details.pageIndex = event.pageIndex;
    this.page_details.pageSize = event.pageSize;
    if (this.getUUID()) {
      this.getOrdersList(this.getUUID());
    }
  }
}
