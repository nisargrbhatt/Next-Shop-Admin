import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductApprovalListComponent } from './product-approval-list/product-approval-list.component';
import { RouterModule } from '@angular/router';
import { NgxViewerModule } from 'ngx-viewer';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductApprovalShowComponent } from './product-approval-show/product-approval-show.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    ProductApprovalListComponent,
    ProductApprovalShowComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
    NgxViewerModule,
  ],
})
export class ProductModule {}
