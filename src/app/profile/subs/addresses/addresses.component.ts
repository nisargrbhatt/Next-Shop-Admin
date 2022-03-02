import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { ErrorComponent } from 'src/app/shared/dialog/error/error.component';
import { ResMesComponent } from 'src/app/shared/dialog/res-mes/res-mes.component';
import { environment } from 'src/environments/environment';
import {
  AddressData,
  GetAddressesData,
  GetAddressesResponse,
} from '../../profile.interface';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  pageLoding = false;
  formLoading = false;

  addresses: GetAddressesData;

  constructor(
    private profileService: ProfileService,

    private router: Router,

    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    this.pageLoding = true;

    this.getAddresses();
  }

  async getAddresses(): Promise<void> {
    this.pageLoding = true;

    let getAddressesResponse: GetAddressesResponse;
    try {
      getAddressesResponse = await this.profileService.getAddresses();
    } catch (error: any) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        getAddressesResponse = { ...error.error };
      }
    }

    if (getAddressesResponse.valid) {
      this.addresses = getAddressesResponse.data;
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in getAddressesResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: getAddressesResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in getAddressesResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: getAddressesResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
      this.router.navigate(['/']);
    }

    this.pageLoding = false;
  }

  getAddressKeys(address: AddressData): string[] {
    // Dont show these keys
    const dontShow = ['userId', 'createdAt', 'updatedAt', 'id'];

    return Object.keys(address).filter((data) => {
      return !dontShow.includes(data);
    });
  }

  addAddress(): void {
    // Add address form url
    this.router.navigate(['/profile/add-address']);
  }
}
