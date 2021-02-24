import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() public chartLabels: Label[] = [];
  @Input() public chartData  : MultiDataSet = [];
  @Input() public chartType  : ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
