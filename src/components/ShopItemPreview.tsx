import {
  Button,
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
import NeonCard from './NeonCard';
import NeonButton from './NeonButton';
import { addToCart } from '../store/cartSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

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

interface Props extends ShopItem {
  isAdmin?: boolean;
  onEditItem?: () => any;
  onDeleteItem?: () => any;
  shadowColor?: string;
}

const ShopItemPreview: React.FC<Props> = ({
  name,
  price,
  previewImage,
  category,
  shadowColor = '#fff',
  id,
  isAdmin,
  onEditItem,
  onDeleteItem,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
              style={{
                height: '2px',
                width: '50px',
                backgroundColor: shadowColor,
              }}
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
            direction='row'
            spacing={3}
            style={{ marginTop: '0.5rem' }}
            justifyContent='center'
          >
            <Grid item>
              <NeonButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
                size='small'
                color={shadowColor}
                variant='outlined'
              >
                Buy Now
              </NeonButton>
            </Grid>
            <Grid item>
              <NeonButton
                size='small'
                color={shadowColor}
                variant='contained'
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    addToCart({ id, name, price, category, quantity: 1 })
                  );
                }}
              >
                Add To Cart
              </NeonButton>
            </Grid>
          </Grid>

          {isAdmin && (
            <>
              {onEditItem && (
                <Grid item>
                  <Button
                    variant='contained'
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditItem();
                    }}
                  >
                    Edit Item
                  </Button>
                </Grid>
              )}
              {onDeleteItem && (
                <Grid item>
                  <Button
                    variant='contained'
                    style={{
                      background: theme.palette.error.main,
                      color: 'white',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem();
                    }}
                  >
                    Delete Item
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </CardContent>
    </NeonCard>
  );
};

export default ShopItemPreview;
