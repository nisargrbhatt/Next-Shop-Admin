import { SubSink } from 'subsink';
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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FindKYCApprovalResponseDataRows } from '../kyc.interface';

@Component({
  selector: 'app-approvals-show',
  templateUrl: './approvals-show.component.html',
  styleUrls: ['./approvals-show.component.scss'],
})
export class ApprovalsShowComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  kycId: string;

  kycApproval: FindKYCApprovalResponseDataRows;

  selectedImage = 0;

  constructor(
    private kycService: KycService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: MatDialog,
    private snackbarService: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.kycId = this.route.snapshot.params['id'];
    }

    this.subs.sink = this.kycService
      .getKycApproval(this.kycId)
      .subscribe((data) => {
        this.kycApproval = data;
      });
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

    this.kycService.acceptTheKycApproval(acceptTheKycApprovalData);
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

    this.kycService.acceptTheKycApproval(acceptTheKycApprovalData);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
