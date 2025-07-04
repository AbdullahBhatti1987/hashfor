import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo() {
 const barChartData = [
  {
    id: 1,
    series: [
      { data: [35, 44, 24, 34, 44] },
      { data: [51, 6, 49, 3, 33] },

    ],
    xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', ], }],
    height: 290,
  },
];
  const chart = barChartData[0];

  return (
    <div className="card w-full bg-[#1E1E1E] border border-[#AC8E2C] card-xs h-full shadow-sm">
      <div className="card-body">
        <BarChart
          series={chart.series}
          xAxis={chart.xAxis}
          height={chart.height}
        />
      </div>
    </div>
  );
}

