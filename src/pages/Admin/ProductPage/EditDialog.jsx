import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  TextField,
  Button,
  Autocomplete,
  Input,
  InputAdornment,
} from "@mui/material";
import { Save, Add } from "@mui/icons-material";
import { createProduct, updateProduct } from "redux/productSlice";
import { toSlug } from "utils";

const EditDialog = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.category.data);
  const [product, setProduct] = useState(data);
  const [errorMessage, setErrorMessage] = useState({});

  let isUpdate = typeof data?.id === "number";
  let isValid =
    product?.category?.id > 0 &&
    product?.name?.length > 0 &&
    /^[a-z0-9-]+$/g.test(product?.slug) &&
    /^[0-9]+$/g.test(product?.price) &&
    /^[0-9]+$/g.test(product?.stock) &&
    product?.image?.length > 0;

  const hanldeSubmit = async () => {
    if (isUpdate) {
      dispatch(updateProduct(product));
    } else {
      dispatch(createProduct(product));
    }
    onClose();
  };

  useEffect(() => {
    setProduct(data);
    setErrorMessage({});
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
          <h2 className="text-2xl text-primary font-bold">
            {isUpdate > 0 ? "Sửa" : "Thêm"} sản phẩm
          </h2>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Danh mục sản phẩm <span className="text-red-500">*</span>
          </p>
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            fullWidth
            disableClearable
            size="small"
            value={product?.category || null}
            onChange={(e, option) =>
              setProduct((prev) => ({ ...prev, category: option }))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Chọn danh mục sản phẩm" />
            )}
          />
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Tên sản phẩm <span className="text-red-500">*</span>
          </p>
          <TextField
            size="small"
            placeholder="Nhập tên sản phẩm"
            fullWidth
            value={product?.name || ""}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              let messageSlug = "";
              if (!value) {
                message = "Tên sản phẩm không được trống";
                messageSlug = "Url sản phẩm không được trống";
              }
              setErrorMessage((prev) => ({
                ...prev,
                name: message,
                slug: messageSlug,
              }));
              setProduct((prev) => ({
                ...prev,
                name: value,
                slug: toSlug(value),
              }));
            }}
            error={!!errorMessage.name}
            helperText={errorMessage.name}
          />
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Url sản phẩm <span className="text-red-500">*</span>
          </p>
          <TextField
            size="small"
            placeholder="Nhập tên sản phẩm"
            fullWidth
            value={product?.slug || ""}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (!value) {
                message = "Url sản phẩm không được trống";
              } else if (!/^[a-z0-9-]+$/g.test(value)) {
                message = "Url không đúng định dạng";
              }
              setErrorMessage((prev) => ({ ...prev, slug: message }));
              setProduct((prev) => ({ ...prev, slug: e.target.value }));
            }}
            error={!!errorMessage.slug}
            helperText={errorMessage.slug}
          />
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Ảnh minh họa <span className="text-red-500">*</span>
          </p>
          <div className="mb-2">
            {product?.image ? (
              <img
                className="object-cover w-40 h-40"
                src={product?.image}
                alt=""
              />
            ) : (
              <p className="text-slate-500 font-light text-sm">
                Sản phẩm này chưa có ảnh minh họa
              </p>
            )}
          </div>
          <div className="hidden">
            <Input
              id="upload-file-input"
              accept="image/*"
              type="file"
              onChange={(e) => {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (abc) => {
                  setProduct((prev) => ({ ...prev, image: reader.result }));
                };
              }}
            />
          </div>
          <label htmlFor="upload-file-input">
            <Button variant="contained" component="span">
              Tải ảnh lên
            </Button>
          </label>
        </div>
        <div className="md:flex w-full">
          <div className="mt-6 w-full md:w-1/2 md:mr-4">
            <p className="mb-2 text-slate-600 font-semibold">
              Giá <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập giá sản phẩm"
              fullWidth
              value={product?.price || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (value?.length === 0) {
                  message = "Giá sản phẩm không được để trống";
                } else if (!/^-?[0-9]+$/g.test(value)) {
                  message = "Giá sản phẩm phải là số";
                } else if (+value < 0) {
                  message = "Giá sản phẩm không được âm";
                }
                setErrorMessage((prev) => ({ ...prev, price: message }));
                setProduct((prev) => ({ ...prev, price: value }));
              }}
              error={!!errorMessage.price}
              helperText={errorMessage.price}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">VND</InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mt-6 w-full md:w-1/2 md:ml-4">
            <p className="mb-2 text-slate-600 font-semibold">
              Trong kho <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập số sản phẩm trong kho"
              fullWidth
              value={product?.stock || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (value?.length === 0) {
                  message = "Số sản phẩm trong kho không được để trống";
                } else if (!/^-?[0-9]+$/g.test(value)) {
                  message = "Số sản phẩm trong kho phải là số";
                } else if (+value < 0) {
                  message = "Số sản phẩm trong kho không được âm";
                }
                setErrorMessage((prev) => ({ ...prev, stock: message }));
                setProduct((prev) => ({ ...prev, stock: value }));
              }}
              error={!!errorMessage.stock}
              helperText={errorMessage.stock}
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">Mô tả</p>
          <TextField
            size="small"
            placeholder="Nhập mô tả sản phẩm"
            fullWidth
            multiline
            minRows={4}
            value={product?.description || ""}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!isValid}
            startIcon={isUpdate > 0 ? <Save /> : <Add />}
            onClick={hanldeSubmit}
          >
            {isUpdate > 0 ? "Sửa" : "Thêm"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDialog;
