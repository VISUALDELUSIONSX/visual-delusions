import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NeonButton from './NeonButton';

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.default,
    height: '100%',
  },
}));

interface Props {
  src: string;
  title: string;
}

const Category: React.FC<Props> = ({ src, title }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <img
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
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

          <Grid item>
            <NeonButton color='primary' size='large'>
              Shop Now
            </NeonButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Category;
