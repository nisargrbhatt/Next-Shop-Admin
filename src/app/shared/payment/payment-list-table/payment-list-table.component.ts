import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetAllRazorpayPaymentResponseData,
  CapturedPayment,
} from 'src/app/payment/payment.interface';

@Component({
  selector: 'app-payment-list-table',
  templateUrl: './payment-list-table.component.html',
  styleUrls: ['./payment-list-table.component.scss'],
})
export class PaymentListTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() paymentData: GetAllRazorpayPaymentResponseData;
  @Output() selectPayment: EventEmitter<string> = new EventEmitter<string>();
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<CapturedPayment>;
  displayedColumns: string[] = [
    'payment_id',
    'customer_id',
    'order_id',
    'amount',
    'status',
    'action',
  ];

  constructor() {}

  // tslint:disable-next-line: variable-name
  ngOnChanges(_changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.paymentData.items);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.paymentData.items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectOrder(id: string): void {
    this.selectPayment.emit(id);
  }

  onPageEvent(pageEvent: PageEvent): void {
    this.pageEvent.emit(pageEvent);
  }
}
