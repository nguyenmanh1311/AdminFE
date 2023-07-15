import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandService from "../../services/brand.service";
import categoryService from "../../services/category.service";
import Swal from "sweetalert2";
import productService from "../../services/product.service";

const ProductDatatable = ({ rows, title, productColumns, onDataChange }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [brandOption, setBrandOption] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      category_id: categoryOption,
      brand_id: brandOption,
      create_at_from: startDate,
      create_at_to: endDate,
    };
    console.log("data oderdatable", data);
    onDataChange(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa sản phẩm này không ?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: "Không",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        productService.deleteProductByID(id).then(() => {
          Swal.fire("Thông báo", "Xóa thành công", "success");
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (result.isDenied) {
        Swal.fire("Thông báo", "Sản phẩm chưa được xóa", "info");
      }
    });
  };

  const handleDeleteFilter = () => {
    setName("");
    setStartDate();
    setEndDate();
    setCategoryOption("");
    setBrandOption("");
    const data = {
      name: null,
      category_id: null,
      brand_id: null,
      create_at_from: null,
      create_at_to: null,
    };
    console.log("data oderdatable delete", data);
    onDataChange(data);
  };

  const actionColumn = [
    {
      field: "action",
      renderHeader: (params) => <strong>Xử lý</strong>,
      headerAlign: "center",
      flex: 0.8,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction ">
            <Link
              to={`/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchshowAllCategory = () => {
      categoryService.getAllCategory().then((res) => {
        setAllCategory(res.data);
      });
    };

    const fetchshowAllBrand = () => {
      brandService.getAllBrands().then((res) => {
        setAllBrand(res.data);
      });
    };
    fetchshowAllBrand();
    fetchshowAllCategory();
  }, []);

  return (
    <div className="datatable overflow-hidden h-[1100px]">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/products/new");
          }}
          className="bg-teal-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:bg-teal-600 transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>
      <form>
        <div className="space-y-12 border-b border-gray-900/10 pb-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Bộ lọc
            </h2>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên sản phẩm
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thương hiệu
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    name="brand"
                    autoComplete="brand"
                    value={brandOption}
                    onChange={(e) => setBrandOption(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">--Các lựa chọn--</option>
                    {allBrand.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thể loại
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    value={categoryOption}
                    onChange={(e) => setCategoryOption(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">---Các lựa chọn---</option>
                    {allCategory.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="form"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày tạo từ
                </label>
                <div className="mt-2">
                  <input
                    id="form"
                    type="date"
                    value={startDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="to"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày tạo đến
                </label>
                <div className="mt-2">
                  <input
                    id="to"
                    type="date"
                    value={endDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <div className="flex  justify-center gap-x-6 ">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 "
                >
                  Lọc đơn hàng
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 "
                  onClick={handleDeleteFilter}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={productColumns?.concat(actionColumn)}
        hideFooter={true}
        rowHeight={200}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
          "& .MuiDataGrid-columnHeaders": {},
        }}
      />
    </div>
  );
};

export default ProductDatatable;
