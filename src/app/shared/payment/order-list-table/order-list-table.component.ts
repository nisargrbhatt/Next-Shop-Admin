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
  GetAllRazorpayOrderResponseData,
  CreatedOrderData,
} from 'src/app/payment/payment.interface';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
  styleUrls: ['./order-list-table.component.scss'],
})
export class OrderListTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() orderData: GetAllRazorpayOrderResponseData;
  @Output() selectOrder: EventEmitter<string> = new EventEmitter<string>();
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<CreatedOrderData>;
  displayedColumns: string[] = [
    'order_id',
    'amount',
    'customer_id',
    'status',
    'action',
  ];

  constructor() {}

  // tslint:disable-next-line: variable-name
  ngOnChanges(_changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.orderData.items);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.orderData.items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectOrder(id: string): void {
    this.selectOrder.emit(id);
  }

  onPageEvent(pageEvent: PageEvent): void {
    this.pageEvent.emit(pageEvent);
  }
}
