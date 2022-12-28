import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { StatisticService } from "~/services";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  document.title = "Bảng điều khiển";
  const [amount, setAmount] = useState({});
  // const [amountProfit, setAmountProfit] = useState(1);
  const [dataSevenDay, setDataSevenDay] = useState([]);
  const [dataSevenDayInvoice, setDataSevenDayINvoice] = useState([]);
  // const profit = () => {
  //   StatisticService.getProfit().then((response) => {
  //     setAmountProfit(response.data.data);
  //   });
  // };
  const Amount = () => {
    StatisticService.getAllAmount().then((response) => {
      setAmount(response.data.data);
    });
  };

  const dataSixMonth = () => {
    StatisticService.getAmountSixMonth().then((response) => {
      setDataSevenDay(response.data.data);
    });
    StatisticService.getAmountSixMonthInvoice().then((response) => {
      setDataSevenDayINvoice(response.data.data);
    });
  };
  useEffect(() => {
    Amount();
    // profit();
    dataSixMonth();
  }, []);
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="widgets">
        <Widget type="user" amount={amount.totalUser} />
        <Widget type="order" amount={amount.totalInvoice} />
        <Widget type="earning" amount={amount.totalTurnover} />
        <Widget type="product" amount={amount.totalProduct} />
      </div>
      <div className="w-full flex">
        <div className="pl-4 pr-2 w-1/2">
          <Chart
            title="Doanh thu 7 gần đây"
            aspect={2 / 1}
            data={dataSevenDay}
          />
        </div>
        <div className="pr-4 pl-2 w-1/2">
          <Chart
            title="Số đơn 7 ngày gần đây"
            aspect={2 / 1}
            data={dataSevenDayInvoice}
          />
        </div>
      </div>

      <div className="listContainer">
        <div className="listTitle">Giao dịch mới nhất</div>
        <Table />
      </div>
    </div>
  );
};

export default Home;
