import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/Datatable";
import ProductService from "../../services/product.service";
import { productColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";

const ListProduct = () => {
  document.title = "Danh sách sản phẩm";
  const [data, setData] = useState([]);

  useEffect(() => {
    function getProducts() {
      ProductService.getAllProducts(1, 9999).then((res) => setData(res.data));
    }
    getProducts();
  }, []);
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          rows={data}
          title={"sản phẩm"}
          productColumns={productColumns}
          type="products"
        />
      </div>
    </div>
  );
};

export default ListProduct;
