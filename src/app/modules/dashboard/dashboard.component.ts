import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  //Users Table
  recentUsersDataSource: MatTableDataSource<any>;
  recentUsersTableColumns = ['full_name', 'mobile', 'device', 'status'];
  @ViewChild('recentUsersTable', { read: MatSort })
  recentUsersTableMatSort: MatSort;

  //Partners Table
  recentPartnersDataSource: MatTableDataSource<any>;
  recentPartnersTableColumns = ['full_name', 'mobile', 'device', 'status'];
  @ViewChild('recentPartnersTable', { read: MatSort })
  recentPartnersTableMatSort: MatSort;

  //Orders Table
  recentOrdersDataSource: MatTableDataSource<any>;
  recentOrdersTableColumns = ['order_id', 'paid', 'status'];
  @ViewChild('recentOrdersTable', { read: MatSort })
  recentOrdersTableMatSort: MatSort;

  currentDate = new Date();
  isLoading: boolean = false;
  public counts: any = {};
  constructor(
    private service: DashboardService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDashboardStats('5fb22d632601b');
  }

  getDashboardStats(user_id) {
    this.isLoading = true;
    this.service.getDashboardStats(user_id).subscribe(
      (res: any) => {
        if (res.data) {
          if (res.data.counts) {
            this.counts = res.data.counts;

            if (res.data.lists) {
              this.recentUsersDataSource = new MatTableDataSource(
                res.data.lists.users_list.data
              );
              this.recentPartnersDataSource = new MatTableDataSource(
                res.data.lists.partners_list.data
              );
              this.recentOrdersDataSource = new MatTableDataSource(
                res.data.lists.orders_list.data
              );
            }
            this.cdr.detectChanges();
          }
          this.isLoading = false;
        }
      },
      (err) => {
        this.openSnackBar('Something went wrong');
      }
    );
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
