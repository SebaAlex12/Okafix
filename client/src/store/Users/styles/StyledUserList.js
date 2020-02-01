import styled from "styled-components";

export const StyledUserList = styled.div`
  .users-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 248px;
    z-index: 102;
  }
  .users-box > .flow-box.active > button {
    background-color: green;
  }
  .users-box > .flow-box > button:last-child {
    left: 50px;
    right: auto;
    top: 0px;
  }
  .users-list {
    position: fixed;
    top: 42px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 260px;
  }
  .users-list > div {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .users-list > div .edit-form > i {
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .users-list > .form-group {
    position: fixed;
    width: 243px;
    z-index: 100;
  }
  .users-list .remove-filter {
    position: fixed;
    left: 220px;
    top: 52px;
    color: grey;
    opacity: 0.5;
    cursor: default;
    z-index: 1000;
  }
  .users-list > div:nth-child(3) {
    margin-top: 34px;
  }
  .users-list .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
  .users-list > div.selected {
    background-color: #e2e2e2;
  }
  .users-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
    width: 85%;
    text-align: left;
  }
  .users-list .status {
    background-color: grey;
    color: #fff;
    padding: 2px;
    border-radius: 10px;
    width: 18px;
    display: inline-block;
    font-size: 10px;
    margin-right: 5px;
    text-align: center;
  }
  .users-list .status.admin {
    background-color: #c30101;
  }
  .users-list .status.employee {
    background-color: #007bff;
  }
  .users-list .status.client {
    background-color: #179417;
  }
  .users-list form > .form-group:first-child {
    display: none;
  }
  .users-list .user-update-form-box select[name="projects"],
  .users-list .user-update-form-box select[name="users"] {
    height: 150px;
  }
  .user-list-flow-box {
    position: fixed;
    top: 0px;
    left: 136px;
    z-index: 100;
  }
  .user-list-flow-box.active > button {
    background-color: green;
  }
  .user-list-flow-box button {
    padding-right: 22px;
  }
  .user-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 12px;
  }
  .user-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
    font-size: 16px;
  }
  .user-list-flow-box .glyphicon-filter.active:before {
    color: #ff4e4e;
    opacity: 1;
    cursor: pointer;
  }
`;
