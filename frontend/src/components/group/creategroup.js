import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const CreateGroup = () => {
  let history = useHistory();

  const [users, setUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState({});
  const [groupName, setGroupName] = useState();
  const [groupDetails, setGroupDetails] = useState({});

  //console.log("hello: ", users);

  const getUsersAPI = "http://localhost:3001/getuserlist";
  const createGroupAPI = "http://localhost:3001/creategroup";

  const addMembers = (selectedOption) => {
    console.log("helo 1");
    const userId = [];
    const userName = [];
    for (let i = 0; i < selectedOption.length; i++) {
      console.log("hello ");
      console.log(selectedOption[i].value);
      userId[i] = selectedOption[i].value;
      userName[i] = selectedOption[i].label;
    }
    console.log(userId);
    console.log(userName);
    setGroupMembers({ user_id: userId, user_name: userName });
    //setGroupMembers(event.target.value);
  };

  const handleGroupName = (event) => {
    console.log(event.target.value);
    setGroupName(event.target.value);
  };

  const createGroup = (event) => {
    event.preventDefault();
    console.log(groupMembers);
    // console.log(JSON.parse(groupMembers));
    event.preventDefault();

    axios
      .post(
        createGroupAPI,
        {
          name: groupName,
          user_id: groupMembers.user_id,
          user_name: groupMembers.user_name,
          userId: 10,
        },
        {
          headers: {},
        }
      )
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));
        console.log("Res: " + res.data);
        history.push(`/home`);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    axios
      .get(getUsersAPI, {
        headers: {},
      })
      .then((res) => {
        //console.log(res.data);
        setUsers(res.data.map((ele) => ({ value: ele.id.S, label: ele.first_name.S + " " + ele.last_name.S })));
        //console.log(users);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div>
      <Container fluid={true} className="blue-main-gradient py-5 p-2">
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px", fontFamily: "initial" }}>
          <h1>Get more out of you work by creating a group now!</h1>
        </div>
        <Form onSubmit={createGroup}>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>Please enter your group name</Form.Label>
            <Form.Control required style={{ width: "30%" }} onChange={handleGroupName}></Form.Control>
          </Form.Group>
          <div style={{ marginTop: "20px", width: "50%" }}>
            <div style={{ fontWeight: "bold" }}>
              <label>Please select your group members</label>
            </div>
            <Select isMulti className="basic-multi-select" classNamePrefix="select" options={users} name="users" onChange={addMembers} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button type="submit">Proceed</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateGroup;
