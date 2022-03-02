import axios from "axios";
import * as actions from "./index";

//******************************************************************
//--------------------------  Login User ----------------------------
//__________________________________________________________________

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post(`${actions.API_USERS_URL}/login`, {
        ...user,
      })
      .then((response) => {
        const token = response.data.token;
        const user = response.data.user;
        console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user._id);

        dispatch(loginSuccess(token, user));
      })
      .catch((error) => {
        // error.message is the error message
        const loginError = error.response.data.message;
        dispatch(loginFailure(loginError));
      });
  };
};

export const loginRequest = () => {
  return {
    type: actions.LOGIN_REQUEST,
  };
};

export const loginSuccess = (token, user) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: { token, user },
  };
};

export const loginFailure = (error) => {
  return {
    type: actions.LOGIN_FAILURE,
    payload: error,
  };
};

export const emptyErrors = () => {
  return {
    type: actions.EMPTY_ERRORS,
  };
};

//******************************************************************
//--------------------------  LogOut User ----------------------------
//__________________________________________________________________

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");

  return {
    type: actions.LOGIN_LOGOUT,
  };
};

export const loggedin = (token, user) => {
  return {
    type: actions.LOGIN_LOGGEDIN,
    payload: { token, user },
  };
};

//******************************************************************
//--------------------------  Register User --------------------------
//__________________________________________________________________

export const registerRequest = () => {
  return {
    type: actions.REGISTER_REQUEST,
  };
};

export const registerSuccess = (registeredUser) => {
  return {
    type: actions.REGISTER_SUCCESS,
    payload: registeredUser,
  };
};

export const registerFailure = (error) => {
  return {
    type: actions.REGISTER_FAILURE,
    payload: error,
  };
};

export const register = (user) => {
  // console.log("inside register in user actions");
  return (dispatch) => {
    dispatch(registerRequest());
    // console.log(user);
    axios
      .post(actions.API_USERS_URL, {
        ...user,
      })
      .then((response) => {
        // response.data is the users
        const registeredUser = response.data;
        console.log(registeredUser);
        dispatch(registerSuccess(registeredUser));
      })
      .catch((error) => {
        // error.message is the error message
        console.log(error);
        dispatch(registerFailure(error.message));
      });
  };
};
//******************************************************************
//--------------------------  Get All Users---------------------------
//__________________________________________________________________
export const getUsersRequest = () => {
  return {
    type: actions.GET_USERS_REQUEST,
  };
};

export const getUsersSuccess = (users, totalPages) => {
  return {
    type: actions.GET_USERS_SUCCESS,
    payload: {
      users: users,
      totalPages: totalPages,
    },
  };
};

export const getUsersFailure = (error) => {
  return {
    type: actions.GET_USERS_FAILURE,
    payload: error,
  };
};

export const getUsers = (pageNumber, keyword) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getUsersRequest());
    axios
      .get(`${actions.API_USERS_URL}?keyword=${keyword}&page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // response.data is the users
        const { users, totalPages } = response.data;
        console.log(response.data);
        console.log("users (action): ", users, totalPages);
        dispatch(getUsersSuccess(users, totalPages));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(getUsersFailure(error.message));
      });
  };
};

//******************************************************************
//--------------------------  Get A User---------------------------
//__________________________________________________________________

export const getUserRequest = () => {
  return {
    type: actions.GET_USER_REQUEST,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: actions.GET_USER_SUCCESS,
    payload: user,
  };
};

export const getUserFailure = (error) => {
  return {
    type: actions.GET_USER_FAILURE,
    payload: error,
  };
};

export const getUser = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getUserRequest());
    axios
      .get(`${actions.API_USERS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // response.data is the users
        const user = response.data.data;
        console.log("user (action): ", user);
        dispatch(getUserSuccess(user));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(getUserFailure(error.message));
      });
  };
};

//******************************************************************
//--------------------------  Update User ---------------------------
//__________________________________________________________________

export const updateRequest = () => {
  return {
    type: actions.UPDATE_REQUEST,
  };
};

export const updateSuccess = (updatedUser) => {
  return {
    type: actions.UPDATE_SUCCESS,
    payload: updatedUser,
  };
};

export const updateFailure = (error) => {
  return {
    type: actions.UPDATE_FAILURE,
    payload: error,
  };
};

export const update = (id, user) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(updateRequest);
    axios
      .patch(
        `${actions.API_USERS_URL}/${id}`,
        { ...user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // response.data is the users
        const updatedUser = response.data.data;
        console.log(updatedUser);
        dispatch(updateSuccess(updatedUser));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(registerFailure(error.message));
      });
  };
};

//******************************************************************
//--------------------------  Delete User ---------------------------
//__________________________________________________________________

export const deleteRequest = () => {
  return {
    type: actions.DELETE_REQUEST,
  };
};

export const deleteSuccess = () => {
  return {
    type: actions.DELETE_SUCCESS,
  };
};

export const deleteFailure = (error) => {
  return {
    type: actions.UPDATE_FAILURE,
    payload: error,
  };
};

export const deleteUser = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(deleteRequest);
    axios
      .delete(`${actions.API_USERS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // response.data is the users
        const message = response.data.message;
        console.log(message);
        dispatch(deleteSuccess());
        dispatch(getUsers());
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(deleteFailure(error.message));
      });
  };
};
