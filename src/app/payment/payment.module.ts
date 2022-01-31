import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { RpCustomerComponent } from './rp-customer/rp-customer.component';
import { RpPaymentComponent } from './rp-payment/rp-payment.component';
import { RpOrderComponent } from './rp-order/rp-order.component';

@NgModule({
  declarations: [
    PaymentListComponent,
    RpCustomerComponent,
    RpPaymentComponent,
    RpOrderComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
  ],
})
export class PaymentModule {}
