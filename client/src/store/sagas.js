import { fork, all } from "redux-saga/effects";
import { fetchFiltersWatcher, updateFilterWatcher } from "./Filters/saga";
import {
  addMessengerWatcher,
  fetchMessengersByNameWatcher,
  updateMessengerWatcher
} from "./Messengers/saga";
import {
  updateMessagesWatcher,
  updateAlertMessagesWatcher,
  removeAlertMessagesWatcher,
  fetchMessagesWatcher
} from "./Messages/saga";
import {
  fetchTasksWatcher,
  fetchTasksByLoggedUserProjectsWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher,
  sendMailingTaskWatcher
} from "./Tasks/saga";
import {
  fetchCommentsWatcher,
  addCommentWatcher,
  removeCommentsByTaskIdWatcher
} from "./Comments/saga";
import { addMailWatcher, fetchMailsWatcher } from "./Mails/saga";
import { fetchSettingsWatcher, updateSettingWatcher } from "./Settings/saga";
import {
  loginUserWatcher,
  registerUserWatcher,
  updateUserWatcher,
  fetchLoggedUserWatcher,
  fetchUsersWatcher,
  fetchUsersByLoggedUserProjectsWatcher,
  logoutUserWatcher
} from "./Users/saga";
import {
  fetchProjectsWatcher,
  fetchProjectsByLoggedUserProjectsWatcher,
  addProjectWatcher,
  updateProjectWatcher,
  removeProjectWatcher
} from "./Projects/saga";
import {
  fetchFilesWatcher,
  addFileWatcher,
  removeFileWatcher
} from "./Files/saga";

export default function* rootSaga() {
  yield all([
    fork(fetchSettingsWatcher),
    fork(updateSettingWatcher),
    fork(addMessengerWatcher),
    fork(updateMessagesWatcher),
    fork(updateAlertMessagesWatcher),
    fork(removeAlertMessagesWatcher),
    fork(fetchMessagesWatcher),
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(updateUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(fetchUsersWatcher),
    fork(fetchUsersByLoggedUserProjectsWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(fetchTasksByLoggedUserProjectsWatcher),
    fork(sendMailingTaskWatcher),
    fork(addTaskWatcher),
    fork(fetchCommentsWatcher),
    fork(addCommentWatcher),
    fork(addMailWatcher),
    fork(fetchMailsWatcher),
    fork(removeCommentsByTaskIdWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchProjectsWatcher),
    fork(fetchProjectsByLoggedUserProjectsWatcher),
    fork(addProjectWatcher),
    fork(updateProjectWatcher),
    fork(removeProjectWatcher),
    fork(fetchFiltersWatcher),
    fork(updateFilterWatcher),
    fork(fetchMessengersByNameWatcher),
    fork(updateMessengerWatcher),
    fork(fetchFilesWatcher),
    fork(addFileWatcher),
    fork(removeFileWatcher)
  ]);
}
