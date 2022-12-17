import { getAllOrder } from "./ordersSlice";
import { OrderService } from "../../services/order.service";
export const getAllOrders = async (dispatch) => {
  let res = await OrderService.getAllOrder();
  dispatch(getAllOrder(res.data));
};
