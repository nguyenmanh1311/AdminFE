import Home from "../pages/home/Home";
import Statistical from "../pages/statistical/Statistical";
import Order from "../pages/order/Order";
import ListProduct from "../pages/list/ListProduct";
import User from "../pages/single/User";
import NotFound from "../pages/notfound/NotFound";
import { productInputs, userInputs } from "../formSource";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import ListUser from "../pages/list/ListUser";
import Layout from "~/components/layout";
import { typeProduct, typeBrand, typeCategory } from "../formSource";
import EditProduct from "../pages/new/newProduct/EditProduct";
import NewProduct from "../pages/new/newProduct/NewProduct";
import Login from "../pages/login/Login";
import NewCustomer from "../pages/new/user/NewCustomer";
import NewBrand from "../pages/new/newBrand/NewBrand";
import ListBrand from "../pages/list/ListBrand";
import ListCategory from "../pages/list/ListCategory";
import EditBrand from "../pages/new/newBrand/EditBrand";
import EditCategory from "../pages/new/newCategory/EditCategory";
import NewCategory from "../pages/new/newCategory/NewCategory";
import ListStaff from "../pages/list/ListStaff";
import NewStaff from "../pages/new/newStaff/NewStaff";
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="statistical"
          element={<Statistical title="Thống kê doanh thu" />}
        />
        <Route
          path="orders"
          element={<Order title="Đơn hàng - thegioididong" />}
        />
        <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<User />} />
          <Route
            path="new"
            element={
              <NewCustomer inputs={userInputs} title="Thêm người dùng mới" />
            }
          />
        </Route>
        <Route path="staffs">
          <Route index element={<ListStaff />} />
          <Route
            path="new"
            element={
              <NewStaff inputs={userInputs} title="Thêm nhân viên mới" />
            }
          />
        </Route>
        <Route path="products">
          <Route index element={<ListProduct />} />
          <Route
            path=":productId"
            element={
              <EditProduct inputs={typeProduct} title="Chỉnh sửa sản phẩm" />
            }
          />
          <Route
            path="new"
            element={
              <NewProduct inputs={typeProduct} title="Thêm sản phẩm mới" />
            }
          />
        </Route>
        <Route path="brands">
          <Route index element={<ListBrand />} />
          <Route
            path="new"
            element={
              <NewBrand inputs={typeBrand} title="Thêm thương hiệu mới" />
            }
          />
          <Route path=":brandId" element={<EditBrand />} />
        </Route>
        <Route path="categories">
          <Route index element={<ListCategory />} />
          <Route
            path="new"
            element={
              <NewCategory inputs={typeCategory} title="Thêm phân loại mới" />
            }
          />
          <Route path=":categoryId" element={<EditCategory />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
