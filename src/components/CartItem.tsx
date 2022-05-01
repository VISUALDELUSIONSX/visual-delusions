import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Link as StyledLink,
} from '@material-ui/core';
import React from 'react';
import { CartItem as CartItemType } from '../types/client';
import noImage from '../images/no-image.png';
import { theme } from '../theme';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';
import { Add, Remove } from '@material-ui/icons';

interface Props extends CartItemType {
  onAddQuantity?: () => any;
  onReduceQuantity?: () => any;
  onRemoveItem?: () => any;
  onSaveForLater?: () => any;
  imageSize?: number | string;
}

const CartItem: React.FC<Props> = ({
  images,
  category,
  id,
  name,
  price,
  quantity,
  imageSize,
  onAddQuantity,
  onReduceQuantity,
  onRemoveItem,
  onSaveForLater,
}) => {
  const previewImage = images?.[0]?.src || noImage;
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const imageDimension = imageSize || smDown ? 100 : 150;

  return (
    <Grid container wrap='nowrap'>
      <Grid item style={{ marginRight: '1rem' }}>
        <Link
          to={`/shop/${category}/${id}`}
          style={{
            display: 'block',
            width: imageDimension,
            height: imageDimension,
          }}
        >
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt='preview'
            src={previewImage}
          />
        </Link>
      </Grid>

      <Grid item container direction='column' spacing={1}>
        <Grid item>
          <StyledLink
            style={{ fontSize: '1rem' }}
            color='inherit'
            component={Link}
            to={`/shop/${category}/${id}`}
          >
            {name}
          </StyledLink>
        </Grid>

        <Grid item>
          <Typography gutterBottom style={{ fontWeight: 'bold' }}>
            {formatPrice(price)}
          </Typography>
        </Grid>

        <Grid item>
          {onReduceQuantity && onAddQuantity ? (
            <>
              <Typography variant='body2' gutterBottom>
                Quantity
              </Typography>
              <Grid container direction='row' alignItems='center' wrap='nowrap'>
                <Button
                  style={{ minWidth: 0, padding: 5 }}
                  variant='outlined'
                  onClick={onReduceQuantity}
                >
                  <Remove fontSize='small' />
                </Button>
                <Typography style={{ margin: '0 1rem' }}>{quantity}</Typography>
                <Button
                  style={{ minWidth: 0, padding: 5 }}
                  variant='outlined'
                  onClick={onAddQuantity}
                >
                  <Add fontSize='small' />
                </Button>
              </Grid>
            </>
          ) : (
            <Typography variant='body2' gutterBottom>
              Quantity: {quantity}
            </Typography>
          )}
        </Grid>

        {(onRemoveItem || onSaveForLater) && (
          <Grid item style={{ marginLeft: '-5px' }}>
            {onRemoveItem && (
              <Button
                onClick={onRemoveItem}
                size='small'
                style={{ textTransform: 'capitalize' }}
              >
                Remove
              </Button>
            )}
            {onSaveForLater && (
              <Button
                onClick={onSaveForLater}
                size='small'
                style={{ textTransform: 'capitalize' }}
              >
                Save For Later
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CartItem;
