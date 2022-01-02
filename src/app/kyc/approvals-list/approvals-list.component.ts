import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FindAllApprovalPendingResponse } from './../kyc.interface';
import { KycService } from './../kyc.service';
import { Component, OnInit } from '@angular/core';
import { FindAllApprovalPendingResponseData } from '../kyc.interface';
import { ErrorComponent } from 'src/app/shared/dialog/error/error.component';
import { ResMesComponent } from 'src/app/shared/dialog/res-mes/res-mes.component';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-approvals-list',
  templateUrl: './approvals-list.component.html',
  styleUrls: ['./approvals-list.component.scss'],
})
export class ApprovalsListComponent implements OnInit {
  pageLoading = false;
  dataLoading = false;

  searchText = '';

  totalApprovals = 0;
  approvalsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 40];
  kycApprovals: FindAllApprovalPendingResponseData;

  constructor(
    private kycService: KycService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;
    this.getKycApprovals();
    this.pageLoading = false;
  }

  async getKycApprovals(): Promise<void> {
    this.dataLoading = true;
    let findAllApprovalPendingResponse: FindAllApprovalPendingResponse;
    try {
      findAllApprovalPendingResponse =
        await this.kycService.findAllApprovalPending(
          this.currentPage,
          this.approvalsPerPage,
          this.searchText,
        );
    } catch (error) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        findAllApprovalPendingResponse = { ...error.error };
      }
    }
    if (findAllApprovalPendingResponse.valid) {
      this.kycApprovals = findAllApprovalPendingResponse.data;
      this.totalApprovals = this.kycApprovals.count;
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in findAllApprovalPendingResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: findAllApprovalPendingResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in findAllApprovalPendingResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: findAllApprovalPendingResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
      this.router.navigate(['/']);
    }

    this.dataLoading = false;
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage = pageData.pageIndex + 1;
    this.approvalsPerPage = pageData.pageSize;
    this.getKycApprovals();
  }
}
