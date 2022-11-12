import { useState, useEffect } from "react";
import Sidebar from "~/components/sidebar/Sidebar";
import Navbar from "~/components/navbar/Navbar";
import Datatable from "~/components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import { ProductService } from "~/services";
import { productColumns } from "~/datatablesource";

const Comment = () => {
	document.title = "Bình luận sản phẩm";
	const [data, setData] = useState([]);
	useEffect(() => {
		function getProducts() {
			ProductService.getProducts().then((res) => setData(res.data));
		}
		getProducts();
	}, []);
	return (
		<div>
			<div>
				<Datatable rows={data} title="bình luận" productColumns={productColumns} type="comment" />
			</div>
		</div>
	);
};

export default Comment;
