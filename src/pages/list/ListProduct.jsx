import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/Datatable";
import { ProductService } from "~/services";
import { productColumns } from "~/datatablesource";

const ListProduct = () => {
	document.title = "Sản phẩm";
	const [data, setData] = useState([]);

	useEffect(() => {
		function getProducts() {
			ProductService.getProducts(1, 9999).then((res) => setData(res.data));
		}
		getProducts();
	}, []);

	return (
		<div>
			<div>
				<Datatable rows={data} title={"sản phẩm"} productColumns={productColumns} type="products" />
			</div>
		</div>
	);
};

export default ListProduct;
