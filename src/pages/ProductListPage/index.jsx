import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "components/ProductCard";
import { Helmet } from "react-helmet";
import { toSlug } from "utils";

const orderTypes = [
  "Mới nhất",
  "Cũ nhất",
  "Tên tăng dần",
  "Tên giảm dần",
  "Giá tăng dần",
  "Giá giảm dần",
];

const pageSize = 10;

const ProductListPage = () => {
  const productStore = useSelector((store) => store.product.data);
  const categoryStore = useSelector((store) => store.category.data);
  const [products, setProducts] = useState(productStore);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(orderTypes[0]);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let re = new RegExp(toSlug(search), "gi");
    let result = productStore.filter((item) => re.test(toSlug(item.name)));

    if (category != null) {
      result = result.filter((item) => item?.category?.id === category?.id);
    }

    switch (sort) {
      case "Mới nhất":
        result.sort((a, b) => a.id - b.id);
        break;
      case "Cũ nhất":
        result.sort((a, b) => b.id - a.id);
        break;
      case "Tên tăng dần":
        result.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "Tên giảm dần":
        result.sort((a, b) => (b.name > a.name ? 1 : -1));
        break;
      case "Giá tăng dần":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Giá giảm dần":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setProducts(result);
    setPage(1);
  }, [search, productStore, category, sort]);

  useEffect(() => {
    let cateId = +searchParams.get("cate");
    if (!isNaN(cateId) && cateId > 0) {
      for (let cate of categoryStore) {
        if (cate.id === cateId) {
          setCategory(cate);
          break;
        }
      }
    } else {
      setCategory(null);
    }
  }, [searchParams, categoryStore]);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Sản phẩm | Nội thất Việt Hoàng</title>
      </Helmet>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 p-4 my-4">
        <div className="order-2 md:order-1">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categoryStore}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size="small"
            fullWidth
            value={category}
            onChange={(e, value) => setCategory(value)}
            sx={{
              fieldset: {
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
            renderInput={(params) => <TextField {...params} label="Danh mục" />}
          />
        </div>
        <div className="col-span-2 order-1 md:order-2">
          <TextField
            label="Tìm kiếm"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              fieldset: { "@media (min-width: 768px)": { borderRadius: 0 } },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="order-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={orderTypes}
            size="small"
            fullWidth
            onChange={(e, value) => setSort(value)}
            sx={{
              fieldset: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                "@media (min-width: 768px)": {
                  borderLeftWidth: 0,
                },
              },
            }}
            renderInput={(params) => <TextField {...params} label="Sắp xếp" />}
          />
        </div>
      </div>
      <div className="mx-4 mt-2">
        <span className="text-sm text-slate-400">
          {search?.length > 0 ? "Kết quả tìm kiếm của: " : "Kết quả"}
        </span>
        {search?.length > 0 && (
          <span className="text-sm text-slate-600 font-semibold">
            "{search}"
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-3 md:p-3 xl:p-0">
        {products
          ?.slice((page - 1) * pageSize, page * pageSize)
          ?.map((item, i) => (
            <div
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="p-1 md:p-2 xl:p-4"
              key={i}
            >
              <ProductCard product={item} />
            </div>
          ))}
      </div>
      {products.length === 0 && (
        <div className="flex justify-center items-center w-full h-96 text-2xl font-bold uppercase text-primary">
          Danh sách trống
        </div>
      )}
      <div className="flex justify-center mt-10 mb-16">
        {products.length > 0 && (
          <Pagination
            page={page}
            count={Math.ceil(products?.length / pageSize)}
            hidePrevButton
            hideNextButton
            showFirstButton
            showLastButton
            onChange={(e, value) => value !== null && setPage(value)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
