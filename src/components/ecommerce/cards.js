const Card = ({ name, Icon, price }) => {
  return (
    <div className="flex w-full items-center bg-[#272727] rounded-xl shadow-xl border border-gray-400 p-3 sm:p-4">
      <div>
        <Icon size={24} className="text-[#FDC700] min-w-[24px]" />
      </div>

      <div className="flex-1 overflow-hidden ml-3 sm:ml-4">
        <h4 className="font-semibold text-gray-200 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h4>
        <p className="text-gray-200 text-xs sm:text-sm">${price}</p>
      </div>
    </div>
  );
};

export default Card;

