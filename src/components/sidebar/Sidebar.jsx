import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import logo from "../../assets/logo/baloshop-black.png";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "../../services/auth.service";

const Sidebar = () => {
  const dispat = useDispatch();
  const navigate = useNavigate();

  const { dispatch } = useContext(DarkModeContext);

  const logout = () => {
    if (confirm("Bạn có muốn thoát không?")) {
      AuthService.logout();
      navigate("/login");
    }
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src={logo} alt="" />
            <span className="title">Dashboard</span>
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
              <InventoryIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="/brands" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Thương hiệu</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Phân loại</span>
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
          <p className="title">THỐNG KÊ</p>
          <Link to="/statistical" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Doanh thu</span>
            </li>
          </Link>
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Thông báo</span>
          </li> */}
          <p className="title">NGƯỜI DÙNG</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Trang cá nhân</span>
          </li> */}
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
