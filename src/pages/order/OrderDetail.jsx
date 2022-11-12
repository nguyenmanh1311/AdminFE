import { numberWithCommas } from "~/utils";
import { CheckCircleFill } from "react-bootstrap-icons";

import "./table.scss";

function OrderDetail(props) {
	const { customer } = props;
	const orderItems = props.orderItem.data;

	const deliveryTime = "3/8/2022";
	const amountPaid = props.totalPrice;
	const surcharge = 20000;
	const style = (text) => {
		switch (text) {
			case "Đã đặt hàng":
			case "Đặt hàng":
				return "text-green-400";
			case "Đang giao hàng":
				return "text-blue-400";
			case "Đã hủy":
				return "text-red-400";
			case "Đã nhận":
				return "text-gray-400";
		}
	};
	return (
		<div>
			<div className="p-8 border-b">
				<div className="flex justify-between">
					<h2 className="font-bold text-xl">Chi tiết đơn hàng: #{props.id}</h2>
					<p className="text-xl">
						Trạng thái: <span className={style(props.status)}>{props.status}</span>
					</p>
				</div>
			</div>
			{orderItems.map((item) => {
				return (
					<div className="flex justify-between py-6 border-b">
						<div className="flex gap-3">
							<img
								width={"200"}
								className="object-cover rounded-2xl"
								src={item.img}
								alt={item.title}
							/>
							<div className="flex flex-col gap-1">
								<p className="font-semibold text-xl">{item.title}</p>
								<p className="text-left">Màu: {item.color}</p>
								<p className="text-left">Số lượng: {item.quantity}</p>
							</div>
						</div>

						<div>
							<p className="text-red-400">
								<strong>{numberWithCommas(item.price * (1 - item.discount))}₫</strong>
							</p>
							<p className="line-through">{numberWithCommas(item.price)}₫</p>
						</div>
					</div>
				);
			})}
			<div className="text-left border-b p-4 text-2xl leading-[40px]">
				<p>Giá tạm tính: {numberWithCommas(props.totalPrice)}₫</p>
				<p>
					<span className="">Phụ phí: </span> <span>{numberWithCommas(surcharge)}₫</span>
				</p>
				<p>
					<span className="font-bold">Tổng tiền: </span>
					<span className="text-red-500">{numberWithCommas(amountPaid + surcharge)}₫</span>
				</p>
				<p>
					<span className="font-bold"> Số tiền đã thanh toán: </span>
					<span className="text-red-400 flex flex-center items-center gap-2">
						<CheckCircleFill className="text-blue-500 text-xl mt-1" />{" "}
						{numberWithCommas(amountPaid + surcharge)}₫
					</span>
				</p>
			</div>
			<div className="flex flex-col text-left p-4 text-2xl leading-[40px] gap-2">
				<p className="font-bold text-2xl">Địa chỉ và thông tin người nhận hàng</p>
				<ul>
					<li>
						{customer.username} - {customer.phone}
					</li>
					<li>
						Địa chỉ nhận hàng: {customer.address.ward}, {customer.address.district},{" "}
						{customer.address.city}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default OrderDetail;
