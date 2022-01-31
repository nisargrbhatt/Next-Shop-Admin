import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import {
  GetAllRazorpayPaymentResponseData,
  CapturedPayment,
} from '../payment.interface';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-rp-payment',
  templateUrl: './rp-payment.component.html',
  styleUrls: ['./rp-payment.component.scss'],
})
export class RpPaymentComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();
  pageSize = 50;

  refresh = new Subject();
  refresh$ = this.refresh.asObservable();

  totalPayments = 0;
  paymentData: GetAllRazorpayPaymentResponseData;

  selectedPayment: CapturedPayment;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.subs.sink = this.currentPage$
      .pipe(
        debounceTime(200),
        switchMap((currentPage) =>
          this.paymentService.getAllRazorpayPayment(currentPage, this.pageSize),
        ),
      )
      .subscribe((data) => {
        this.totalPayments = data.count;
        this.paymentData = data;
      });

    this.subs.sink = this.refresh$.subscribe((_) => {
      this.currentPage.next(1);
    });
  }

  onRefresh(): void {
    this.refresh.next(1);
  }

  onSelectPayment(paymentId: string): void {
    if (this.selectedPayment && this.selectedPayment.id === paymentId) {
      return;
    }
    const index = this.paymentData.items.findIndex(
      (data) => data.id === paymentId,
    );
    this.selectedPayment = this.paymentData.items[index];
  }

  onPageChange(pageEvent: PageEvent): void {
    this.currentPage.next(pageEvent.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
