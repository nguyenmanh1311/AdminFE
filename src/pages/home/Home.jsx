import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { StatisticService } from "~/services";
import { useEffect, useState } from "react";

const Home = () => {
  document.title = "Bảng điều khiển";
  const [amountCustomer, setAmountCustomer] = useState();
  const [amountOrder, setAmountOrder] = useState();
  const [amountRevenue, setAmountRevenue] = useState();
  const [amountProduct, setAmountProduct] = useState();
  const [amountProfit, setAmountProfit] = useState(1);
  const [dataSixMoth, setDataSixMoth] = useState();
  const profit = () => {
    StatisticService.getProfit().then((response) => {
      console.log("Profit: " + response.data.data);
      setAmountProfit(response.data.data);
    });
  };
  const customer = () => {
    StatisticService.getAmountCustomer().then((response) => {
      console.log("Customer: " + response.data.data);
      setAmountCustomer(response.data.data);
    });
  };
  const order = () => {
    StatisticService.getAmountOrder().then((response) => {
      setAmountOrder(response.data.data);
    });
  };

  const revenue = () => {
    StatisticService.getAmountRevenue().then((response) => {
      setAmountRevenue(response.data.data);
    });
  };
  const product = () => {
    StatisticService.getAmountProduct().then((response) => {
      setAmountProduct(response.data.data);
    });
  };
  const dataSixMonth = () => {
    StatisticService.getAmountSixMonth().then((response) => {
      setDataSixMoth(response.data.data);
    });
  };
  useEffect(() => {
    customer();
    order();
    revenue();
    product();
    profit();
    dataSixMonth();
  }, []);
  return (
    <div>
      <div className="widgets">
        <Widget type="user" amount={amountCustomer} />
        <Widget type="order" amount={amountOrder} />
        <Widget type="earning" amount={amountRevenue} />
        <Widget type="product" amount={amountProduct} />
      </div>
      <div className="charts">
        <Featured profit={amountProfit} revenue={amountRevenue} />
        <Chart
          title="Doanh thu 6 tháng gần nhất"
          aspect={2 / 1}
          data={dataSixMoth}
        />
      </div>
      <div className="listContainer">
        <div className="listTitle">Giao dịch mới nhất</div>
        <Table />
      </div>
    </div>
  );
};

export default Home;
