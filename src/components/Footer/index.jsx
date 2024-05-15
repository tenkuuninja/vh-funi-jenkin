import { Link } from "react-router-dom";

const str =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem fugiat tempore, ipsa, modi facilis porro quasi neque nemo rerum pariatur suscipit quae consectetur!";

const categories = [
  { text: "Rèm cửa", url: "#" },
  { text: "Bàn ghế", url: "#" },
  { text: "Tranh treo tường", url: "#" },
  { text: "Đèn ngủ", url: "#" },
];

const contacts = [
  { text: <> Đại học Thủy Lợi</>, url: "#" },
  { text: <> (+84)96969696969</>, url: "#" },
  { text: <> viethoang130302@gmail.com</>, url: "#" },
];

const links = [
  { text: "Giá cả", url: "#" },
  { text: "Afiliates", url: "#" },
  { text: "Chính sách bảo mật", url: "#" },
  { text: "Điều khoản sử dụng", url: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#244d4d] text-white w-full">
      <div
        className={`container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-20`}
      >
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Giới thiệu</h3>
          <p className="text-justify">{str}</p>
        </div>
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Liên hệ</h3>
          {contacts.map((item, i) => (
            <p
              className="flex items-center mt-1 hover:underline cursor-pointer"
              key={i}
            >
              {item.text}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Danh mục</h3>
          {categories.map((item, i) => (
            <Link className="block mt-1 hover:underline" to={item.url} key={i}>
              {item.text}
            </Link>
          ))}
        </div>
        <div className="hidden sm:block">
          <h3 className="text-2xl leading-6 font-semibold mb-4">Liên kết</h3>
          {links.map((item, i) => (
            <Link className="block mt-1 hover:underline" to={item.url} key={i}>
              {item.text}
            </Link>
          ))}
        </div>
      </div>
      <div>

      </div>
    </footer>
  );
};

export default Footer;
