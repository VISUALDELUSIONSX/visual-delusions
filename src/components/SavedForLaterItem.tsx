import {
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { CartItem } from '../types/client';
import noImage from '../images/no-image.png';
import { formatPrice } from '../utils';
import Bar from './Bar';
import NeonCard from './NeonCard';

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

interface Props extends CartItem {
  shadowColor?: string;
  onRemoveItem: () => any;
  onMoveToCart: () => any;
}

const SavedForLaterItem: React.FC<Props> = ({
  name,
  price,
  previewImage,
  category,
  id,
  shadowColor = '#fff',
  onMoveToCart,
  onRemoveItem,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <NeonCard
      className={classes.card}
      onClick={() => history.push(`/shop/${category}/${id}`)}
      role='link'
      shadowColor={shadowColor}
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
              style={{ height: '2px', width: '50px', background: shadowColor }}
            />
          </Grid>

          <Grid item>
            <Typography
              variant='h5'
              component='h3'
              align='center'
              style={{ fontWeight: 'bold' }}
            >
              {formatPrice(price || 0)}
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction='column'
            spacing={2}
            alignItems='center'
          >
            <Grid item>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveToCart();
                }}
                variant='outlined'
                size='small'
              >
                Move To Cart
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem();
                }}
                size='small'
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </NeonCard>
  );
};

export default SavedForLaterItem;
