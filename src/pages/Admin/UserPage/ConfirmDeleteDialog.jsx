import { Dialog, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteUser } from "redux/userSlice";
import { useDispatch } from "react-redux";

const ConfirmDeleteDialog = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();

  const hanldeSubmit = async () => {
    dispatch(deleteUser(data));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="p-4 md:p-6">
        <p className="text-2xl text-slate-700 font-bold">
          Bạn có chắc muốn xóa `{data?.name}`
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            color="error"
            onClick={hanldeSubmit}
            startIcon={<Delete />}
          >
            Xóa
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
