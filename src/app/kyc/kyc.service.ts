import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';

import {
  AcceptTheKycApprovalData,
  AcceptTheKycApprovalResponse,
  FindAllApprovalPendingResponse,
  GetKycApprovalResponse,
} from './kyc.interface';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class KycService {
  constructor(
    private httpService: HttpClient,
    private snackbarService: MatSnackBar,
    private router: Router,
  ) {}

  findAllApprovalPending(
    currentPage: number,
    pageSize: number,
    search?: string,
  ): Observable<any> {
    return this.httpService
      .get<FindAllApprovalPendingResponse>(
        BACKEND_URL +
          secureAPIURIs.findAllApprovalPending.url +
          `/?currentPage=${currentPage}&pageSize=${pageSize}&search=${encodeURI(
            search,
          )}`,
      )
      .pipe(map((response) => response.data));
  }

  acceptTheKycApproval(
    acceptTheKycApprovalData: AcceptTheKycApprovalData,
  ): void {
    this.httpService
      .patch<AcceptTheKycApprovalResponse>(
        BACKEND_URL + secureAPIURIs.acceptTheKycApproval.url,
        acceptTheKycApprovalData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.router.navigate(['/kyc']);
      });
  }

  getKycApproval(kycId: string): Observable<any> {
    return this.httpService
      .get<GetKycApprovalResponse>(
        BACKEND_URL + secureAPIURIs.getKycApproval.url + `/?kycId=${kycId}`,
      )
      .pipe(map((response) => response.data));
  }
}
