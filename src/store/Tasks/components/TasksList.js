import React, { Component } from "react";
import { connect } from "react-redux";

import { Title, Button } from "../../../themes/basic";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import { fetchTasks, removeTask, updateTask } from "../actions";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTasksAddForm: false
    };
  }
  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }
  removeTaskHandler = id => {
    const { removeTask } = this.props;
    removeTask(id);
  };
  updateTaskHandler = data => {
    const { updateTask } = this.props;
    updateTask(data);
  };
  render() {
    const { tasks } = this.props;
    const { toggleTasksAddForm } = this.state;

    // you cannot add more than 10 tasks
    const formDisabled = tasks.length < 10 ? false : true;

    const tasksListContent = tasks
      ? tasks.map(task => (
          <TasksItem
            item={task}
            key={task.id}
            removeTaskHandler={() => this.removeTaskHandler(task.id)}
            updateStatusTaskHandler={() =>
              this.updateTaskHandler({
                ...task,
                status: task.status === "active" ? "done" : "active"
              })
            }
          />
        ))
      : "loading...";

    return (
      <div className="row">
        <div className="col-lg-12">
          <Title>List of tasks</Title>
          <div
            className="flow-box"
            style={{
              position: "fixed",
              float: "left",
              textAlign: "left",
              top: "5px",
              left: "0px",
              padding: "15px",
              backgroundColor: "#fff",
              width: "320px"
            }}
          >
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleTasksAddForm: !toggleTasksAddForm
                })
              }
            >
              Show/Hide task form
            </Button>
            {toggleTasksAddForm && formDisabled === false ? (
              <TaskAddForm />
            ) : formDisabled === true ? (
              <div style={{ color: "red" }}>
                You can have max 10 tasks - form is disabled
              </div>
            ) : null}
          </div>
          {tasksListContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  { fetchTasks, removeTask, updateTask }
)(TasksList);
