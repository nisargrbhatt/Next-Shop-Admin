import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './dialog/error/error.component';
import { ResMesComponent } from './dialog/res-mes/res-mes.component';
import { EmailVerificationComponent } from './dialog/email-verification/email-verification.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { KycDeclineComponent } from './dialog/kyc-decline/kyc-decline.component';
import { ProductCardSmallComponent } from './product/product-card-small/product-card-small.component';
// import { ProductCardLongComponent } from './product/product-card-long/product-card-long.component';
import { CustomerListTableComponent } from './payment/customer-list-table/customer-list-table.component';
import { PaymentListTableComponent } from './payment/payment-list-table/payment-list-table.component';
import { OrderListTableComponent } from './payment/order-list-table/order-list-table.component';
import { BarLineChartComponent } from './charts/bar-line-chart/bar-line-chart.component';
@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [
    // SidenavComponent,
    HeaderComponent,
    ErrorComponent,
    ResMesComponent,
    EmailVerificationComponent,
    LoaderComponent,
    ConfirmComponent,
    KycDeclineComponent,
    ProductCardSmallComponent,
    // ProductCardLongComponent,
    CustomerListTableComponent,
    PaymentListTableComponent,
    OrderListTableComponent,
    BarLineChartComponent,
  ],
  providers: [],
  exports: [
    // SidenavComponent,
    HeaderComponent,
    ErrorComponent,
    ResMesComponent,
    EmailVerificationComponent,
    LoaderComponent,
    ConfirmComponent,
    KycDeclineComponent,
    ProductCardSmallComponent,
    // ProductCardLongComponent,
    CustomerListTableComponent,
    PaymentListTableComponent,
    OrderListTableComponent,
    BarLineChartComponent,
  ],
})
export class SharedModule {}
