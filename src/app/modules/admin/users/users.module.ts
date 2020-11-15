import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'app/shared/shared.module';
import { UserDetailModalComponent } from './components/user-detail-modal/user-detail-modal.component';

@NgModule({
  declarations: [UsersComponent, UserDetailModalComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
