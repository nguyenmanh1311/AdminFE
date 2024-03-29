import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/NewsDatatable";
import { newColumns } from "~/datatablesource";
import { GlobalUtil } from "../../utils/GlobalUtil";
import ReactPaginate from "react-paginate";
import newsService from "../../services/news.service";

const ListNews = () => {
  document.title = "Danh sách tin tức";
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const stt = useRef();

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };

  const handleDataChange = (newData) => {
    setDataFilter(newData);
  };

  useEffect(() => {
    function getNews() {
      const sort = {
        page_count: 10,
        order_by: "CreatedAt desc",
        page: currentPageNumber,
      };
      const input = { ...sort, ...dataFilter };

      newsService.getAllNews(input).then((res) => {
        stt.current = res?.offset + 1;
        setTotalCount(res.total_count);

        setData(() => {
          const onResult = res.data.map((item, index) => {
            if (stt.current > 10) {
              return {
                index: stt.current++,
                createdDate: GlobalUtil.dateConvert(item.created_at),
                creatorName: item.creator.fullname,
                editorName: item.editor.fullname,
                ...item,
              };
            }
            if (stt.current <= 10) {
              return {
                index: ++index,
                createdDate: GlobalUtil.dateConvert(item.created_at),
                creatorName: item.creator.fullname,
                editorName: item.editor.fullname,
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
    getNews();
  }, [currentPageNumber, dataFilter]);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="news"
          rows={data}
          title="tin tức"
          newColumns={newColumns}
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

export default ListNews;
