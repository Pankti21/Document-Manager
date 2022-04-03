import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const currentUser = useSelector((state) => state.auth.userLoginData);
  console.log("user:", currentUser);

  const [group, setGroup] = useState([]);
  const getGroupsAPI = "http://localhost:3001/getgroups";

  let history = useHistory();

  const handleCreateGroup = () => {
    history.push("/creategroup");
  };

  const ViewGroup = (event) => {
    history.push(`/viewgroup/${event.target.value}`);
  };

  useEffect(() => {
    axios
      .get(getGroupsAPI, {
        headers: {},
      })
      .then((res) => {
        console.log(res);
        setGroup(res.data.map((ele) => ({ id: ele.id.S, name: ele.name.S })));
        console.log(group);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div>
      <Container fluid={true} className="blue-main-gradient py-5 p-2">
        <h1 className="col-12 m-4">Groups</h1>
        <Row xs={1} md={4} className="g-4" style={{ marginLeft: "5px" }}>
          {Array.from({ length: 1 }).map((_, idx) =>
            group.map((r) => (
              <Col>
                <Card className="address-card" border="info" style={{ width: "18rem", height: "13rem" }}>
                  <Card.Body>
                    <Card.Title>{r.name}</Card.Title>
                    <Card.Text>{r.id}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button value={r.id} onClick={ViewGroup}>
                      View
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={handleCreateGroup} style={{ backgroundColor: "blue", color: "white", maxWidth: "10%" }}>
            create new group
          </button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
