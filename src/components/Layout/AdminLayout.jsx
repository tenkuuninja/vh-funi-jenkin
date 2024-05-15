import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Avatar } from "@mui/material";
import {
  Group,
  Category,
  Chair,
  ShoppingCart,
  Menu,
  Dashboard,
  Web,
  Logout
} from "@mui/icons-material";
import { logout } from "redux/authSlice";
import Dropdown from "components/Dropdown";

const menu = [
  {
    text: "Bảng điều khiển",
    icon: <Dashboard fontSize="small" />,
    url: "/admin",
  },
  { text: "Người dùng", icon: <Group fontSize="small" />, url: "/admin/users" },
  {
    text: "Danh mục",
    icon: <Category fontSize="small" />,
    url: "/admin/categories",
  },
  {
    text: "Sản phẩm",
    icon: <Chair fontSize="small" />,
    url: "/admin/products",
  },
  {
    text: "Hóa đơn",
    icon: <ShoppingCart fontSize="small" />,
    url: "/admin/bills",
  },
];

const AdminLayout = () => {
  const { isLogin, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted && (!isLogin || user.role !== "admin")) {
      navigate("/");
    }
    if (!isMounted) {
      setMounted(true);
    }
  }, [isMounted, isLogin, user.role, navigate]);

  if (!isMounted || !isLogin || user.role !== "admin") {
    return <></>;
  }

  return (
    <Fragment>
      <header className="flex justify-between h-16 border-b px-4">
        <Link className="h-16 py-2 flex items-center" to="/">
          <img
            className="h-full"
            src="/images/logo-vh-black-transparent.png"
            alt=""
          />
          <div className="block">
            <p className="text-sm italic leading-3">Nội thất</p>
            <p className="text-2xl font-bold italic leading-none">VIETHOANG</p>
          </div>
        </Link>
        <div
          className="block lg:hidden p-4 cursor-pointer"
          onClick={() => setOpenDrawer(true)}
        >
          <Menu />
        </div>
        <Dropdown
          placement="bottom-right"
          overlay={
            <ul className="bg-white shadow py-2 w-56 mt-2">
              <li className="hover:bg-slate-50 hover:text-primary ease-in-out duration-200 cursor-pointer">
                <Link className="flex px-4 py-2" to="/">
                  <Web />
                  <span className="ml-2">Trang khách</span>
                </Link>
              </li>
              <li
                className="flex px-4 py-2 hover:bg-slate-50 hover:text-primary ease-in-out duration-200 cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                <Logout />
                <span className="ml-2">Đăng xuất</span>
              </li>
            </ul>
          }
        >
          <div className="hidden lg:flex items-center cursor-pointer border rounded-full p-1 my-2 bg-slate-50">
            <span className="text-lg text-slate-800 font-semibold mx-2">
              {user.name}
            </span>
            <Avatar>{user.username.substring(0, 2).toUpperCase()}</Avatar>
          </div>
        </Dropdown>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-80 pr-6 ">
          <div></div>
          <ul className="mt-4 sticky top-0">
            {menu.map((item, i) => (
              <li key={i}>
                <Link to={item.url}>
                  <div
                    className={`admin-aside__item ${
                      location.pathname === item.url && "active"
                    } flex justify-start items-center pl-12 py-4 font-semibold text-slate-600`}
                  >
                    <div className="flex mr-4 p-1.5 rounded-[14px]">
                      {item.icon}
                    </div>
                    <p>{item.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-full lg:w-[calc(100%-20rem)] transition-all">
          <Outlet />
        </main>
      </div>
      <Drawer
        anchor="left"
        open={isOpenDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="w-[20rem] max-w-[80vw]">
          <ul>
            {menu.map((item, i) => (
              <li key={i} onClick={() => setOpenDrawer(false)}>
                <Link to={item.url}>
                  <div
                    className={`admin-aside__item ${
                      location.pathname === item.url && "active"
                    } flex justify-start items-center pl-12 py-4 font-semibold text-slate-500`}
                  >
                    <div className="flex mr-4 p-1.5 rounded-[14px]">
                      {item.icon}
                    </div>
                    <p>{item.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default AdminLayout;
