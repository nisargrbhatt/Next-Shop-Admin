import { ApprovalsShowComponent } from './approvals-show/approvals-show.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';

const routes: Routes = [
  {
    path: 'approval/:id',
    component: ApprovalsShowComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: ApprovalsListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class KycRoutingModule {}
