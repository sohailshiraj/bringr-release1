import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetailModalComponent } from './components/user-detail-modal/user-detail-modal.component';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'uuid',
    'full_name',
    'city',
    'distance',
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
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.getUUID()) {
      this.getUserList(this.getUUID());
    }
  }

  ngAfterViewInit() {}

  getUserList(user_id) {
    this.isLoading = true;
    this.getPosition()
      .then((pos) => {
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.userService
          .getUserListWithPagination(
            user_id,
            pos.lng,
            pos.lat,
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
              this.openSnackBar('Unable to get User List');
              this.isLoading = false;
            }
          );
      })
      .catch((e) => {
        this.openSnackBar(
          'Please give permission to browser and then refresh the page'
        );
      });
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
        this.getUserList(this.getUUID());
      }
    }
  }

  onRemovingFocus(event) {
    let filterValue = event.target.value;
    filterValue = filterValue.toLowerCase();
    if (this.getUUID()) {
      this.initializePageDetails();
      this.getUserList(this.getUUID());
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
    const dialogRef = this.dialog.open(UserDetailModalComponent, {
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

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
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
      this.getUserList(this.getUUID());
    }
  }
}
