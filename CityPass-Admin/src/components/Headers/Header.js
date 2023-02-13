import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const Header = () => {
  const [totalSalers, setTotalSalers] = useState(0);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const getSellers = async () => {
    const q = query(collection(db, "Admin"));

    const querySnapshot = await getDocs(q);

    let counter = 0;

    querySnapshot.forEach((doc) => {
      counter = counter + 1;
    });

    setTotalSalers(counter);
  };

  const getBuyers = async () => {
    const q = query(collection(db, "user"));

    const querySnapshot = await getDocs(q);
    let counter = 0;
    querySnapshot.forEach((doc) => {
      counter = counter + 1;
    });

    setTotalBuyers(counter);
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

  useEffect(() => {
    getSellers();
    getBuyers();
    getBalance();
  });

  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8" style={{backgroundColor: "#4f2497"}}>
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" style={{backgroundColor: "#e8e5e5"}}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Total Profit
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalRevenue}
                          {" $"}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" style={{backgroundColor: "#e8e5e5"}} >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Customers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalBuyers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-user" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" style={{backgroundColor: "#e8e5e5"}}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Organizations
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalSalers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" style={{backgroundColor: "#e8e5e5"}}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Sales Margin
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">10%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
