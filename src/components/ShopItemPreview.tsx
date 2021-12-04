import {
  alpha,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { ShopItem } from '../types/client';
import noImage from '../images/no-image.png';
import { theme } from '../theme';
import { formatPrice } from '../utils';
import Bar from './Bar';

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#232323',
    height: '100%',

    cursor: 'pointer',
    transition: '200ms',

    '&:hover': {
      transform: 'scale(1.025)',
    },
  },
}));

const ShopItemPreview: React.FC<ShopItem> = ({
  name,
  price,
  previewImage,
  category,
  id,
  i = 0,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const isOdd = i % 2 === 0;

  return (
    <Card
      className={classes.card}
      onClick={() => history.push(`/shop/${category}/${id}`)}
      role='link'
      style={{
        boxShadow: `2px 2px 20px ${alpha(
          isOdd ? theme.palette.info.main : theme.palette.secondary.main,
          0.4
        )}`,
      }}
    >
      <div>
        <img
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            display: 'block',
          }}
          src={previewImage || noImage}
          alt={name}
        />
      </div>

      <CardContent>
        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={1}
          justifyContent='flex-end'
        >
          <Grid item>
            <Typography
              variant='body1'
              style={{ fontWeight: 'bold' }}
              component='h3'
              align='center'
            >
              {name}
            </Typography>
          </Grid>

          <Grid item>
            <Bar
              style={{ height: '2px', width: '50px' }}
              color={isOdd ? 'info' : 'secondary'}
            />
          </Grid>

          <Grid item>
            <Typography
              // color='primary'
              variant='h5'
              component='h3'
              align='center'
              style={{ fontWeight: 'bold' }}
            >
              {formatPrice(price || 0)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShopItemPreview;
