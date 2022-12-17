import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import BrandService from "../../services/brand.service";
import { brandColumns } from "~/datatablesource";

const ListBrand = () => {
  document.title = "Danh sách thương hiệu";
  const locationUrl = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    function getAllBrands() {
      BrandService.getAllBrands(1, 9).then((res) => {
        setData(res.data);
      });
    }
    getAllBrands();
  }, []);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="brands"
          rows={data}
          title="thương hiệu"
          productColumns={brandColumns}
        />
      </div>
    </div>
  );
};

export default ListBrand;
