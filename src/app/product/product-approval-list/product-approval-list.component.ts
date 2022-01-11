import { Router } from '@angular/router';
import {
  GetApprovalRequiredProductResponse,
  GetApprovalRequiredProductData,
} from './../product.interface';
import { SubSink } from 'subsink';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';

@Component({
  selector: 'app-product-approval-list',
  templateUrl: './product-approval-list.component.html',
  styleUrls: ['./product-approval-list.component.scss'],
})
export class ProductApprovalListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  search = new FormControl('');
  search$ = this.search.valueChanges;

  refresh = new Subject<any>();

  totalApprovals = 0;
  approvalsPerPage = 10;
  currentPage = new BehaviorSubject<number>(1);

  productApprovals: GetApprovalRequiredProductData;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) =>
          this.productService.getApprovalRequiredProduct(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            search,
          ),
        ),
      )
      .subscribe((data) => {
        this.productApprovals = data;
        this.totalApprovals = data.count;
      });

    this.subs.sink = this.currentPage
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        switchMap(() =>
          this.productService.getApprovalRequiredProduct(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            this.search.value,
          ),
        ),
      )
      .subscribe((data) => {
        this.productApprovals = data;
        this.totalApprovals = data.count;
      });

    this.subs.sink = this.refresh
      .asObservable()
      .pipe(
        switchMap(() =>
          this.productService.getApprovalRequiredProduct(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            this.search.value,
          ),
        ),
      )
      .subscribe((data) => {
        this.productApprovals = data;
        this.totalApprovals = data.count;
      });
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage.next(pageData.pageIndex + 1);
  }

  onRefresh(): void {
    this.refresh.next(2);
  }

  onProductClick(id: string): void {
    this.router.navigate(['/product/approval/' + id]);
  }

  getProductCardDetails(product: any): ProductCardSmallDetails {
    return {
      id: product.id,
      name: product.name,
      category: product.category.name,
      image: product.images[0].url,
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
