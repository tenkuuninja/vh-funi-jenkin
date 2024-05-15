import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { login } from "redux/authSlice";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const users = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsMasked, setPasswordMasked] = useState(true);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      toast.warn("Tên đăng nhập và mật khẩu không được để trống");
      return;
    }

    let user = users.find(
      (item) => item.username === username && item.password === password
    );
    if (!user) {
      toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
      return;
    }

    dispatch(login(user));
    toast.success("Đăng nhập thành công");
    navigate("/");
  };

  const passwordMaskedIcon = (
    <InputAdornment position="end">
      <IconButton
        size="small"
        onClick={() => setPasswordMasked(!passwordIsMasked)}
      >
        {passwordIsMasked ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className="max-w-sm mx-auto p-4 mt-4">
      <Helmet>
        <title>Đăng nhập | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="font-bold text-center text-primary text-2xl mb-8">
        Đăng nhập
      </div>
      <form className="space-y-6 py-6" onSubmit={onSubmit}>
        <TextField
          variant="standard"
          size="small"
          label="Tên đăng nhập"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          <TextField
            variant="standard"
            size="small"
            type={passwordIsMasked ? "password" : "text"}
            label="Mật khẩu"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: passwordMaskedIcon,
            }}
          />
          <div className="text-right text-slate-600 text-sm mt-1">
            <span
              className="cursor-pointer"
              onClick={() => toast.info("Liên hệ với Hoàng để được hỗ trợ")}
            >
              Quên mật khẩu?
            </span>
          </div>
        </div>

        <Button type="submit" variant="contained" fullWidth>
          Đăng nhập
        </Button>
      </form>
      <div className="text-center mt-8 mb-8">
        Bạn chưa có tài khoản?
        <Link
          to="/dang-ky"
          className="font-semibold text-primary-500 hover:text-primary transition ml-2"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
