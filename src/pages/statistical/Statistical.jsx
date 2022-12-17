import "./statistical.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { StatisticService } from "~/services";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Statistical = () => {
  document.title = "Bảng điều khiển";
  const [amount, setAmount] = useState({});
  // const [amountProfit, setAmountProfit] = useState(1);
  // const [dataSixMoth, setDataSixMoth] = useState();
  // const profit = () => {
  //   StatisticService.getProfit().then((response) => {
  //     console.log("Profit: " + response.data.data);
  //     setAmountProfit(response.data.data);
  //   });
  // };
  const Amount = () => {
    StatisticService.getAllAmount().then((response) => {
      setAmount(response.data.data);
    });
  };

  // const dataSixMonth = () => {
  //   StatisticService.getAmountSixMonth().then((response) => {
  //     setDataSixMoth(response.data.data);
  //   });
  // };
  useEffect(() => {
    Amount();
    // profit();
    // dataSixMonth();
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
      <div className="charts">
        {/* <Featured profit={amountProfit} revenue={amountRevenue} /> */}
        {/* <Chart
          title="Doanh thu 6 tháng gần nhất"
          aspect={2 / 1}
          data={dataSixMoth}
        /> */}
      </div>
      <div className="listContainer">
        <div className="listTitle">Giao dịch mới nhất</div>
        <Table />
      </div>
    </div>
  );
};

export default Statistical;
