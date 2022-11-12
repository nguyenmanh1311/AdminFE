import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import logo from "../../assets/logo/baloshop-b-l.png";
import { useContext } from "react";
import { getAllOrders } from "../../redux/order/ordersApi";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispat = useDispatch();

  const { dispatch } = useContext(DarkModeContext);

  const logout = () => {
    if (confirm("Bạn có muốn thoát không?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src={logo} style={{ width: "60px", height: "50px" }} alt="" />
            Dashboard
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">TRANG CHÍNH</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Bảng điều khiển</span>
            </li>
          </Link>
          <p className="title">QUẢN LÝ</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Khách hàng</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>
          <Link to="/delivery" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Giao hàng</span>
            </li>
          </Link>
          {/* <Link to="/reviews" style={{ textDecoration: "none" }}>
						<li>
							<ThumbUpIcon className="icon" />
							<span>Đánh giá</span>
						</li>
					</Link>
					<Link to="/comments" style={{ textDecoration: "none" }}>
						<li>
							<ChatIcon className="icon" />
							<span>Bình luận</span>
						</li>
					</Link> */}
          <Link to="/order" style={{ textDecoration: "none" }}></Link>
          <p className="title">THỐNG KÊ</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Doanh thu</span>
          </li>
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Thông báo</span>
          </li> */}
          <p className="title">NGƯỜI DÙNG</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Trang cá nhân</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
