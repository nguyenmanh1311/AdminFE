import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../redux/order/ordersApi";
import { useDispatch } from "react-redux";
import { Table } from "flowbite-react";
import { numberWithCommas } from "~/utils";
import OrderDetail from "./OrderDetail";
import "./table.scss";
import clsx from "clsx";
import { useState } from "react";
import { orderService } from "../../services/order.service";

const Order = (props) => {
	document.title = "Đơn hàng";
	const style = (text) => {
		switch (text) {
			case "Đã đặt hàng":
			case "Đặt hàng":
				return "text-blue-400 uppercase font-bold";
			case "Đang giao hàng":
				return "text-blue-400";
			case "Đã hủy":
				return "text-red-400 uppercase font-bold";
			case "Đã xác nhận":
				return "text-green-400 font-bold uppercase";
		}
	};
	const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });
	const handleCancel = async (e) => {
		if (confirm("Bạn có muốn Xác nhận đơn hàng không?")) {
			const id = e.target.id;
			const data = JSON.stringify({ status: "Đã xác nhận" });
			const res = await orderService.updateHistoryOrder(id, data);
			console.log(res);
			if (res) {
				alert("Xác nhận thành công");
				window.location.reload();
			}
		}
	};

	const dispatch = useDispatch();

	const orders = useSelector((state) => state.orders.order.data);

	useEffect(() => {
		getAllOrders(dispatch);
	}, []);

	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	console.log(orders);

	return (
		<div>
			<Table hoverable={true} className="">
				<Table.Head>
					<Table.HeadCell> Mã đơn hàng </Table.HeadCell>
					<Table.HeadCell>Sản phẩm</Table.HeadCell>
					<Table.HeadCell>Số lượng</Table.HeadCell>
					<Table.HeadCell>Giá</Table.HeadCell>
					<Table.HeadCell> Ngày đặt mua</Table.HeadCell>
					<Table.HeadCell>Trạng thái</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Edit</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{orders.map((order, index) => {
						const styleStatus = style(order.status);
						const displayDetail = index === orderDetail.index;
						const displayCancelBtn = order.status != "Đặt hàng";
						const styleDisable = "bg-gray-100";
						return (
							<>
								<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
									<Table.Cell className="text-blue-400">#{order.id}</Table.Cell>
									<Table.Cell className="text-blue-400 hover:text-blue-700 select-none">
										<button
											onClick={() =>
												setOrderDetail((current) => {
													console.log(order);
													return current.index === index
														? {
																index: -1,
																id: order.id,
														  }
														: {
																index,
																id: order.id,
														  };
												})
											}
										>
											Xem chi tiết
										</button>
									</Table.Cell>
									<Table.Cell>{order.totalQuantity}</Table.Cell>
									<Table.Cell className="text-red-400">
										{numberWithCommas(order.totalPrice)}₫
									</Table.Cell>
									<Table.Cell>
										{" "}
										<p className="">{order.createdAt}</p>{" "}
									</Table.Cell>

									<Table.Cell className={styleStatus}>{order.status}</Table.Cell>
									<Table.Cell>
										<button
											disabled={displayCancelBtn}
											id={order.id}
											onClick={handleCancel}
											className={clsx(
												"bg-red-500 text-xl font-medium p-4 rounded-lg  text-white",
												displayCancelBtn && "!bg-gray-100 !text-gray-700"
											)}
										>
											Xác nhận
										</button>
									</Table.Cell>
								</Table.Row>
								{displayDetail && (
									<Table.Row>
										<Table.Cell className="" colspan="7">
											<OrderDetail {...order} />
										</Table.Cell>
									</Table.Row>
								)}
							</>
						);
					})}
				</Table.Body>
			</Table>
		</div>
	);
};

export default Order;
