import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ profit, revenue }) => {
  Number.prototype.format = function (n, x, s, c) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace(".", c) : num).replace(
      new RegExp(re, "g"),
      "$&" + (s || ",")
    );
  };
  const percentage = (profit / revenue) * 100;
  return (
    <div className="featured hover:drop-shadow-md bg-white">
      <div className="top">
        <h1 className="title">TỔNG LỢI NHUẬN</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={String(percentage.format(2, 3, ".", ",")) + "%"}
            strokeWidth={5}
          />
        </div>
        <p className="title">Lợi nhuận tính đến ngày hôm nay</p>
        <p className="amount">{profit.format(0, 3, ".", ",")} VNĐ</p>
        {/* <p className="desc">Previous transactions processing. Last payments may not be included.</p> */}
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Hôm qua</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tuần qua</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng qua</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
