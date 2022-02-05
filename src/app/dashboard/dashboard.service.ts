import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GetAcceptedOrderOfMerchantByMonthResponseData,
  GetAcceptedOrderOfMerchantByMonthResponse,
} from './dashboard.interface';

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
export class DashboardService {
  constructor(private httpService: HttpClient) {}

  getAllAuthorisedOrdersOfPlayformByMonth(): Observable<GetAcceptedOrderOfMerchantByMonthResponseData> {
    return this.httpService
      .get<GetAcceptedOrderOfMerchantByMonthResponse>(
        BACKEND_URL + secureAPIURIs.getAllAuthorisedOrdersOfPlayformByMonth.url,
      )
      .pipe(map((response) => response.data));
  }
  getAllOrdersOfPlayformByMonth(): Observable<GetAcceptedOrderOfMerchantByMonthResponseData> {
    return this.httpService
      .get<GetAcceptedOrderOfMerchantByMonthResponse>(
        BACKEND_URL + secureAPIURIs.getAllOrdersOfPlayformByMonth.url,
      )
      .pipe(map((response) => response.data));
  }
  getAllPaymentsOfPlayformByMonth(): Observable<GetAcceptedOrderOfMerchantByMonthResponseData> {
    return this.httpService
      .get<GetAcceptedOrderOfMerchantByMonthResponse>(
        BACKEND_URL + secureAPIURIs.getAllPaymentsOfPlayformByMonth.url,
      )
      .pipe(map((response) => response.data));
  }
}
