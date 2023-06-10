import { Link } from "react-router-dom";
import "./notfound.scss";
const NotFound = () => {
  document.title = "Không tìm thấy trang";

  return (
    <div className="container">
      <h1>Trang không tìm thấy</h1>
      <h1>
        {" "}
        <span className="ascii">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
