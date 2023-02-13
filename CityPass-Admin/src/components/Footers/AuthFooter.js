import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="12">
              <div className="copyright text-center text-xl-center text-muted">
                © {new Date().getFullYear()}{" "}
                <p className="font-weight-bold ml-1 text-primary">CityPass</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
