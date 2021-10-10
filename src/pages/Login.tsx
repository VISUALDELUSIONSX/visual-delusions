import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { displaySignInDialog } from '../store/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(displaySignInDialog());
  }, [dispatch]);

  return null;
};

export default Login;
