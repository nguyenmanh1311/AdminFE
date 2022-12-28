import "./list.scss";
import { useState, useEffect } from "react";
import Datatable from "~/components/userdatatable/StaffDatabase";
import { useLocation } from "react-router-dom";
import { UserService } from "~/services/user.service";
import { staffColumns } from "~/datatablesource";
import { Navigate } from "react-router-dom";

const ListStaff = () => {
  document.title = "Danh sách nhân viên";
  const locationUrl = useLocation();
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    async function getUsers() {
      const res = await UserService.getStaff(id).then((res) => {
        setData(res.data);
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
        <Datatable rows={data} title="nhân viên" userColumns={staffColumns} />
      </div>
    </div>
  );
};

export default ListStaff;
