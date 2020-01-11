import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import io from "socket.io-client";

import { StyledMessengersForm } from "../styles/StyledMessengersForm";

class MessengersAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
    if (!this.socket) {
      this.socket = io();
    }
  }

  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    event.preventDefault();
    const { message } = this.state;
    const { loggedUser, filteredUsers } = this.props;
    // console.log("add form filtered users", filteredUsers);

    let usersNames = [];
    usersNames.push(loggedUser.name);
    filteredUsers.forEach(user => {
      usersNames.push(user.name);
    });

    const data = {
      from: loggedUser.name,
      to: usersNames.join(","),
      msg: message,
      topic: "masz nową wiadomość",
      type: "msg_add",
      createAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    this.socket.emit("chat:message", data);
    this.setState({
      message: ""
    });
  };

  render() {
    const { message } = this.state;
    const { filteredUsers } = this.props;

    const filteredUsersContent = filteredUsers.map(user => {
      return <span key={user.name}>{user.name}</span>;
    });
    return (
      <StyledMessengersForm>
        <div className="messenger-form-box">
          <div className="users-list">
            <span>Piszesz do: </span>
            {filteredUsersContent}
          </div>

          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="message"
                value={message}
                className="form-control write_msg"
                placeholder="Wpisz wiadomość"
              />
            </div>
            <div className="form-group">
              <button
                onClick={this.addHandler}
                className="btn btn-primary float-right glyphicon glyphicon-send"
                type="submit"
                value="dodaj"
              ></button>
            </div>
          </form>
        </div>
      </StyledMessengersForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    messengers: state.messengers.messengers
  };
};

export default connect(mapStateToProps, {})(MessengersAddForm);
