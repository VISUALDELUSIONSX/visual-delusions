import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

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

interface Props {
  src: string;
  title: string;
  href: string;
}

const Category: React.FC<Props> = ({ src, title, href }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      className={classes.card}
      onClick={() => history.push(href)}
      role='link'
    >
      <img
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        src={src}
        alt={title}
      />
      <CardContent>
        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={3}
          justifyContent='flex-end'
        >
          <Grid item>
            <Typography variant='h4' component='h3' align='center'>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Category;
