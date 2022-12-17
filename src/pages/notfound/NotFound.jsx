import { Link } from "react-router-dom";
import "./notfound.scss";
const NotFound = () => {
  document.title = "Không tìm thấy trang";

  return (
    <div class="container">
      <h1>Trang không tìm thấy</h1>
      <h1>
        {" "}
        <span class="ascii">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
