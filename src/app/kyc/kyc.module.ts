import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { ApprovalsShowComponent } from './approvals-show/approvals-show.component';

import { NgxViewerModule } from 'ngx-viewer';

@NgModule({
  declarations: [ApprovalsListComponent, ApprovalsShowComponent],
  imports: [
    CommonModule,
    KycRoutingModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
    NgxViewerModule,
  ],
})
export class KycModule {}
