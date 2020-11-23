import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { PartnerDetailModalComponent } from './components/partner-detail-modal/partner-detail-modal.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [PartnersComponent, PartnerDetailModalComponent],
  imports: [CommonModule, PartnersRoutingModule, SharedModule],
})
export class PartnersModule {}
