import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { createBill } from "redux/billSlice";
import { clearCart } from "redux/cartSlice";
import { Helmet } from "react-helmet";

const steps = [
  "Chọn sản phẩm",
  "Nhập thông tin nhận hàng",
  // "Chọn phương thức thanh toán",
  // "Xác nhận đơn hàng",
  "Hoàn tất",
];

const CheckoutPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

  const handleCheckout = () => {
    let newBill = {
      customer: {
        name: customer.name,
        gender: customer.gender,
        phone: customer.phone,
        address: `${customer.address}, ${customer.addressLv3?.name}, ${customer.addressLv2?.name}, ${customer.addressLv1?.name}`,
        note: customer.note,
      },
      total: cart.total,
      products: Object.values(cart.data),
      status: 0,
      createdAt: new Date().toISOString(),
    };
    dispatch(createBill(newBill));
    dispatch(clearCart());
  };

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/gio-hang");
    }
    // eslint-disable-next-line
  }, []);

  let content = <></>;
  if (step === 1) {
    content = (
      <Step2
        customer={customer}
        setCustomer={setCustomer}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        goNextStep={() => {
          handleCheckout();
          setStep(2);
        }}
      />
    );
  }
  if (step === 2) {
    content = <Step3 customer={customer} />;
  }

  return (
    <div className="container mx-auto p-4 mb-10">
      <Helmet>
        <title>Thanh toán | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="my-8">
        <h2 className="text-4xl text-[#244d4d] font-bold">Thanh toán</h2>
      </div>
      <div className="rounded-lg shadow">
        <div className="hidden sm:block py-8">
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="block sm:hidden text-lg text-[#244d4d] font-bold px-4 py-6">
          {steps[step]}
        </div>
        {content}
      </div>
    </div>
  );
};

export default CheckoutPage;
