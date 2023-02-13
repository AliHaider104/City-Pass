import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const username = "Admin";

  const handleLogout = () => {
    console.log("logout")
    localStorage.clear();
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    /> */}
                    <i className="fas fa-user" />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {username}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* <DropdownItem divider /> */}
                <DropdownItem href="#pablo" onClick={(e) => {                  
                  e.preventDefault()
                  
                }}>
                  <NavLink
                  onClick={()=>handleLogout()}
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-user-run" />
                    <span >Logout</span>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
