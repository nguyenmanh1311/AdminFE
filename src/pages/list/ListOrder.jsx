import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Datatable from "~/components/datatable/OrderDatatable";
import { OrderService } from "../../services/order.service";
import { orderColumns } from "~/datatablesource";
import { GlobalUtil } from "../../utils/GlobalUtil";
import ReactPaginate from "react-paginate";

const ListOrder = () => {
  document.title = "Danh sách đơn hàng";

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
    function getOrders() {
      const sort = {
        page_count: 10,
        order_by: "CreatedAt desc",
        page: currentPageNumber,
      };
      const input = { ...sort, ...dataFilter };

      OrderService.getAllOrder(input).then((res) => {
        stt.current = res?.offset + 1;
        setTotalCount(res.total_count);
        setData(() => {
          const onResult = res.data.map((item, index) => {
            if (stt.current > 10) {
              return {
                index: stt.current++,
                createdDate: GlobalUtil.dateConvert(item.created_at),
                totalPrice:
                  GlobalUtil.commas(item.total + item.shipping_fee + "") + "₫",
                ...item,
              };
            }
            if (stt.current <= 10) {
              return {
                index: ++index,
                createdDate: GlobalUtil.dateConvert(item.created_at),
                totalPrice:
                  GlobalUtil.commas(item.total + item.shipping_fee + "") + "₫",
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
    getOrders();
  }, [currentPageNumber, dataFilter]);
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable
          type="orders"
          rows={data}
          title="đơn hàng"
          orderColumns={orderColumns}
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

export default ListOrder;
