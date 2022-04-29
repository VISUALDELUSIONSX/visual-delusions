import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, loaded } = useAppSelector((state: any) => state.auth);

  return loaded ? (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: rest.path },
            }}
          />
        )
      }
    />
  ) : (
    <Grid container justifyContent='center'>
      <CircularProgress />
    </Grid>
  );
};

export default PrivateRoute;
