import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiArrowUpRight } from 'react-icons/fi';

export default function AdminSalesPerformanceCard() {
  const data = [
    { name: 'Total Sales per day', value: 80, color: '#FF6B00' },
    { name: 'Average Sales', value: 60, color: '#FFA07A' },
    { name: 'Empty', value: 60, color: '#4B5563' },
  ];

  return (
    <div className="p-3 xs:p-4 rounded-xl shadow-md border border-gray-400 w-full h-full bg-[#272727] flex flex-col">
      <h3 className="text-xs xs:text-sm font-medium text-gray-200 flex items-center mb-2 xs:mb-4">
        Sales Performance
        <span className="ml-1 text-gray-400 cursor-pointer">ℹ️</span>
      </h3>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[120px] xs:h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-center mb-2 xs:mb-4">
        <div className="text-xl xs:text-2xl font-semibold flex justify-center items-center text-white">
          17.9%
          <span className="ml-1 text-green-500 text-xs xs:text-sm">
            <FiArrowUpRight />
          </span>
        </div>
        <p className="text-[10px] xs:text-xs text-gray-400">Since yesterday</p>
      </div>

      <div className="border-t border-gray-500 py-2 text-[10px] xs:text-xs space-y-1 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 xs:space-x-2">
            <span className="w-2 h-1 xs:w-3 xs:h-1.5 bg-[#FF6B00] rounded"></span>
            <span className="text-white">Total Sales</span>
          </div>
          <span className="text-gray-400">For week</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 xs:space-x-2">
            <span className="w-2 h-1 xs:w-3 xs:h-1.5 bg-[#FFA07A] rounded"></span>
            <span className="text-white">Average Sales</span>
          </div>
          <span className="text-gray-400">For today</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="text-xs xs:text-sm text-gray-200 flex items-center space-x-1 hover:underline">
          <span>See Details</span>
          <FiArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}