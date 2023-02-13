import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// core components
import Header from "components/Headers/Header.js";

const Tables = () => {
  const [data, setData] = useState([{}]);

  const [refresh, setRefresh] = useState();

  const getUser = async () => {
    const q = query(collection(db, "Admin"));

    const querySnapshot = await getDocs(q);
    let dummyData = [];
    querySnapshot.forEach((doc) => {
      dummyData.push(doc.data());
    });
    let x = dummyData.filter((items)=>{
     console.table(items)
     
    })
    setData(dummyData);
  };




  const updateStatus = async (uid, status) => {
    if(status === "0") {
      // alert(status)
      await updateDoc(doc(db, "Admin", uid), {
        status: "1",
      });
    } else {
      await updateDoc(doc(db, "Admin", uid), {
        status: "0",
      });
    }
    setRefresh(!refresh);
  };

  useEffect(() => {
    getUser();
    
  }, [refresh]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card
              className="shadow"
              style={{ backgroundColor: "#3e1584", color: "white" }}
            >
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Users</h3>
              </CardHeader>
              <Table className="align-items-center  table-flush" responsive>
                <thead className="text-white">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Documents</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {data.map((data) => (
                    <tr>
                      <td>{data.organization}</td>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{data.email}</span>
                          </Media>
                        </Media>
                      </th>

                      <td>Seller</td>
                      <td>
                        <Badge color="" className="badge-dot mr-5">
                          {data.status === "0" ? (
                            <i className="bg-warning" />
                          ) : data.status === "1" ? (
                            <i className="bg-success" />
                          ) : (
                            <></>
                          )}
                        </Badge>
                      </td>
                      <td><a href={data.document} download={data.organization} >file</a></td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            {data.status === "0" ? (
                              <DropdownItem
                                href="#pablo"
                                onClick={() => {
                                  updateStatus(data.uid, data.status);
                                }}
                              >
                                Approve
                              </DropdownItem>
                            ) : (
                              <DropdownItem
                                href="#pablo"
                                onClick={() => {
                                  updateStatus(data.uid, data.status);
                                }}
                              >
                                Deactivate
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
