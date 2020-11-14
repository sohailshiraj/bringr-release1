import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailModalComponent } from './components/order-detail-modal/order-detail-modal.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailModalComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
