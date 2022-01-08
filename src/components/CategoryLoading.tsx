import { Card, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.default,
    height: '100%',
    boxShadow: `2px 2px 20px rgba(126,76,203, 0.4)`,
    cursor: 'pointer',
    transition: '200ms',

    '&:hover': {
      transform: 'scale(1.025)',
    },
  },
}));

const CategoryLoading = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton variant='rect' height={300} width='100%' animation='wave' />
      <div style={{ padding: '1rem' }}>
        <Skeleton variant='text' height={50} animation='wave' />
      </div>
    </Card>
  );
};

export default CategoryLoading;
