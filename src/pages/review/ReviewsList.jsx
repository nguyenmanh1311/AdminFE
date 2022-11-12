import { useState, useEffect } from "react";
import Sidebar from "~/components/sidebar/Sidebar";
import Navbar from "~/components/navbar/Navbar";
import Datatable from "~/components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import { ProductService } from "~/services";
import { reviewProductColumns } from "~/datatablesource";

const ReviewsList = () => {
	document.title = "Đánh giá sản phẩm";
	const [data, setData] = useState([]);
	useEffect(() => {
		function getProducts() {
			ProductService.getProducts().then((res) => {
				console.log(res.data);
				setData(res.data);
			});
		}
		getProducts();
	}, []);
	return (
		<div>
			<div>
				<Datatable
					rows={data}
					title="đánh giá"
					productColumns={reviewProductColumns}
					type="review"
				/>
			</div>
		</div>
	);
};

export default ReviewsList;
