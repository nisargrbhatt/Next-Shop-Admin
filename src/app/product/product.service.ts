import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';
import { Router } from '@angular/router';

import {
  ApproveProductData,
  ApproveProductResponse,
  GetApprovalRequiredProductResponse,
  GetProductResponse,
} from './product.interface';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpService: HttpClient,
    private snackbarService: MatSnackBar,
    private router: Router,
  ) {}

  approveProduct(approveProductData: ApproveProductData): void {
    this.httpService
      .patch<ApproveProductResponse>(
        BACKEND_URL + secureAPIURIs.approveProduct.url,
        approveProductData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.router.navigate(['/product']);
      });
  }

  getApprovalRequiredProduct(
    currentPage: number,
    pageSize: number,
    search?: string,
  ): Observable<any> {
    return this.httpService
      .get<GetApprovalRequiredProductResponse>(
        BACKEND_URL +
          basicAPIURIs.getApprovalRequiredProduct +
          `/?currentPage=${currentPage}&pageSize=${pageSize}&search=${encodeURI(
            search,
          )}`,
      )
      .pipe(map((response) => response.data));
  }

  getProduct(productId: string): Observable<any> {
    return this.httpService
      .get<GetProductResponse>(
        BACKEND_URL + basicAPIURIs.getProduct + `/?productId=${productId}`,
      )
      .pipe(map((response) => response.data));
  }
}
