import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Remove, Add, Close } from "@mui/icons-material";
import {
  incrementQuantityByProductId,
  decrementQuantityByProductId,
  setQuantityByProductId,
  removeFromCartByProductId,
} from "redux/cartSlice";
import { toVietnamCurentcy } from "utils";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const changeAmount = (item) => (
    <div className="inline-flex items-center border">
      <div
        className="p-1 cursor-pointer"
        onClick={() => dispatch(decrementQuantityByProductId(item.product?.id))}
      >
        <Remove />
      </div>
      <div className="w-12 h-full border-x p-1">
        <input
          className="w-full p-[1px] outline-none text-center"
          type="text"
          value={item.quantity}
          onChange={(e) =>
            dispatch(
              setQuantityByProductId({
                productId: item.product?.id,
                quantity: e.target.value,
              })
            )
          }
        />
      </div>
      <div
        className="p-1 cursor-pointer"
        onClick={() => dispatch(incrementQuantityByProductId(item.product?.id))}
      >
        <Add />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 mb-10">
      <Helmet>
        <title>Giỏ hàng | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="my-8">
        <h2 className="text-4xl text-[#244d4d] font-bold">Giỏ hàng</h2>
      </div>
      <div className="rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="font-bold bg-slate-100">
              <th className="text-left p-4 pr-2">Sản phẩm</th>
              <th className="hidden md:table-cell px-2 py-4">Đơn giá</th>
              <th className="hidden sm:table-cell px-2 py-4">Số lượng</th>
              <th className="hidden lg:table-cell px-2 py-4">Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cart.data).map((item, i) => (
              <tr data-aos="fade-up" data-aos-delay={i * 150} key={i}>
                <td className="flex items-start p-4 pr-2">
                  <img
                    className="w-20 h-20 object-cover"
                    src={item.product.image}
                    alt=""
                  />
                  <div className="pl-2 w-[calc(100%-5rem)]">
                    <p className="text-lg leading-tight text-slate-800 font-bold">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Danh mục: {item.product.category.name}
                    </p>
                    <p className="block sm:hidden">
                      {toVietnamCurentcy(item.price)}
                    </p>
                    <div className="block sm:hidden">{changeAmount(item)}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell text-center px-2 py-4">
                  {toVietnamCurentcy(item.price)}
                </td>
                <td className="hidden sm:table-cell text-center px-2 py-4">
                  {changeAmount(item)}
                </td>
                <td className="hidden lg:table-cell text-center px-2 py-4">
                  {toVietnamCurentcy(item.quantity * item.price)}
                </td>
                <td className="text-right p-4 pl-2">
                  <IconButton
                    onClick={() =>
                      dispatch(removeFromCartByProductId(item.product?.id))
                    }
                  >
                    <Close />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {Object.values(cart.data).length === 0 && (
          <div className="p-4 text-center">
            Không có sản phẩm nào trong giỏ hàng
          </div>
        )}
        <div className="p-4 text-right">
          Tổng cộng:{" "}
          <span className="text-xl text-rose-600 font-bold">
            {toVietnamCurentcy(cart.total)}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 pb-8">
          <Link className="block sm:inline w-full sm:w-auto" to="/san-pham">
            <Button fullWidth>Tiếp tục mua hàng</Button>
          </Link>
          <Link
            className="block sm:inline w-full sm:w-auto mt-4 sm:mt-0"
            to={cart.total === 0 ? "" : "/thanh-toan"}
          >
            <Button disabled={cart.total === 0} variant="contained" fullWidth>
              Tiến hành thành toán
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
