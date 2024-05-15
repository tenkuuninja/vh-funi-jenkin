import { Fragment } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Send, Lock, Undo } from "@mui/icons-material";
import ProductCard from "components/ProductCard";
import { Helmet } from "react-helmet";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const imgs = [
  { src: "/images/slide-1.jpg", text: "Thiết kế tinh tế" },
  { src: "/images/slide-3.jpg", text: "Nội thất hiện đại" },
  { src: "/images/slide-4.jpg", text: "Không gian thoải mái" },
];

const services = [
  {
    icon: <Send />,
    title: "Giao hàng toàn quốc",
    desc: "Vận chuyển,giao hàng toàn quốc với mọi mặt hàng",
  },
  {
    icon: <Lock />,
    title: "Thanh toán an toàn",
    desc: "Quý khách hàng nhận hàng mới phải thanh toán",
  },
  {
    icon: <Undo />,
    title: "Đổi trả trong 20 ngày",
    desc: "Tất cả sản phẩm áp dụng đổi trả 1/1 trong 20 ngày",
  },
];

const spaces = [
  {
    image: "/images/space-1.webp",
    no: "01",
    title: "Phòng khách",
    desc: "Sofa, ghế tựa, ghế xoay...",
    text: "Tiếp đãi khách hoặc sử dụng làm không gian sinh hoạt chung cho các thành viên trong gia đình. ",
  },
  {
    image: "/images/space-2.webp",
    no: "02",
    title: "Nhà bếp",
    desc: "Tủ bếp, kệ đồ dùng nhà bếp...",
    text: "Một căn phòng hoặc một phần của căn phòng được sử dụng để nấu nướng ",
  },
  {
    image: "/images/space-3.webp",
    no: "03",
    title: "Phòng ngủ",
    desc: "Các loại giường ngủ, tủ áo...",
    text: "nơi mọi người đi ngủ vào ban đêm hoặc nghỉ ngơi, thư giãn trong ngày",
  },
];

const HomePage = () => {
  const products = useSelector((store) => store.product.data);
  return (
    <Fragment>
      <Helmet>
        <title>Trang chủ | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="mb-8">
        <Slider {...settings}>
          {imgs.map((item, i) => (
            <div className="relative pt-[45%] overflow-hidden" key={i}>
              <img
                className="absolute inset-0 object-cover"
                src={item.src}
                alt=""
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
                <p className="slide-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-2xl font-black uppercase transition-all duration-500 delay-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="container mx-auto mt-10 px-4 space-y-6 md:space-y-0">
        {services.map((item, i) => (
          <div
            data-aos="fade-up"
            data-aos-delay={i * 150}
            className="inline-flex flex-col lg:flex-row items-center lg:items-start w-full md:w-1/3 lg:px-4"
            key={i}
          >
            <div className="bg-primary text-white p-3 inline rounded-full">
              {item.icon}
            </div>
            <div className="flex-grow text-center lg:text-left mt-2 lg:mt-0 lg:ml-2">
              <p className="uppercase text-lg font-bold text-primary">
                {item.title}
              </p>
              <p className="font-light text-slate-700">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 py-12 mt-10" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl text-[#244d4d] font-extrabold uppercase">
            Không gian nội thất
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mt-4">
            {spaces.map((item, i) => (
              <div data-aos="fade-up" data-aos-delay={i * 150} key={i}>
                <div className="space-item relative rounded-md overflow-hidden transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 ">
                  <img className="w-full" src={item.image} alt="" />
                  <p className="space-item__text absolute bottom-0 p-4 text-white opacity-0 translate-y-4 transition-all z-10">
                    {item.text}
                  </p>
                </div>
                <div className="flex mt-4">
                  <div className="text-primary font-light text-6xl md:text-4xl lg:text-6xl underline">
                    {item.no}
                  </div>
                  <div className="ml-4">
                    <p className="text-slate-800 font-extrabold text-xl uppercase leading-loose">
                      {item.title}
                    </p>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10 mb-10" data-aos="fade-up">
        <h3 className="text-3xl text-[#244d4d] font-extrabold uppercase px-4">
          Từ cửa hàng
        </h3>
        <Slider
          dots={false}
          infinite={false}
          slidesToShow={5}
          slidesToScroll={5}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {products.map((item, i) => (
            <div
              data-aos="fade-up"
              data-aos-delay={i * 150}
              key={i}
              className="p-1 md:p-2 xl:p-4"
            >
              <ProductCard product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};

export default HomePage;
