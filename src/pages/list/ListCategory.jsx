import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import CategoryService from "../../services/category.service";
import { categoryColumns } from "~/datatablesource";

const ListCategory = () => {
  document.title = "Danh sách phân loại";
  const locationUrl = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    function getAllCategory() {
      CategoryService.getAllCategory(1, 9).then((res) => setData(res.data));
    }
    getAllCategory();
  }, []);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="categories"
          rows={data}
          title="phân loại sản phẩm"
          productColumns={categoryColumns}
        />
      </div>
    </div>
  );
};

export default ListCategory;
