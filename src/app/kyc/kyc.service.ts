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
  constructor(private httpService: HttpClient) {}

  async findAllApprovalPending(
    currentPage: number,
    pageSize: number,
    search?: string,
  ): Promise<FindAllApprovalPendingResponse> {
    const searchFilter = search.replace(new RegExp('[.?/=#]'), '');

    return await this.httpService
      .get<FindAllApprovalPendingResponse>(
        BACKEND_URL +
          secureAPIURIs.findAllApprovalPending +
          `/?currentPage=${currentPage}&pageSize=${pageSize}&search=${searchFilter}`,
      )
      .toPromise();
  }

  async acceptTheKycApproval(
    acceptTheKycApprovalData: AcceptTheKycApprovalData,
  ): Promise<AcceptTheKycApprovalResponse> {
    return this.httpService
      .patch<AcceptTheKycApprovalResponse>(
        BACKEND_URL + secureAPIURIs.acceptTheKycApproval,
        acceptTheKycApprovalData,
      )
      .toPromise();
  }

  async getKycApproval(kycId: string): Promise<GetKycApprovalResponse> {
    return await this.httpService
      .get<GetKycApprovalResponse>(
        BACKEND_URL + secureAPIURIs.getKycApproval + `/?kycId=${kycId}`,
      )
      .toPromise();
  }
}
