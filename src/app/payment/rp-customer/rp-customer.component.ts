import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { GetAllRazorpayCustomerResponseData } from '../payment.interface';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-rp-customer',
  templateUrl: './rp-customer.component.html',
  styleUrls: ['./rp-customer.component.scss'],
})
export class RpCustomerComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();
  pageSize = 50;

  refresh = new Subject();
  refresh$ = this.refresh.asObservable();

  totalCustomers = 0;

  customerData: GetAllRazorpayCustomerResponseData;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.subs.sink = this.currentPage$
      .pipe(
        debounceTime(200),
        switchMap((currentPage) =>
          this.paymentService.getAllRazorpayCustomer(
            currentPage,
            this.pageSize,
          ),
        ),
      )
      .subscribe((data) => {
        this.totalCustomers = data.count;
        this.customerData = data;
      });

    this.subs.sink = this.refresh$.subscribe((_) => {
      this.currentPage.next(1);
    });
  }

  onRefresh(): void {
    this.refresh.next(1);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.currentPage.next(pageEvent.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
