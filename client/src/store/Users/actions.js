import {
  FETCHING_LOGGED_USER,
  FETCHING_USERS,
  REGISTERING_USER,
  UPDATING_USER,
  LOGGING_USER,
  LOGGING_OUT_USER
} from "./types";

export const loginUser = data => ({
  type: LOGGING_USER,
  data
});

export const registerUser = data => ({
  type: REGISTERING_USER,
  data
});

export const fetchLoggedUser = data => ({
  type: FETCHING_LOGGED_USER,
  data
});

export const fetchUsers = () => ({
  type: FETCHING_USERS
});

export const updateUser = data => ({
  type: UPDATING_USER,
  data
});

export const removeUser = () => ({});

export const logoutUser = () => ({
  type: LOGGING_OUT_USER
});