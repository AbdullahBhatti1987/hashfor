'use client';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ChartsOverviewDemo3() {
     const pieChartData = [
  {
    id: 1,
    title: 'Campaign Earning',
    series: [
      {
        data: [
          { id: 0, value: 40, label: 'Apples' },
          { id: 1, value: 30, label: 'Bananas' },
          { id: 2, value: 20, label: 'Cherries' },
          { id: 3, value: 10, label: 'Dates' },
          { id: 4, value: 30, label: 'Orange' },
          { id: 5, value: 20, label: 'Mango' },
          { id: 6, value: 10, label: 'Grapes' },
        ],
        innerRadius: 10,
        outerRadius: 140,
        paddingAngle: 5,
        cornerRadius: 5,
        startAngle: -45,
        endAngle: 225,
        cx: 150,
        cy: 150,
      },
    ],
    width: 300,
    height: 300,
    totalEarning: '$13.446.4332',
  },
];
  const chart = pieChartData[0]; 


  return (
    <div className="card w-full bg-[#1E1E1E] border border-[#AC8E2C] card-xl shadow-sm">
      <div className="card-body text-[#AC8E2C]">
        <h2 className="card-title">{chart.title}</h2>

        <PieChart
          series={chart.series}
          width={chart.width}
          height={chart.height}
        />

        <h2 className="text-gray-400">Total Earning</h2>
        <h2 className="card-title text-white">{chart.totalEarning}</h2>
      </div>
    </div>
  );
}
