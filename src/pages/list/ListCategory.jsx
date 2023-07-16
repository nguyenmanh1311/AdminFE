import "./list.scss";
import { useState, useEffect, useRef } from "react";
import Datatable from "~/components/datatable/Datatable";
import CategoryService from "../../services/category.service";
import { categoryColumns } from "~/datatablesource";
import { GlobalUtil } from "../../utils/GlobalUtil";
import ReactPaginate from "react-paginate";

const ListCategory = () => {
  document.title = "Danh sách phân loại";
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
    function getAllCategory() {
      const sort = {
        page_count: 10,
        order_by: "CreatedAt Desc",
        page: currentPageNumber,
      };
      const input = { ...sort, ...dataFilter };

      CategoryService.getAllCategory(input).then((res) => {
        stt.current = res?.offset + 1;
        setTotalCount(res.total_count);

        setData(() => {
          const onResult = res.data.map((item, index) => {
            if (stt.current > 10) {
              return {
                index: stt.current++,
                createdDate: GlobalUtil.dateConvert(item.created_at),
                ...item,
              };
            }
            if (stt.current <= 10) {
              return {
                index: ++index,
                createdDate: GlobalUtil.dateConvert(item.created_at),
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
    getAllCategory();
  }, [currentPageNumber, dataFilter]);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="categories"
          rows={data}
          title="phân loại sản phẩm"
          columns={categoryColumns}
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

export default ListCategory;
