import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { month: 'Jan', Target: 2, Paid: 1.8 },
  { month: 'Feb', Target: 2.5, Paid: 2.2 },
  { month: 'Mar', Target: 2, Paid: 1.9 },
  { month: 'Apr', Target: 1.8, Paid: 1.6 },
  { month: 'May', Target: 1.6, Paid: 1.5 },
  { month: 'Jun', Target: 2, Paid: 1.7 },
  { month: 'Jul', Target: 2.5, Paid: 2.3 },
  { month: 'Aug', Target: 3.5, Paid: 3.2 },
  { month: 'Sep', Target: 3, Paid: 2.9 },
  { month: 'Oct', Target: 6, Paid: 5.7 },
  { month: 'Nov', Target: 5.5, Paid: 6 },
  { month: 'Dec', Target: 4.5, Paid: 4.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-yellow-600">Target: {payload[0].value}M</p>
        <p className="text-xs text-green-900">Paid: {payload[1].value}M</p>
      </div>
    );
  }

  return null;
};

export default function PerformanceChart() {
  return (
    <div className="w-full bg-[#272727] border border-gray-400 rounded-xl p-3 xs:p-4">
      <div>
        <div className="flex justify-between items-center mb-3 xs:mb-4">
          <h2 className="text-base xs:text-lg font-semibold text-white">Performance</h2>
          <select className="border rounded px-2 py-1 text-xs xs:text-sm">
            <option>2023</option>
          </select>
        </div>
        <div className="h-[250px] xs:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                stroke="#888" 
                tick={{ fill: 'white', fontSize: 10 }} 
                tickMargin={10}
              />
              <YAxis 
                stroke="#888" 
                domain={[0, 10]} 
                tickFormatter={(v) => `${v}M`} 
                tick={{ fill: 'white', fontSize: 10 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Target" fill="#facc15" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Paid" fill="#ffffff" radius={[4, 4, 0, 0]}>
                <LabelList 
                  dataKey="Paid" 
                  position="top" 
                  formatter={(val) => `${val}M`} 
                  fill="#000" 
                  fontSize={10} 
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}