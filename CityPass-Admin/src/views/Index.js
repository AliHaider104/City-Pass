import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1 } from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [totalOrders, setTotalOrders] = useState(0);

  const getTotalOrders = async () => {
    // yahan per ek function likhna jo firebase sy orders
    const q = query(collection(db, "transaction"));

    let counter = 0;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().type == "buy") counter = counter + 1;
    });

    setTotalOrders(counter);
  };

  let chartExample2 = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: ["All Time"],
      datasets: [
        {
          label: "Sales",
          data: [totalOrders], // yahan per number of orders la kr rkh dena
          maxBarThickness: 10,
        },
      ],
    },
  };

  const getBalance = async () => {
    const q = query(collection(db, "transaction"));

    let earning = 0;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().type == "buy")
        earning = earning + parseInt(doc.data().amount);
    });

    setTotalRevenue(earning / 10);
  };

  function dataX(canvas) {
    getBalance();
    getTotalOrders();
    return {
      labels: ["All Time Earning", "Now"],
      datasets: [
        {
          label: "Performance",
          data: [0, totalRevenue],
        },
      ],
    };
  }
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow" style={{backgroundColor: "#3e1584"}}>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={dataX()}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {console.log(chartExample2.data)}
                  <Bar
                    data={chartExample2.data} /// add krna hay
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
