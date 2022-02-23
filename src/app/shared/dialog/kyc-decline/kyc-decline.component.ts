import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kyc-decline',
  templateUrl: './kyc-decline.component.html',
  styleUrls: ['./kyc-decline.component.scss'],
})
export class KycDeclineComponent implements OnInit {
  kycDeclineForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<KycDeclineComponent>) {}

  ngOnInit(): void {
    this.kycDeclineForm = new FormGroup({
      declineReason: new FormControl('', { validators: [Validators.required] }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.kycDeclineForm.invalid) {
      return;
    }

    const declineData = {
      action: true,
      reason: this.kycDeclineForm.value.declineReason,
    };

    this.dialogRef.close(declineData);
  }

  onCancel(): void {
    const cancelData = {
      action: false,
    };
    this.dialogRef.close(cancelData);
  }
}
