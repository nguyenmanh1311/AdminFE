import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/userdatatable/UserDatatable";
import { useLocation } from "react-router-dom";
import { UserService } from "~/services/user.service";
import { userColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";

const ListUser = () => {
  document.title = "Danh sách khách hàng";
  const locationUrl = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await UserService.getUsers().then((res) => {
        setData(res.data.data);
      });
    }
    getUsers();
  }, []);
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable rows={data} title="người dùng" userColumns={userColumns} />
      </div>
    </div>
  );
};

export default ListUser;
