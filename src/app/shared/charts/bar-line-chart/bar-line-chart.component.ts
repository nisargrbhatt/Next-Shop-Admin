import { Component, Input, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { GetAcceptedOrderOfMerchantByMonthResponseData } from 'src/app/dashboard/dashboard.interface';
Chart.register(...registerables);

@Component({
  selector: 'app-bar-line-chart',
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.scss'],
})
export class BarLineChartComponent implements OnInit {
  @Input() authorisedChartData: GetAcceptedOrderOfMerchantByMonthResponseData;
  @Input() allChartData: GetAcceptedOrderOfMerchantByMonthResponseData;
  @Input() paymentChartData: GetAcceptedOrderOfMerchantByMonthResponseData;

  private authorisedChartObj: Chart;
  private allChartObj: Chart;
  private paymentChartObj: Chart;

  private authorisedChartEle: any;
  private allChartEle: any;
  private paymentChartEle: any;

  constructor() {}

  ngOnInit(): void {
    this.authorisedChartEle = document.getElementById('authorised-chart');
    this.allChartEle = document.getElementById('all-chart');
    this.paymentChartEle = document.getElementById('payment-chart');

    this.authorisedChartObj = new Chart(this.authorisedChartEle, {
      type: 'line',
      data: {
        labels: this.authorisedChartData.barLabels,
        datasets: [
          {
            label: this.authorisedChartData.label,
            data: this.authorisedChartData.data,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            // borderWidth: 1,
            tension: 0.1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });
    this.allChartObj = new Chart(this.allChartEle, {
      type: 'line',
      data: {
        labels: this.allChartData.barLabels,
        datasets: [
          {
            label: this.allChartData.label,
            data: this.allChartData.data,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            // borderWidth: 1,
            tension: 0.1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });
    this.paymentChartObj = new Chart(this.paymentChartEle, {
      type: 'line',
      data: {
        labels: this.paymentChartData.barLabels,
        datasets: [
          {
            label: this.paymentChartData.label,
            data: this.paymentChartData.data,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            // borderWidth: 1,
            tension: 0.1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });
  }
}
