import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination, Button, IconButton } from "@mui/material";
import { Add, Edit, Delete, Link } from "@mui/icons-material";
// import { ProductApi } from "apis";
import EditDialog from "./EditDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { toVietnamCurentcy, compactParagraph } from "utils";
import { Helmet } from "react-helmet";

const pageSize = 10;

const AdminProductPage = () => {
  const products = useSelector((store) => store.product.data);
  const [page, setPage] = useState(1);
  const [dialogStatus, setDialogStatus] = useState("close");
  const [data, setData] = useState(null);

  let navigate = useNavigate();

  return (
    <div className="p-4 lg:p-10">
      <Helmet>
        <title>Sản phẩm | Admin</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10 ">
        <h2 className="text-3xl text-slate-700 font-bold">Sản phẩm</h2>
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
            <td className="p-4 pr-2"></td>
            <td className="px-2 py-4">Sản phẩm</td>
            <td className="hidden xl:table-cell text-center px-2 py-4">Giá</td>
            <td className="hidden xl:table-cell text-center px-2 py-4">
              Tồn kho
            </td>
            <td className="hidden md:table-cell text-center px-2 py-4">
              Mô tả
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products
            ?.slice((page - 1) * pageSize, page * pageSize)
            ?.map((item, i) => (
              <tr key={i} className="border-t border-slate-100 text-slate-800">
                <td className="pl-3 py-2 w-28">
                  <img
                    className="w-24 h-24 object-cover"
                    src={item.image}
                    alt=""
                  />
                </td>
                <td className="py-4 pr-2">
                  <p className="text-lg leading-tight text-slate-800 font-bold">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Danh mục: {item.category.name}
                  </p>
                  <p className="block xl:hidden text-sm text-slate-500">
                    Trong kho: {item.stock}
                  </p>
                  <p className="block xl:hidden">
                    {toVietnamCurentcy(item.price)}
                  </p>
                </td>
                <td className="hidden xl:table-cell text-center px-2 py-4">
                  {toVietnamCurentcy(item.price)}
                </td>
                <td className="hidden xl:table-cell text-center px-2 py-4">
                  {item.stock}
                </td>
                <td className="hidden md:table-cell px-2 py-4">
                  {compactParagraph(item.description, 140)}
                </td>
                <td className="w-1 whitespace-nowrap">
                  <div className="ml-4">
                    <IconButton
                      onClick={() =>
                        navigate(`/san-pham/${item.id}-${item.slug}`)
                      }
                    >
                      <Link color="secondary" />
                    </IconButton>
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
        {products?.length > pageSize && (
          <Pagination
            page={page}
            count={Math.ceil(products?.length / pageSize)}
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

export default AdminProductPage;
