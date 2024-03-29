import { Link } from "react-router-dom";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type, amount = 100 }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "KHÁCH HÀNG",
        isMoney: false,
        link: "Xem tất cả",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              width: "30px",
              height: "30px",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ĐƠN HÀNG",
        isMoney: false,
        link: "Xem tất cả đơn hàng",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
              width: "30px",
              height: "30px",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "DOANH THU",
        isMoney: true,
        link: "Xem thống kê",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
              width: "30px",
              height: "30px",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "SẢN PHẨM",
        link: "Xem tất cả sản phẩm",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
              width: "30px",
              height: "30px",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  Number.prototype.format = function (n, x, s, c) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace(".", c) : num).replace(
      new RegExp(re, "g"),
      "$&" + (s || ",")
    );
  };
  return (
    <div className="widget bg-white hover:drop-shadow-md">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {amount.format(0, 3, ".", ",")} {data?.isMoney && "VNĐ"}
        </span>
        <Link to={`${type}s`}>
          <span className="link">{data?.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
