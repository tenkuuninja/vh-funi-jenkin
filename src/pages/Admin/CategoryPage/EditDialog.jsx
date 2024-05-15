import { useState, useEffect } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import { Save, Add } from "@mui/icons-material";
import { createCategory, updateCategory } from "redux/categorySlice";
import { useDispatch } from "react-redux";

const CategoryModal = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(data);
  const [errorMessage, setErrorMessage] = useState({});

  let isValid = category?.name?.length > 0;
  let isUpdate = typeof data?.id === "number";

  const hanldeSubmit = async () => {
    if (isUpdate) {
      dispatch(updateCategory(category));
    } else {
      dispatch(createCategory(category));
    }
    onClose();
  };

  useEffect(() => {
    setCategory(data);
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
            {isUpdate > 0 ? "Sửa" : "Thêm"} danh mục
          </h2>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Tên danh mục <span className="text-red-500">*</span>
          </p>
          <TextField
            size="small"
            placeholder="Nhập tên danh mục"
            fullWidth
            value={category?.name || ""}
            onChange={(e) => {
              let value = e.target.value;
              if (!value) {
                setErrorMessage((prev) => ({
                  ...prev,
                  name: "Tên danh mục không được trống",
                }));
              } else {
                setErrorMessage((prev) => ({ ...prev, name: null }));
              }
              setCategory((prev) => ({ ...prev, name: e.target.value }));
            }}
            error={!!errorMessage.name}
            helperText={errorMessage.name}
          />
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">Mô tả</p>
          <TextField
            size="small"
            placeholder="Nhập mô tả danh mục"
            fullWidth
            multiline
            minRows={4}
            value={category?.description || ""}
            onChange={(e) =>
              setCategory((prev) => ({ ...prev, description: e.target.value }))
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

export default CategoryModal;
