import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthInitialized,
  selectAuthSuccessMessage,
} from "../features/auth/authSelectors";

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../features/auth/authThunks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  const loading = useAppSelector(
    selectAuthLoading
  );

  const error = useAppSelector(
    selectAuthError
  );

  const initialized = useAppSelector(
    selectAuthInitialized
  );

  const successMessage = useAppSelector(
    selectAuthSuccessMessage
  );

  const login = (credentials) =>
    dispatch(loginUser(credentials));

  const register = (userData) =>
    dispatch(registerUser(userData));

  const logout = () =>
    dispatch(logoutUser());

  const fetchMe = () =>
    dispatch(getMe());

  return {
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    successMessage,

    login,
    register,
    logout,
    fetchMe
  };
};