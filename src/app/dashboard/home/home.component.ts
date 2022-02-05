import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SubSink } from 'subsink';
import { GetAcceptedOrderOfMerchantByMonthResponseData } from '../dashboard.interface';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  authorisedChartData: GetAcceptedOrderOfMerchantByMonthResponseData;
  allChartData: GetAcceptedOrderOfMerchantByMonthResponseData;
  paymentChartData: GetAcceptedOrderOfMerchantByMonthResponseData;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subs.sink = forkJoin([
      this.dashboardService.getAllAuthorisedOrdersOfPlayformByMonth(),
      this.dashboardService.getAllOrdersOfPlayformByMonth(),
      this.dashboardService.getAllPaymentsOfPlayformByMonth(),
    ]).subscribe((results) => {
      this.authorisedChartData = results[0];
      this.allChartData = results[1];
      this.paymentChartData = results[2];
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
