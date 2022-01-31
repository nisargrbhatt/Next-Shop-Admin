import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GetAllRazorpayCustomerResponseData,
  GetAllRazorpayCustomerResponse,
  GetAllRazorpayOrderResponseData,
  GetAllRazorpayOrderResponse,
  GetAllRazorpayPaymentResponse,
  GetAllRazorpayPaymentResponseData,
  CapturedPayment,
  GetRazorpayCustomerResponse,
  GetRazorpayCustomerResponseData,
  GetRazorpayOrderResponse,
  GetRazorpayOrderResponseData,
  GetRazorpayPaymentResponse,
} from './payment.interface';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpService: HttpClient) {}

  getAllRazorpayCustomer(
    currentPage: number,
    pageSize: number,
  ): Observable<GetAllRazorpayCustomerResponseData> {
    return this.httpService
      .get<GetAllRazorpayCustomerResponse>(
        BACKEND_URL +
          secureAPIURIs.getAllRazorpayCustomer.url +
          `/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response.data));
  }

  getAllRazorpayOrder(
    currentPage: number,
    pageSize: number,
  ): Observable<GetAllRazorpayOrderResponseData> {
    return this.httpService
      .get<GetAllRazorpayOrderResponse>(
        BACKEND_URL +
          secureAPIURIs.getAllRazorpayOrder.url +
          `/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response.data));
  }

  getAllRazorpayPayment(
    currentPage: number,
    pageSize: number,
  ): Observable<GetAllRazorpayPaymentResponseData> {
    return this.httpService
      .get<GetAllRazorpayPaymentResponse>(
        BACKEND_URL +
          secureAPIURIs.getAllRazorpayPayment.url +
          `/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response.data));
  }

  getRazorpayOrder(orderId: string): Observable<GetRazorpayOrderResponseData> {
    return this.httpService
      .get<GetRazorpayOrderResponse>(
        BACKEND_URL +
          secureAPIURIs.getRazorpayOrder.url +
          `/?orderId=${orderId}`,
      )
      .pipe(map((response) => response.data));
  }

  getRazorpayPayment(paymentId: string): Observable<CapturedPayment> {
    return this.httpService
      .get<GetRazorpayPaymentResponse>(
        BACKEND_URL +
          secureAPIURIs.getRazorpayPayment.url +
          `/?paymentId=${paymentId}`,
      )
      .pipe(map((response) => response.data));
  }

  getRazorpayCustomer(
    customerId: string,
  ): Observable<GetRazorpayCustomerResponseData> {
    return this.httpService
      .get<GetRazorpayCustomerResponse>(
        BACKEND_URL +
          secureAPIURIs.getRazorpayCustomer.url +
          `/?customerId=${customerId}`,
      )
      .pipe(map((response) => response.data));
  }
}
