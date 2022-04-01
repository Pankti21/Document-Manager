import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const AddMember = () => {
  let history = useHistory();
  const param = useParams();

  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState();
  const [userNames, setUserNames] = useState();
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState({});
  const [groupName, setGroupName] = useState();
  const [groupDetails, setGroupDetails] = useState({});

  //console.log("hello: ", users);

  const getUsersAPI = "http://localhost:3001/getuserlist";
  const getNonGroupUsersAPI = `http://localhost:3001/getnongroupusers/${param.id}`;
  const getGroupUsersAPI = `http://localhost:3001/getgroupusers/${param.id}`;
  const updateGroupUsersAPI = `http://localhost:3001/updategroupusers/${param.id}`;

  let userId = [];
  let userName = [];
  let updatedUsers = [];
  let updatedUsersString = "";

  const addMembers = (selectedOption) => {
    // console.log("helo 1");
    const userName = [];
    for (let i = 0; i < selectedOption.length; i++) {
      //   console.log("hello ");
      //   console.log(selectedOption[i].value);
      userId[i] = selectedOption[i].value;
      userName[i] = selectedOption[i].label;
    }
    console.log(userId);
    setUserIds(userId);
    setUserNames(userName);
    // console.log(userName);
    setGroupMembers({ user_id: userId, user_name: userName });
    //setGroupMembers(event.target.value);
  };

  const AddNow = async (event) => {
    event.preventDefault();
    console.log("Users: ", userIds);
    // console.log(JSON.parse(groupMembers));
    event.preventDefault();

    await axios
      .get(getGroupUsersAPI, {
        headers: {},
      })
      .then((res) => {
        setGroupUsers(res.data);
        console.log("Group users: ", res.data);

        for (let i = 0; i < userIds.length; i++) {
          updatedUsers[i] = { user_id: userIds[i], user_name: userNames[i] };
        }

        console.log("Updated users: 1: ", updatedUsers);

        let len = updatedUsers.length;
        console.log("GU: ", groupUsers);
        for (let i = 0; i < res.data.length; i++) {
          updatedUsers[len + i] = { user_id: res.data[i].user_id, user_name: res.data[i].user_name };
        }

        console.log("Updated users: ", updatedUsers);

        // for (let i = 0; i < updatedUsers.length; i++) {
        //   updatedUsersString += updatedUsers[i];
        //   updatedUsersString += ",";
        // }
        // updatedUsersString = updatedUsersString.substring(0, updatedUsersString.length - 1);
        // console.log("Updated users String: ", updatedUsersString);
      })
      .catch((err) => {
        console.log("Err", err);
      });

    axios
      .post(
        updateGroupUsersAPI,
        { updatedUsers: updatedUsers },
        {
          headers: {},
        }
      )
      .then((res) => {
        console.log("output: ", res);
        ///setUsers(res.data);
        //setUsers(res.data.map((ele) => ({ value: ele.id.S, label: ele.first_name.S + " " + ele.last_name.S })));
        //console.log(users);
        history.push(`/viewgroup/${param.id}`);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    axios
      .get(getNonGroupUsersAPI, {
        headers: {},
      })
      .then((res) => {
        //console.log("Users: ", res.data);
        //setUsers(res.data);
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
          <h1>Add your friends!</h1>
        </div>
        <Form onSubmit={AddNow}>
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

export default AddMember;
