'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1st', value: 0 },
  { name: '2nd', value: 4000 },
  { name: '3rd', value: 2000 },
  { name: '4th', value: 6000 },
  { name: '5th', value: 2000 },
  { name: '6th', value: 6000 },
  { name: '7th', value: 2000 },
  { name: '8th', value: 5000 },
];

const AdminProductValuationChart = () => {
  return (
    <div className="bg-[#272727] border border-gray-400 rounded-xl shadow-md p-3 xs:p-4 w-full">
      <h2 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-gray-200">Product Valuation</h2>
      <div className="h-[250px] xs:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4b5563" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'white', fontSize: 10 }} 
              tickMargin={10}
            />
            <YAxis 
              domain={[0, 7000]} 
              tickFormatter={(tick) => `${tick / 1000}K`} 
              tick={{ fill: 'white', fontSize: 10 }}
              tickMargin={10}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#purpleGradient)"
              strokeWidth={3}
              dot={{
                stroke: '#8b5cf6',
                strokeWidth: 2,
                r: 4,
                fill: '#fff',
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProductValuationChart;