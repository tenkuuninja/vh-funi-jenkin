import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Step2 = () => {
  return (
    <div className="p-8 text-center text-slate-700">
      <h2 className="text-2xl font-bold text-slate-800">
        Đơn hàng của bạn đã được ghi lại
      </h2>
      <p className="text-lg mt-4">
        Đơn hàng của qúy khách hiện đang được xử lý. Vui lòng chờ cuộc gọi xác
        nhận đơn hàng từ nhân viên.
      </p>
      <p className="text-lg">
        Cảm ơn bạn đã tin tưởng và và mua sản phẩm từ{" "}
        <span className="text-primary font-semibold">Nội thất Việt Hoàng</span>
      </p>
      <div className="flex justify-between items-center mt-8">
        <div></div>
        <Link to="/">
          <Button variant="contained">Quay lại trang chủ</Button>
        </Link>
      </div>
    </div>
  );
};

export default Step2;
