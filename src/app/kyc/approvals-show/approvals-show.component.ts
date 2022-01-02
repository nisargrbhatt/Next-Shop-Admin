import { KycDeclineComponent } from './../../shared/dialog/kyc-decline/kyc-decline.component';
import { ConfirmComponent } from './../../shared/dialog/confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  GetKycApprovalResponse,
  AcceptTheKycApprovalResponse,
  AcceptTheKycApprovalData,
} from './../kyc.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KycService } from './../kyc.service';
import { Component, OnInit } from '@angular/core';
import { FindKYCApprovalResponseDataRows } from '../kyc.interface';
import { ErrorComponent } from 'src/app/shared/dialog/error/error.component';
import { ResMesComponent } from 'src/app/shared/dialog/res-mes/res-mes.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approvals-show',
  templateUrl: './approvals-show.component.html',
  styleUrls: ['./approvals-show.component.scss'],
})
export class ApprovalsShowComponent implements OnInit {
  pageLoading = false;

  kycId: string;

  kycApproval: FindKYCApprovalResponseDataRows;
  imageSelect = 0;

  constructor(
    private kycService: KycService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: MatDialog,
    private snackbarService: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.kycId = paramMap.get('id');
        this.getKycApproval();
      } else {
        this.router.navigate(['/kyc']);
      }
    });
  }

  async getKycApproval(): Promise<void> {
    this.pageLoading = true;

    let getKycApprovalResponse: GetKycApprovalResponse;
    try {
      getKycApprovalResponse = await this.kycService.getKycApproval(this.kycId);
    } catch (error) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        getKycApprovalResponse = { ...error.error };
      }
    }
    if (getKycApprovalResponse.valid) {
      this.kycApproval = getKycApprovalResponse.data;
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in getKycApprovalResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: getKycApprovalResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in getKycApprovalResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: getKycApprovalResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
      this.router.navigate(['/']);
    }

    this.pageLoading = false;
  }

  async acceptTheApproval(): Promise<void> {
    const confirmDialogRef = this.dialogService.open(ConfirmComponent, {
      autoFocus: true,
      hasBackdrop: true,
    });
    const confirmDialogRes: boolean = await confirmDialogRef
      .afterClosed()
      .toPromise();

    if (!confirmDialogRes) {
      return;
    }

    const acceptTheKycApprovalData: AcceptTheKycApprovalData = {
      kycId: this.kycId,
      approval: true,
    };

    let acceptTheKycApprovalResponse: AcceptTheKycApprovalResponse;
    try {
      acceptTheKycApprovalResponse = await this.kycService.acceptTheKycApproval(
        acceptTheKycApprovalData,
      );
    } catch (error) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        acceptTheKycApprovalResponse = { ...error.error };
      }
    }
    if (acceptTheKycApprovalResponse.valid) {
      this.snackbarService.open(acceptTheKycApprovalResponse.message, 'Ok', {
        duration: 2 * 1000,
      });
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in acceptTheKycApprovalResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: acceptTheKycApprovalResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in acceptTheKycApprovalResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: acceptTheKycApprovalResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
    }
    this.router.navigate(['/kyc']);
  }

  async rejectTheApproval(): Promise<void> {
    const kycDeclineDialogRef = this.dialogService.open(KycDeclineComponent, {
      autoFocus: true,
      hasBackdrop: true,
    });
    const kycDeclineDialogRes: {
      action: boolean;
      reason?: string;
    } = await kycDeclineDialogRef.afterClosed().toPromise();

    if (!kycDeclineDialogRes.action) {
      return;
    }

    const acceptTheKycApprovalData: AcceptTheKycApprovalData = {
      kycId: this.kycId,
      approval: false,
      declineReason: kycDeclineDialogRes.reason,
    };

    let acceptTheKycApprovalResponse: AcceptTheKycApprovalResponse;
    try {
      acceptTheKycApprovalResponse = await this.kycService.acceptTheKycApproval(
        acceptTheKycApprovalData,
      );
    } catch (error) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        acceptTheKycApprovalResponse = { ...error.error };
      }
    }
    if (acceptTheKycApprovalResponse.valid) {
      this.snackbarService.open(acceptTheKycApprovalResponse.message, 'Ok', {
        duration: 2 * 1000,
      });
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in acceptTheKycApprovalResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: acceptTheKycApprovalResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in acceptTheKycApprovalResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: acceptTheKycApprovalResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
    }
    this.router.navigate(['/kyc']);
  }
}
