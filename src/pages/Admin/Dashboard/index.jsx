import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Group, Category, Chair, ShoppingCart } from "@mui/icons-material";
import { Helmet } from "react-helmet";

const AdminDashboardPage = () => {
  const userCount = useSelector((store) => store.user.data).length;
  const cateCount = useSelector((store) => store.category.data).length;
  const productCount = useSelector((store) => store.product.data).length;
  const billCount = useSelector((store) => store.bill.data).length;

  const data = [
    {
      name: "Người dùng",
      icon: <Group />,
      total: userCount,
      url: "/admin/users",
    },
    {
      name: "Danh mục",
      icon: <Category />,
      total: cateCount,
      url: "/admin/categories",
    },
    {
      name: "Sản phẩm",
      icon: <Chair />,
      total: productCount,
      url: "/admin/products",
    },
    {
      name: "Đơn hàng",
      icon: <ShoppingCart />,
      total: billCount,
      url: "/admin/bills",
    },
  ];

  return (
    <div className="p-4 lg:p-10">
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10 ">
        <h2 className="text-3xl text-slate-700 font-bold">Bảng điều khiển</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {data.map((item, i) => (
          <Link to={item.url} key={i}>
            <div
              className="flex justify-center items-center flex-col m-4 py-10 rounded-md shadow hover:shadow-lg transition-shadow"
              key={i}
            >
              <div className="bg-primary text-white rounded-3xl p-4">
                {item.icon}
              </div>
              <p className="text-slate-800 text-xl font-bold uppercase mt-6">
                {item.name}
              </p>
              <p className="text-slate-600">Tổng cộng {item.total}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
