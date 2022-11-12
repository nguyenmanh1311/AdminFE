import Home from "../pages/home/Home";
import Order from "../pages/order/Order";
import Login from "../pages/login/Login";
import ListProduct from "../pages/list/ListProduct";
import Product from "../pages/single/Product";
import User from "../pages/single/User";
import Comment from "../pages/comment/Comment";
import New from "../pages/new/New";
import NotFound from "../pages/notfound/NotFound";
import { productInputs, userInputs } from "../formSource";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import ListUser from "../pages/list/ListUser";
import ListReview from "../pages/list/ListReview";
import CommentView from "./../pages/comment/CommentView";
import ReviewsList from "../pages/review/ReviewsList";
import ReviewsView from "../pages/review/ReviewsView";
import Layout from "~/components/layout";
import { typeProduct } from "../formSource";
import EditProduct from "../pages/new/newPhone/EditProduct";
import NewPhone from "../pages/new/newPhone/NewPhone";
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
				<Route path="orders" element={<Order title="Đơn hàng - thegioididong" />} />
				<Route path="users">
					<Route index element={<ListUser />} />
					<Route path=":userId" element={<User />} />
					<Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
				</Route>
				<Route path="products">
					<Route index element={<ListProduct />} />
					<Route
						path=":productId"
						element={<EditProduct inputs={typeProduct} title="Add New Product" />}
					/>
					<Route path="new" element={<NewPhone inputs={typeProduct} title="Add New Product" />} />
				</Route>
				<Route path="reviews">
					<Route index element={<ReviewsList />} />
					<Route path=":reviewId" element={<ReviewsView />} />
				</Route>
				<Route path="comments">
					<Route index element={<Comment />} />
					<Route path=":commentId" element={<CommentView />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};
