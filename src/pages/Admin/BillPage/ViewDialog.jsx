import { useState, useEffect } from "react";
import { Dialog, Button } from "@mui/material";
import { toVietnamCurentcy } from "utils";

const status = ["Đang chờ", "Đã gửi hàng", "Thành công", "Đã hủy"];

const ViewDialog = ({ isOpen, onClose, data }) => {
  const [bill, setBill] = useState(data);

  useEffect(() => {
    setBill(data);
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="body"
      maxWidth="md"
      fullWidth
    >
      <div className="p-4 md:p-8">
        <div>
          <h2 className="text-2xl text-primary font-bold">Chi tiết đơn hàng</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 text-slate-800">
          <div>
            <p className="text-lg font-bold mt-6">Thông tin khách hàng</p>
            <div className="grid grid-cols-[8rem_auto]">
              <div>Tên khách hàng</div>
              <div className="text-right">{bill?.customer?.name}</div>
              <div>Giới tính</div>
              <div className="text-right">{bill?.customer?.gender}</div>
              <div>Địa chỉ</div>
              <div className="text-right">{bill?.customer?.address}</div>
              <div>Số điện thoại</div>
              <div className="text-right">{bill?.customer?.phone}</div>
            </div>
            <p className="text-lg font-bold mt-6">Thông tin đơn hàng</p>
            <div className="grid grid-cols-[8rem_auto]">
              <div>Tổng tiền</div>
              <div className="text-right">{toVietnamCurentcy(bill?.total)}</div>
              <div>Trạng thái</div>
              <div className="text-right">{status?.[bill?.status]}</div>
              <div>Ghi chú</div>
              <div className="text-right">{bill?.customer?.note}</div>
              <div>Ngày tạo</div>
              <div className="text-right">
                {new Date(bill?.createdAt).toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
          <div className="md:pl-6">
            <p className="text-lg font-bold mt-6">Thông tin giỏ hàng</p>
            <ul className="space-y-2">
              {bill?.products?.map((item, i) => (
                <li className="flex" key={i}>
                  <div>
                    <img
                      className="w-20 h-20 object-cover"
                      src={item.product?.image}
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between w-[calc(100%-5rem)] pl-2">
                    <div className="">
                      <p className="text-lg text-slate-800 font-bold">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.product?.category?.name}
                      </p>
                    </div>
                    <div className="self-end justify-self-end text-right">
                      <p className="text-sm text-slate-700">x{item.quantity}</p>
                      <p className="text-base text-slate-800 font-semibold">
                        {toVietnamCurentcy(item.price)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="contained" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewDialog;
