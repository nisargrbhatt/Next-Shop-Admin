import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import {
  GetAllRazorpayOrderResponseData,
  GetRazorpayOrderResponseData,
} from '../payment.interface';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-rp-order',
  templateUrl: './rp-order.component.html',
  styleUrls: ['./rp-order.component.scss'],
})
export class RpOrderComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();
  pageSize = 50;

  refresh = new Subject();
  refresh$ = this.refresh.asObservable();

  totalOrders = 0;
  orderData: GetAllRazorpayOrderResponseData;

  selectedOrder: GetRazorpayOrderResponseData;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.subs.sink = this.currentPage$
      .pipe(
        debounceTime(200),
        switchMap((currentPage) =>
          this.paymentService.getAllRazorpayOrder(currentPage, this.pageSize),
        ),
      )
      .subscribe((data) => {
        this.totalOrders = data.count;
        this.orderData = data;
      });

    this.subs.sink = this.refresh$.subscribe((_) => {
      this.currentPage.next(1);
    });
  }

  onRefresh(): void {
    this.refresh.next(1);
  }

  onSelectOrder(orderId: string): void {
    if (this.selectedOrder && this.selectedOrder.id === orderId) {
      return;
    }
    const index = this.orderData.items.findIndex((data) => data.id === orderId);
    this.selectedOrder = this.orderData.items[index];
  }

  onPageChange(pageEvent: PageEvent): void {
    this.currentPage.next(pageEvent.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
