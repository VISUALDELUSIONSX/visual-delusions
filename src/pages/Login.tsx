import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { displaySignInDialog } from 'react-redux-firebase-auth';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(displaySignInDialog());
  }, [dispatch]);

  return null;
};

export default Login;
