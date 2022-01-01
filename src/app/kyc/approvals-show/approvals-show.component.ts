import { GetKycApprovalResponse } from './../kyc.interface';
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
}
