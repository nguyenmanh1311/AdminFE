import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { OrderService } from "../../services/order.service";

const List = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await OrderService.get8Transction().then((res) => {
        setTransaction(res.data.data);
      });
    }
    getUsers();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID Đơn hàng</TableCell>
            <TableCell className="tableCell">Tên khách hàng</TableCell>
            <TableCell className="tableCell">Tổng giá</TableCell>
            <TableCell className="tableCell">Ngày mua</TableCell>
            <TableCell className="tableCell">Địa chỉ</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction.map((trans) => (
            <TableRow key={trans.id}>
              <TableCell className="tableCell">{trans.id}</TableCell>
              <TableCell className="tableCell">{trans.fullName}</TableCell>
              <TableCell className="tableCell">{trans.grandTotal}</TableCell>
              <TableCell className="tableCell">{trans.createdDate}</TableCell>
              <TableCell className="tableCell">
                {trans.address !== null &&
                  trans.address.addressLine +
                    ", " +
                    trans.address.ward +
                    ", " +
                    trans.address.district +
                    ", " +
                    trans.address.province}
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${trans.status}`}>{trans.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
