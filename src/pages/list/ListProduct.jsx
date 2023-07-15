import "./list.scss";
import { useState, useEffect, useRef } from "react";
import Datatable from "~/components/datatable/ProductDatatable";
import ProductService from "../../services/product.service";
import { productColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";
import { GlobalUtil } from "../../utils/GlobalUtil";
import ReactPaginate from "react-paginate";

const ListProduct = () => {
  document.title = "Danh sách sản phẩm";
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const stt = useRef();

  const handleDataChange = (newData) => {
    setDataFilter(newData);
  };

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };

  useEffect(() => {
    function getProducts() {
      const sort = {
        page_count: 10,
        order_by: "CreatedAt desc",
        page: currentPageNumber,
      };
      const input = { ...sort, ...dataFilter };

      ProductService.getAllProducts(input).then((res) => {
        stt.current = res?.offset + 1;
        setTotalCount(res.total_count);
        setData(() => {
          const onResult = res.data.map((item, index) => {
            if (stt.current > 10) {
              return {
                index: stt.current++,
                Price: GlobalUtil.commas(item.price + "") + "₫",
                Stand_cost: GlobalUtil.commas(item.stand_cost + "") + "₫",
                brandName: item.brand.name,
                categoryName: item.category.name,
                ...item,
              };
            }
            if (stt.current <= 10) {
              return {
                index: ++index,
                Price: GlobalUtil.commas(item.price + "") + "₫",
                Stand_cost: GlobalUtil.commas(item.stand_cost + "") + "₫",
                brandName: item.brand.name,
                categoryName: item.category.name,
                ...item,
              };
            }
          });
          return onResult;
        });
        const pageCountRounded = Math.ceil(res.total_count / res.page_size);
        setPageCount(pageCountRounded);
      });
    }
    getProducts();
  }, [currentPageNumber, dataFilter]);
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
          onDataChange={handleDataChange}
        />
        {totalCount > 10 && (
          <ReactPaginate
            className="pagination-item "
            breakLabel="..."
            nextLabel="►"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="◄"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        )}
      </div>
    </div>
  );
};

export default ListProduct;
