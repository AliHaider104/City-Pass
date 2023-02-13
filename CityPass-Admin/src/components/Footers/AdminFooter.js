import { Row, Col } from "reactstrap";

const Footer = () => {
  const logo_text = "Citypass";
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-center text-muted">
            © {new Date().getFullYear()}{" "}
            <p className="font-weight-bold ml-1 text-primary">{logo_text}</p>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
