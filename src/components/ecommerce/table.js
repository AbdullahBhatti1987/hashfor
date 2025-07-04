import * as React from 'react';
import Stack from '@mui/material/Stack';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export default function Table() {
 const tableData = {
  title: 'Latest Campaign',
  growth: '+2.54%',
  rows: [
    {
      avatarColor: '#25A3BB',
      initials: 'UI',
      name: 'Hart Hagerty',
      date: '13 August 2021',
      count: 42,
      chartColor: 'green',
      chartValues: [0, 2, 3, 4, 6, 8, 7, 9, 15, 6, 8, 7, 12],
    },
    {
      avatarColor: '#F2B47A',
      initials: 'UI',
      name: 'kathod Murphy',
      date: 'Zemlak, Daniel',
      count: 'Purple',
    },
  ],
};
  const settings = { height: 100, yAxis: { min: 0, max: 20 } };

  return (
    <div className="card w-full bg-[#1E1E1E] border border-[var(--themeColor)] card-xs text-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className='text-[var(--themeColor)]'>
            <tr>
              <th className='text-2xl'>{tableData.title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='text-[#25A3BB]'>{tableData.growth}</th>
            </tr>
            {tableData.rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar-placeholder">
                      <div className="text-neutral-content w-8 rounded-full" style={{ backgroundColor: row.avatarColor }}>
                        <span className="text-xs">{row.initials}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td>{row.date}</td>
                <td>{row.count}</td>
                {row.chartValues && (
                  <td>
                    <Stack sx={{ width: '100%', maxWidth: 300 }}>
                      <SparkLineChart data={row.chartValues} color={row.chartColor} {...settings} />
                    </Stack>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
