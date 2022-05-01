import {
  Grid,
  Divider,
  List,
  ListItem,
  Typography,
  Button,
  Link as StyledLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { formatPrice } from '../utils';
import getNumOfItemsInCart from '../utils/getNumOfItemsInCart';
import getSubtotal from '../utils/getSubtotal';
import CartItem from './CartItem';
import NeonTypography from './NeonTypography';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { closeAddedToCart } from '../store/cartSlice';

const CartTooltipContent = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const filteredCartItems = cartItems.filter((item) => !item.savedForLater);
  const numOfItemsInCart = getNumOfItemsInCart(cartItems);
  const dispatch = useAppDispatch();

  return (
    <Grid
      container
      direction='column'
      spacing={2}
      style={{ padding: '0.5rem' }}
    >
      <Grid item>
        <NeonTypography
          color='primary'
          variant='h4'
          style={{ fontWeight: 'bold' }}
        >
          Shopping Cart
        </NeonTypography>
      </Grid>

      <Grid item>
        <Divider />
        <List disablePadding>
          {filteredCartItems.map((item) => (
            <ListItem disableGutters divider key={item.id}>
              <CartItem {...item} imageSize={100} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item container justifyContent='space-between'>
        <Typography>
          <b>Subtotal</b> ({numOfItemsInCart} item
          {numOfItemsInCart !== 1 ? 's' : ''})
        </Typography>

        <Typography>
          <b>{formatPrice(getSubtotal(cartItems))}</b>
        </Typography>
      </Grid>

      <Grid item>
        <Button
          component={Link}
          to='/checkout'
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => dispatch(closeAddedToCart())}
        >
          Checkout
        </Button>
      </Grid>

      <Grid item>
        <Button
          component={Link}
          to='/cart'
          variant='outlined'
          fullWidth
          onClick={() => dispatch(closeAddedToCart())}
        >
          View Cart
        </Button>
      </Grid>

      <Grid item style={{ alignSelf: 'center' }}>
        <StyledLink
          underline='always'
          color='inherit'
          component='button'
          onClick={() => dispatch(closeAddedToCart())}
        >
          Continue Shopping
        </StyledLink>
      </Grid>
    </Grid>
  );
};

export default CartTooltipContent;
