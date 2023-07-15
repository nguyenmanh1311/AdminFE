import "./list.scss";
import { useState, useEffect, useRef } from "react";
import Datatable from "~/components/datatable/StaffDatabase";
import { UserService } from "~/services/user.service";
import { staffColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ListStaff = () => {
  document.title = "Danh sách nhân viên";
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
    function getUsers() {
      const sort = {
        role: 2,
        page_count: 10,
        order_by: "CreatedAt Desc",
        page: currentPageNumber,
      };

      const input = { ...sort, ...dataFilter };

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
  }, [currentPageNumber, dataFilter]);
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          rows={data}
          title="nhân viên"
          userColumns={staffColumns}
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

export default ListStaff;
