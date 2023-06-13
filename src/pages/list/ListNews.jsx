import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/NewsDatatable";
import { newColumns } from "~/datatablesource";
import { GlobalUtil } from "../../utils/GlobalUtil";
import ReactPaginate from "react-paginate";
import newsService from "../../services/news.service";
import useNews from "../../hooks/useNews";
import { useDataContext } from "../../context/DataProvider";
const ListNews = () => {
  document.title = "Danh sách tin tức";

  const { data, setCurrentPageNumber, pageCount, getNews } = useDataContext();

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="news"
          rows={data}
          title="tin tức"
          newColumns={newColumns}
        />

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
      </div>
    </div>
  );
};

export default ListNews;
