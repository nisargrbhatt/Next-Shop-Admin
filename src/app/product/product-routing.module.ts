import { ProductApprovalShowComponent } from './product-approval-show/product-approval-show.component';
import { ProductApprovalListComponent } from './product-approval-list/product-approval-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: ProductApprovalListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approval/:id',
    component: ProductApprovalShowComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ProductRoutingModule {}
