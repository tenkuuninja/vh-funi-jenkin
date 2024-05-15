import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUser } from "redux/userSlice";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const users = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isPasswordMasked, setPasswordMasked] = useState(true);
  const [isConfirmPasswordMasked, setConfirmPasswordMasked] = useState(true);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(data.name?.length > 0)) {
      toast.warn("Tên hiển thị không được bỏ trống");
      return;
    }
    if (!(data.username?.length > 0)) {
      toast.warn("Tên đăng nhập không được bỏ trống");
      return;
    }
    if (!(data.username?.length >= 8) || !(data.username?.length <= 16)) {
      toast.warn("Tên đăng nhập phải có độ dài từ 8 - 16 ký tự");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{8,16}$/g.test(data.username)) {
      toast.warn(
        "Tên đăng nhập chỉ cho phép chữ thường, chữ hoa, chữ số và các kí tự _ -"
      );
      return;
    }
    if (users.find((item) => item.username === data.username)) {
      toast.warn("Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác");
      return;
    }
    if (!(data.email?.length > 0)) {
      toast.warn("Email không được bỏ trống");
      return;
    }
    if (!/^.+@(\w{2,}\.){1,2}\w{2,}$/gi.test(data.email)) {
      toast.warn("Email không đúng định dạng");
      return;
    }
    if (users.find((item) => item.email === data.email)) {
      toast.warn("Email đã tồn tại, vui lòng chọn email khác");
      return;
    }
    if (!(data.password?.length >= 8)) {
      toast.warn("Mật khẩu phải có độ dài ít nhất là 8");
      return;
    }
    if (
      !/[a-z]/g.test(data.password) ||
      !/[A-Z]/g.test(data.password) ||
      !/[0-9]/g.test(data.password) ||
      !/[!@#$%^&*()_-]/g.test(data.password)
    ) {
      toast.warn(
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ số và 1 kí tự đăng biệt thuộc !@#$%^&*()_-"
      );
      return;
    }
    if (data.confirmPassword !== data.password) {
      toast.warn("Mật khẩu không khớp");
      return;
    }

    let newUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      gender: "M",
      role: "user",
    };
    dispatch(createUser(newUser));
    toast.success("Đăng kí thành công!");
    navigate("/dang-nhap");
  };

  const passwordMaskedIcon = (
    <InputAdornment position="end">
      <IconButton
        size="small"
        onClick={() => setPasswordMasked(!isPasswordMasked)}
      >
        {isPasswordMasked ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const confirmPasswordMaskedIcon = (
    <InputAdornment position="end">
      <IconButton
        size="small"
        onClick={() => setConfirmPasswordMasked(!isConfirmPasswordMasked)}
      >
        {isConfirmPasswordMasked ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className="max-w-sm mx-auto p-4 mt-4">
      <Helmet>
        <title>Đăng ký | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="font-bold text-center text-primary text-2xl mb-8">
        Đăng ký
      </div>
      <form className="space-y-6 py-6" onSubmit={onSubmit}>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="Tên hiển thị"
            fullWidth
            value={data.name}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (!value) {
                message = "Tên hiển thị không được trống";
              }
              setErrorMessage((prev) => ({ ...prev, name: message }));
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
            error={!!errorMessage.name}
            helperText={errorMessage.name}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="Email"
            fullWidth
            value={data.email}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (value?.length === 0) {
                message = "Email không được để trống";
              } else if (!/^.+@(\w{2,}\.){1,2}\w{2,}$/gi.test(value)) {
                message = "Email không đúng định dạng";
              } else if (users.find((item) => item.email === value)) {
                message = "Email đã tồn tại, vui lòng chọn email khác";
              }
              setErrorMessage((prev) => ({ ...prev, email: message }));
              setData((prev) => ({ ...prev, email: value }));
            }}
            error={!!errorMessage.email}
            helperText={errorMessage.email}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="Tên đăng nhập"
            fullWidth
            value={data.username}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (!value) {
                message = "Tên đăng nhập không được trống";
              } else if (value?.length < 8 || value?.length > 16) {
                message = "Tên đăng nhập có độ phải dài từ 8 -16 kí tự";
              } else if (!/^[a-zA-Z0-9_-]{8,16}$/g.test(value)) {
                message =
                  "Tên đăng nhập chỉ cho phép chữ thường, chữ hoa, chữ số và các kí tự _ -";
              } else if (users.find((item) => item.username === value)) {
                message =
                  "Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác";
              }
              setErrorMessage((prev) => ({ ...prev, username: message }));
              setData((prev) => ({ ...prev, username: value }));
            }}
            error={!!errorMessage.username}
            helperText={errorMessage.username}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            type={isPasswordMasked ? "password" : "text"}
            label="Mật khẩu"
            fullWidth
            value={data.password}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (value?.length === 0) {
                message = "Mật khẩu không được để trống";
              } else if (value?.length < 8) {
                message = "Độ dài mật khẩu phải lớn hơn 8";
              } else if (
                !/[a-z]/g.test(value) ||
                !/[A-Z]/g.test(value) ||
                !/[0-9]/g.test(value) ||
                !/[!@#$%^&*()_-]/g.test(value)
              ) {
                message =
                  "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ số và 1 kí tự đăng biệt thuộc !@#$%^&*()_-";
              }
              let newErrorMessage = { ...errorMessage, password: message };
              if (value === data.confirmPassword) {
                newErrorMessage.confirmPassword = "";
              }
              setErrorMessage(newErrorMessage);
              setData((prev) => ({ ...prev, password: value }));
            }}
            error={!!errorMessage.password}
            helperText={errorMessage.password}
            InputProps={{
              endAdornment: passwordMaskedIcon,
            }}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            type={isConfirmPasswordMasked ? "password" : "text"}
            label="Nhập lại mật khẩu"
            fullWidth
            value={data.confirmPassword}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (value !== data.password) {
                message = "Mật khẩu không khớp";
              }
              setErrorMessage((prev) => ({
                ...prev,
                confirmPassword: message,
              }));
              setData((prev) => ({ ...prev, confirmPassword: value }));
            }}
            error={!!errorMessage.confirmPassword}
            helperText={errorMessage.confirmPassword}
            InputProps={{
              endAdornment: confirmPasswordMaskedIcon,
            }}
          />
        </div>

        <Button type="submit" variant="contained" fullWidth>
          Đăng ký
        </Button>
      </form>
      <div className="text-center mt-8 mb-8">
        Bạn đã có tài khoản?
        <Link
          to="/dang-nhap"
          className="font-semibold text-primary-500 hover:text-primary transition ml-2"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}
