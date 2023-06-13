import Home from "../pages/home/Home";
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
import ListOrder from "../pages/list/ListOrder";
import OrderDetail from "../pages/order/OrderDetail";
import ListNews from "../pages/list/ListNews";
import NewPost from "../pages/new/newPost/newPost";
import EditPost from "../pages/new/newPost/EditPost";
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

        <Route path="orders">
          <Route index element={<ListOrder />} />
          <Route
            path=":orderId"
            element={<OrderDetail title="Xem chi tiết đơn hàng" />}
          />
        </Route>
        <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<User />} />
          <Route
            path="new"
            element={<NewCustomer title="Thêm người dùng mới" />}
          />
        </Route>
        <Route path="staffs">
          <Route index element={<ListStaff />} />
          <Route path="new" element={<NewStaff title="Thêm nhân viên mới" />} />
        </Route>
        <Route path="products">
          <Route index element={<ListProduct />} />
          <Route
            path=":productId"
            element={<EditProduct title="Chỉnh sửa sản phẩm" />}
          />
          <Route
            path="new"
            element={<NewProduct title="Thêm sản phẩm mới" />}
          />
        </Route>
        <Route path="brands">
          <Route index element={<ListBrand />} />
          <Route
            path="new"
            element={<NewBrand title="Thêm thương hiệu mới" />}
          />
          <Route path=":brandId" element={<EditBrand />} />
        </Route>

        <Route path="categories">
          <Route index element={<ListCategory />} />
          <Route
            path="new"
            element={<NewCategory title="Thêm phân loại mới" />}
          />
          <Route path=":categoryId" element={<EditCategory />} />
        </Route>

        <Route path="news">
          <Route index element={<ListNews />} />
          <Route path="new" element={<NewPost title="Thêm tin tức mới" />} />
          <Route path=":postId" element={<EditPost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
