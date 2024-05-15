export const toSlug = (str) => {
  str = str.toLowerCase();
  str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  str = str.replace(/đ/gi, "d");
  str = str.replace(/[\W]/gi, " ");
  str = str.trim();
  str = str.replace(/\s+/gi, "-");
  return str;
};

export const toVietnamCurentcy = (amount) => {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};

export const compactParagraph = (str, length = 70) => {
  if (!str) {
    return "";
  }
  if (str.length <= length) {
    return str;
  }
  return str.substring(0, length).trim() + "...";
};
