import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  ADDING_COMMENT,
  ADD_COMMENT_SUCCESS,
  COMMENTS_ERROR
} from "./types";

function* fetchCommentsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchComments(commentInput:{taskId: "${data.taskId}"}){
            _id
            taskId
            userId
            createdBy
            description
            createdAt
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_COMMENTS_SUCCESS,
      payload: res.data.data.fetchComments
    });
  } catch (error) {
    yield put({ type: COMMENTS_ERROR, payload: error });
  }
}

export function* fetchCommentsWatcher() {
  yield takeEvery(FETCHING_COMMENTS, fetchCommentsAsync);
}

function* addCommentAsync(action) {
  try {
    const data = action.data;
    const commentInput = {
      taskId: data.taskId,
      userId: data.userId,
      createdBy: data.createdBy,
      description: data.description,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    const graph = {
      query: `mutation {
      addComment(commentInput: {
      taskId: "${commentInput.taskId}",
      userId: "${commentInput.userId}",
      createdBy: "${commentInput.createdBy}",
      description: """${commentInput.description}""",
      createdAt: "${commentInput.createdAt}"}){
        _id
        taskId
        userId
        createdBy
        description
        createdAt
      }
    }`
    };
    const commentData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: commentData.data.data.addComment
    });
  } catch (error) {
    yield put({ type: COMMENTS_ERROR, payload: error });
  }
}

export function* addCommentWatcher() {
  yield takeEvery(ADDING_COMMENT, addCommentAsync);
}

// export function* updateTaskAddCommentAsync(action) {
//   try {
//     const data = action.data;
//     const commentInput = {
//       taskId: data.taskId,
//       userId: data.userId,
//       createdBy: data.createdBy ? data.createdBy : "",
//       description: data.description ? data.description : "",
//       createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
//     };
//     const graph = {
//       query: `mutation {
//       updateTaskAddComment(commentInput: {
//       taskId: "${commentInput.taskId}",
//       userId: "${commentInput.userId}",
//       createdBy: "${commentInput.createdBy}",
//       description: "${commentInput.description}",
//       createdAt: "${commentInput.createdAt}"}){
//         _id
//         createdBy
//         description
//         createdAt
//       }
//     }`
//     };
//     const commentData = yield call(
//       [axios, axios.post],
//       "/graphql",
//       JSON.stringify(graph),
//       { headers: { "Content-Type": "application/json" } }
//     );
//     console.log("saga", commentData);
//     yield put({
//       type: UPDATE_TASK_ADD_COMMENT_SUCCESS,
//       payload: commentData.data.data.updateTaskAddComment
//     });
//   } catch (error) {
//     yield put({ type: TASKS_ERROR, payload: error });
//   }
// }

// export function* updateTaskAddCommentWatcher() {
//   yield takeEvery(UPDATING_TASK_ADD_COMMENT, updateTaskAddCommentAsync);
// }
