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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isLoading: boolean = false;

  constructor(
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  ngAfterViewInit() {}

  getUserList() {
    this.isLoading = true;
    this.getPosition()
      .then((pos) => {
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.userService
          .getUserList('5f2a7e5a47b88', pos.lng, pos.lat)
          .subscribe(
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
}
