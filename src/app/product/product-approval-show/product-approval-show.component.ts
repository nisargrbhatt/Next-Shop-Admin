import { MatDialog } from '@angular/material/dialog';
import { ApproveProductData } from './../product.interface';
import { SubSink } from 'subsink';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm/confirm.component';
import { KycDeclineComponent } from 'src/app/shared/dialog/kyc-decline/kyc-decline.component';

@Component({
  selector: 'app-product-approval-show',
  templateUrl: './product-approval-show.component.html',
  styleUrls: ['./product-approval-show.component.scss'],
})
export class ProductApprovalShowComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  productId: string;

  productDetails: any;

  selectedImage = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.productId = this.route.snapshot.params['id'];
    } else {
      this.router.navigate(['/product']);
    }

    this.subs.sink = this.productService
      .getProduct(this.productId)
      .subscribe((data) => {
        this.productDetails = {
          ...data,
          specification: JSON.parse(data.specification),
        };
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

    const approveProductData: ApproveProductData = {
      productId: this.productId,
      approval: true,
    };

    this.productService.approveProduct(approveProductData);
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

    const approveProductData: ApproveProductData = {
      productId: this.productId,
      approval: false,
      declineReason: kycDeclineDialogRes.reason,
    };

    this.productService.approveProduct(approveProductData);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
