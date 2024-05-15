import { useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, IconButton, Chip } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import ViewDialog from "./ViewDialog";
import { toVietnamCurentcy, compactParagraph } from "utils";
import { Helmet } from "react-helmet";

const pageSize = 10;

const status = [
  { title: "Đang chờ", color: "warning" },
  { title: "Đã gửi hàng", color: "info" },
  { title: "Thành công", color: "success" },
  { title: "Đã hủy", color: "error" },
];

const AdminBillPage = () => {
  const bills = useSelector((store) => store.bill.data);
  const [page, setPage] = useState(1);
  const [dialogStatus, setDialogStatus] = useState("close");
  const [data, setData] = useState(null);

  return (
    <div className="p-4 lg:p-10">
      <Helmet>
        <title>Hóa đơn | Admin</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10 ">
        <h2 className="text-3xl text-slate-700 font-bold">Hóa đơn</h2>
      </div>
      <table className="w-full rounded-lg shadow">
        <thead>
          <tr className="text-slate-900 font-bold bg-slate-100">
            <td className="p-4 pr-2">
              <span className="hidden xl:block">Khách hàng</span>
              <span className="block xl:hidden">Đơn hàng</span>
            </td>
            <td className="hidden xl:table-cell text-center px-2 py-4">
              Địa chỉ
            </td>
            <td className="hidden sm:table-cell text-center px-2 py-4">
              Tổng tiền
            </td>
            <td className="hidden md:table-cell text-center px-2 py-4">
              Trạng thái
            </td>
            <td className="hidden xl:table-cell text-center px-2 py-4">
              Thời gian
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {bills
            ?.slice((page - 1) * pageSize, page * pageSize)
            ?.map((item, i) => (
              <tr key={i} className="border-t border-slate-100 text-slate-800">
                <td className="p-4 pr-2">
                  <p className="text-base text-slate-800">
                    {item.customer?.name}
                  </p>
                  <p className="block xl:hidden text-sm text-slate-500">
                    Đc: {compactParagraph(item.customer?.address, 40)}
                  </p>
                  <p className="block sm:hidden text-sm text-slate-500">
                    Tổng tiền: {toVietnamCurentcy(item.total)}
                  </p>
                  <p className="block md:hidden text-sm text-slate-500">
                    Trạng thái: {item.stock}
                  </p>
                  <p className="block xl:hidden text-sm text-slate-500">
                    Thời gian:{" "}
                    {new Date(item.createdAt).toLocaleString("vi-VN")}
                  </p>
                </td>
                <td className="hidden xl:table-cell px-2 py-4">
                  {compactParagraph(item.customer?.address, 20)}
                </td>
                <td className="hidden sm:table-cell text-center px-2 py-4">
                  {toVietnamCurentcy(item.total)}
                </td>
                <td className="hidden md:table-cell text-center px-2 py-4">
                  <Chip
                    label={status?.[item.status]?.title}
                    color={status?.[item.status]?.color}
                    size="small"
                    variant="outlined"
                  />
                </td>
                <td className="hidden xl:table-cell text-center px-2 py-4">
                  {new Date(item.createdAt)
                    .toLocaleString("vi-VN")
                    .replace(", ", " ")}
                </td>
                <td className="w-1 whitespace-nowrap">
                  <div className="ml-4">
                    <IconButton
                      onClick={() => {
                        setData(item);
                        setDialogStatus("view");
                      }}
                    >
                      <Visibility color="info" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-10 mb-4">
        {bills?.length > pageSize && (
          <Pagination
            page={page}
            count={Math.ceil(bills?.length / pageSize)}
            hidePrevButton
            hideNextButton
            showFirstButton
            showLastButton
            onChange={(e, value) => value !== null && setPage(value)}
          />
        )}
      </div>
      <ViewDialog
        isOpen={dialogStatus === "view"}
        onClose={() => setDialogStatus("close")}
        data={data}
      />
    </div>
  );
};

export default AdminBillPage;
