import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerDetailModalComponent } from './components/partner-detail-modal/partner-detail-modal.component';
import { PartnersService } from './service/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  providers: [PartnersService],
})
export class PartnersComponent implements OnInit {
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

  //Pagination
  public page_details = {
    total: 0,
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private partnerService: PartnersService
  ) {}

  ngOnInit(): void {
    if (this.getUUID()) {
      this.getPartnersList(this.getUUID());
    }
  }

  getPartnersList(user_id) {
    this.isLoading = true;
    this.getPosition()
      .then((pos) => {
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.partnerService
          .getPartnerListWithPagination(
            user_id,
            pos.lng,
            pos.lat,
            this.page_details.pageIndex,
            this.page_details.pageSize
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
                this.openSnackBar('Unable to get Partner List');
              }
              this.isLoading = false;
            },
            (err) => {
              this.openSnackBar('Unable to get Partner List');
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  viewDetails(data) {
    const dialogRef = this.dialog.open(PartnerDetailModalComponent, {
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
      this.getPartnersList(this.getUUID());
    }
  }
}
