import "./list.scss";
import { useState, useEffect, useRef } from "react";
import Datatable from "~/components/datatable/UserDatatable";
import { userColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";
import { UserService } from "../../services/user.service";
import ReactPaginate from "react-paginate";

const ListUser = () => {
  document.title = "Danh sách khách hàng";
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState();

  const stt = useRef();

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };
  useEffect(() => {
    function getUsers() {
      const input = {
        role: 99,
        page_count: 10,
        order_by: "CreatedAt Desc",
        page: currentPageNumber,
      };
      UserService.getAllUser(input).then((res) => {
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
    getUsers();
  }, []);
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable rows={data} title="khách hàng" userColumns={userColumns} />
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

export default ListUser;
