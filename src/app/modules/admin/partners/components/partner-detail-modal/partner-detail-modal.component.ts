import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-detail-modal',
  templateUrl: './partner-detail-modal.component.html',
  styleUrls: ['./partner-detail-modal.component.scss'],
})
export class PartnerDetailModalComponent implements OnInit {
  public details: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
    this.details = this.data.data;
  }
}
