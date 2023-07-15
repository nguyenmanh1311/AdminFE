import { numberWithCommas } from "~/utils";
import { CheckCircleFill } from "react-bootstrap-icons";
import { axiosInstance } from "../../api/axios.config";
import "./table.scss";
import { useState } from "react";
import { useRef } from "react";
import { OrderService } from "../../services/order.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = (props) => {
  const param = useParams();
  const [orderItems, setOrderItem] = useState([]);

  const style = (text) => {
    switch (text) {
      case 1:
        return "text-yellow-400 font-bold";
      case 2:
        return "text-blue-400 font-bold";
      case 3:
        return "text-green-400 font-bold";
      case 4:
        return "text-red-400 font-bold";
    }
  };

  const fetchData = () => {
    OrderService.getDetailOrderById(param.orderId).then((res) => {
      setOrderItem(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="p-8 border-b">
          <div className="flex justify-center">
            <h2 className="font-bold text-3xl">Chi tiết đơn hàng:</h2>
          </div>
          <p className="text-l">
            <span className="font-bold">Trạng thái: </span>
            {orderItems.status && (
              <span className={style(orderItems.status)}>
                {orderItems.status === 1 && "Đang chờ xác nhận"}
                {orderItems.status === 2 && "Đang chuẩn bị hàng"}
                {orderItems.status === 3 && "Hoàn thành"}
                {orderItems.status === 4 && "Đã hủy"}
              </span>
            )}
          </p>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Tổng tiền</th>
            </thead>
            {orderItems?.invoice_details?.map((item) => {
              return (
                <>
                  <tbody>
                    <td>{item?.product?.name}</td>
                    <td className="flex justify-center items-center">
                      <img
                        width={"100"}
                        className="object-cover rounded-2xl"
                        src={"https://" + item.product?.product_images[0].uri}
                        alt=""
                      />
                    </td>

                    <td>{item.quantity}</td>
                    <td>{numberWithCommas(item?.product?.price)}₫</td>
                    <td>
                      {numberWithCommas(item?.product?.price * item?.quantity)}₫
                    </td>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
        <div className="text-left border-b p-4 text-l leading-[40px]">
          <p className="flex">
            <span className="font-bold">Phí vận chuyển: </span>
            <span className="text-red-500 ml-2 font-bold">
              {numberWithCommas(orderItems?.shipping_fee)}₫
            </span>
          </p>
          <p className="flex text-2xl">
            <span className="font-bold">Thành tiền: </span>
            <span className="text-red-500 ml-2 font-bold">
              {numberWithCommas(orderItems?.total + orderItems?.shipping_fee)}₫
            </span>
          </p>
        </div>
        <div className="text-left p-4 text-l leading-[40px] gap-2 ">
          <div>
            <p className="font-bold text-l">
              Địa chỉ và thông tin người nhận hàng
            </p>
            <ul>
              <li>Họ và tên: {orderItems?.fullname}</li>
              <li>Số điện thoại: {orderItems?.phone_number}</li>
              <li>Địa chỉ nhận hàng: {orderItems?.address}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
