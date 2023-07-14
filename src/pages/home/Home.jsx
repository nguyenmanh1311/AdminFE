import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import analystService from "../../services/analyst.service";
import { GlobalUtil } from "../../utils/GlobalUtil";

const Home = () => {
  document.title = "Bảng điều khiển";
  const [amount, setAmount] = useState([]);
  // const [amountProfit, setAmountProfit] = useState(1);
  const [dataSevenDay, setDataSevenDay] = useState([]);
  const [dataSevenDayInvoice, setDataSevenDayINvoice] = useState([]);
  // const profit = () => {
  //   StatisticService.getProfit().then((response) => {
  //     setAmountProfit(response.data.data);
  //   });
  // };

  useEffect(() => {
    const Amount = () => {
      analystService.getAllAmount().then((res) => {
        setAmount(res.data);
      });
    };

    const StaticInvoice = () => {
      analystService.getStaticInvoice().then((res) => {
        setDataSevenDayINvoice(() => {
          const onResult = res.data.map((item) => {
            return {
              name: GlobalUtil.dateConvert(item.date),
              total: item.total_invoice,
            };
          });
          return onResult;
        });
      });
    };
    const StaticBenefit = () => {
      analystService.getStaticBenefit().then((res) => {
        setDataSevenDay(() => {
          const onResult = res.data.map((item) => {
            return {
              name: GlobalUtil.dateConvert(item.date),
              total: item.total_benefit,
            };
          });
          return onResult;
        });
      });
    };
    Amount();
    StaticBenefit();
    StaticInvoice();
  }, []);

  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="widgets">
        <Widget type="user" amount={amount.total_customer} />
        <Widget type="order" amount={amount.total_invoice} />
        <Widget type="earning" amount={amount.total_revenue} />
        <Widget type="product" amount={amount.total_product} />
      </div>
      <div className="w-full flex">
        <div className="pl-4 pr-2 w-1/2">
          <Chart title="Doanh thu gần đây" aspect={2 / 1} data={dataSevenDay} />
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
