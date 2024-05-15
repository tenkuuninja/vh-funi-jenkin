import { useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Button, IconButton, Chip } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import EditDialog from "./EditDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { Helmet } from "react-helmet";

const pageSize = 10;

const AdminUserPage = () => {
  const users = useSelector((store) => store.user.data);
  const [page, setPage] = useState(1);
  const [dialogStatus, setDialogStatus] = useState("close");
  const [data, setData] = useState(null);

  return (
    <div className="p-4 lg:p-10">
      <Helmet>
        <title>Tài khoản | Admin</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10 ">
        <h2 className="text-3xl text-slate-700 font-bold">Người dùng</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setData({});
            setDialogStatus("edit");
          }}
        >
          Thêm
        </Button>
      </div>
      <table className="w-full rounded-lg shadow">
        <thead>
          <tr className="text-slate-900 font-bold bg-slate-100">
            <td className="p-4 pr-2">
              <span className="hidden xl:block">Tên</span>
              <span className="block xl:hidden">Đơn hàng</span>
            </td>
            <td className="hidden xl:table-cell text-center px-2 py-4">
              Giới tính
            </td>
            <td className="hidden md:table-cell text-center px-2 py-4">
              Tên đăng nhập
            </td>
            <td className="hidden sm:table-cell text-center px-2 py-4">
              Email
            </td>
            <td className="hidden xl:table-cell text-center px-2 py-4">
              Vai trò
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users
            ?.slice((page - 1) * pageSize, page * pageSize)
            ?.map((item, i) => (
              <tr key={i} className="border-t border-slate-100 text-slate-800">
                <td className="p-4 pr-2">
                  <p>{item.name}</p>
                  <p className="block md:hidden text-sm text-slate-500">
                    @{item.username}
                  </p>
                  <p className="block sm:hidden text-sm text-slate-500">
                    {item.email}
                  </p>
                  <p className="block xl:hidden text-sm text-slate-500">
                    {item.gender === "F" ? "Nữ" : "Nam"} -{" "}
                    {item.role === "user" ? "User" : "Admin"}
                  </p>
                </td>
                <td className="hidden xl:table-cell text-center px-2 py-4">
                  <Chip
                    label={item.gender === "F" ? "Nữ" : "Nam"}
                    color={item.gender === "F" ? "error" : "info"}
                    size="small"
                    variant="outlined"
                  />
                </td>
                <td className="hidden md:table-cell text-center px-2 py-4">
                  {item.username}
                </td>
                <td className="hidden sm:table-cell text-center px-2 py-4">
                  {item.email}
                </td>
                <td className="hidden xl:table-cell text-center px-2 py-4">
                  <Chip
                    label={item.role === "user" ? "User" : "Admin"}
                    color={item.role === "user" ? "success" : "primary"}
                    size="small"
                    variant="outlined"
                  />
                </td>
                <td className="w-1 whitespace-nowrap">
                  <div className="ml-4">
                    <IconButton
                      onClick={() => {
                        setData(item);
                        setDialogStatus("edit");
                      }}
                    >
                      <Edit color="info" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setData(item);
                        setDialogStatus("delete");
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-10 mb-4">
        {users?.length > pageSize && (
          <Pagination
            page={page}
            count={Math.ceil(users?.length / pageSize)}
            hidePrevButton
            hideNextButton
            showFirstButton
            showLastButton
            onChange={(e, value) => value !== null && setPage(value)}
          />
        )}
      </div>
      <EditDialog
        isOpen={dialogStatus === "edit"}
        onClose={() => setDialogStatus("close")}
        data={data}
      />
      <ConfirmDeleteDialog
        isOpen={dialogStatus === "delete"}
        onClose={() => setDialogStatus("close")}
        data={data}
      />
    </div>
  );
};

export default AdminUserPage;
