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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetAllRazorpayCustomerResponseData,
  Item,
} from 'src/app/payment/payment.interface';

@Component({
  selector: 'app-customer-list-table',
  templateUrl: './customer-list-table.component.html',
  styleUrls: ['./customer-list-table.component.scss'],
})
export class CustomerListTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() customerData: GetAllRazorpayCustomerResponseData;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Item>;
  displayedColumns: string[] = ['customer_id', 'name', 'email', 'contact'];

  constructor() {}

  // tslint:disable-next-line: variable-name
  ngOnChanges(_changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.customerData.items);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.customerData.items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pageEvent.emit(pageEvent);
  }
}
