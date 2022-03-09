import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
// import { AngularMaterialModule } from '../angular-material.module';
// import { SharedModule } from '../shared/shared.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { BarLineChartComponent } from '../shared/charts/bar-line-chart/bar-line-chart.component';

@NgModule({
  declarations: [HomeComponent, HomeBannerComponent, BarLineChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // AngularMaterialModule,
    // SharedModule,
    RouterModule,
  ],
})
export class DashboardModule {}
