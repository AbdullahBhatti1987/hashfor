import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "!w-auto !min-h-[30px] !px-5 !py-4 !text-xs !leading-tight !border-l-4 !border-yellow-400 !bg-white !text-black !rounded-md",
    bodyClassName: "!text-xs !whitespace-nowrap",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "!w-auto !min-h-[30px] !px-5 !py-4 !text-xs !leading-tight !border-l-4 !border-red-500 !bg-white !text-black !rounded-md",
    bodyClassName: "!text-xs !whitespace-nowrap",
  });
};
