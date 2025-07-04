import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ChartsOverviewDemo2() {
  const lineChartsData = [
    {
      id: 1,
      title: 'Campaign Static',
      subtitle: '+2.53%',
      xAxis: [1, 2, 3, 5, 8, 10],
      series: [2, 5.5, 2, 8.5, 1.5, 5],
      height: 300,
      totalEarning: '$13.446.4332',
    },
  ];

  return (
    <div className="card w-full bg-[#1E1E1E] border border-[#AC8E2C] card-xl shadow-sm">
      <div className="card-body text-[#AC8E2C]">
        <h2 className="card-title">Campaign Static</h2>
        <p className='text-gray-400'>+2.53%</p>
        {lineChartsData.map((chart) => (
          <LineChart
            key={chart.id}
            xAxis={[{ data: chart.xAxis, scaleType: 'point' }]}
            series={[{ data: chart.series, area: true }]}
            height={chart.height}
            sx={{
              '.MuiChartsAxis-line, .MuiChartsAxis-tick': {
                stroke: 'white',
              },
              '.MuiChartsAxis-tickLabel': {
                fill: 'white',
              },
            }}
          />
        ))}
        <h2 className='text-white'>
          Total Earning : <span className='text-gray-400'>$13.446.4332</span>
        </h2>
      </div>
    </div>
  );
}
