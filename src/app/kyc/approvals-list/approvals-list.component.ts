import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FindAllApprovalPendingResponse } from './../kyc.interface';
import { KycService } from './../kyc.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FindAllApprovalPendingResponseData } from '../kyc.interface';
import { ErrorComponent } from 'src/app/shared/dialog/error/error.component';
import { ResMesComponent } from 'src/app/shared/dialog/res-mes/res-mes.component';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { SubSink } from 'subsink';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-approvals-list',
  templateUrl: './approvals-list.component.html',
  styleUrls: ['./approvals-list.component.scss'],
})
export class ApprovalsListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  search = new FormControl('');
  search$ = this.search.valueChanges;

  refresh = new Subject<any>();

  totalApprovals = 0;
  approvalsPerPage = 10;
  currentPage = new BehaviorSubject<number>(1);

  kycApprovals: FindAllApprovalPendingResponseData;

  constructor(
    private kycService: KycService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.kycService
      .findAllApprovalPending(
        this.currentPage.getValue(),
        this.approvalsPerPage,
        this.search.value,
      )
      .subscribe((data) => {
        this.kycApprovals = data;
        this.totalApprovals = data.count;
      });

    this.subs.sink = this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) =>
          this.kycService.findAllApprovalPending(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            search,
          ),
        ),
      )
      .subscribe((data) => {
        this.kycApprovals = data;
        this.totalApprovals = data.count;
      });

    this.subs.sink = this.currentPage
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        switchMap((search) =>
          this.kycService.findAllApprovalPending(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            this.search.value,
          ),
        ),
      )
      .subscribe((data) => {
        this.kycApprovals = data;
        this.totalApprovals = data.count;
      });

    this.subs.sink = this.refresh
      .asObservable()
      .pipe(
        switchMap(() =>
          this.kycService.findAllApprovalPending(
            this.currentPage.getValue(),
            this.approvalsPerPage,
            this.search.value,
          ),
        ),
      )
      .subscribe((data) => {
        this.kycApprovals = data;
        this.totalApprovals = data.count;
      });
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage.next(pageData.pageIndex + 1);
  }

  onRefresh(): void {
    this.refresh.next(2);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
