import "./list.scss";
import { useState, useEffect, useRef } from "react";
import Datatable from "~/components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import BrandService from "../../services/brand.service";
import { brandColumns } from "~/datatablesource";
import ReactPaginate from "react-paginate";

const ListBrand = () => {
  document.title = "Danh sách thương hiệu";
  const locationUrl = useLocation();
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState();

  const stt = useRef();

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };
  useEffect(() => {
    function getAllBrands() {
      const data = {
        page_count: 10,
        order_by: "CreatedAt Desc",
        page: currentPageNumber,
      };
      BrandService.getAllBrands(data).then((res) => {
        stt.current = res?.offset + 1;
        setTotalCount(res.total_count);
        setData(() => {
          const onResult = res.data.map((item, index) => {
            if (stt.current > 10) {
              return {
                index: stt.current++,
                ...item,
              };
            }
            if (stt.current <= 10) {
              return {
                index: ++index,
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
    getAllBrands();
  }, [currentPageNumber]);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="brands"
          rows={data}
          title="thương hiệu"
          columns={brandColumns}
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

export default ListBrand;
