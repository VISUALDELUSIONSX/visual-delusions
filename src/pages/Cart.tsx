import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import NeonButton from '../components/NeonButton';
import NeonCard from '../components/NeonCard';
import NeonTypography from '../components/NeonTypography';
import { useAppSelector } from '../hooks/useAppSelector';
import useCollection from '../hooks/useCollection';
import { theme } from '../theme';
import getNumOfItemsInCart from '../utils/getNumOfItemsInCart';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ShopItemPreview from '../components/ShopItemPreview';
import { ShopItem } from '../types/client';
import ShopItemLoading from '../components/ShopItemLoading';
import { useMemo } from 'react';
import CartItem from '../components/CartItem';
import { carouselResponsive } from '../constants';
import CartSubtitle from '../components/CartSubtitle';
import getSubtotal from '../utils/getSubtotal';
import { formatPrice } from '../utils';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  addToCart,
  moveToCart,
  removeFromCart,
  saveForLater,
} from '../store/cartSlice';
import SavedForLaterItem from '../components/SavedForLaterItem';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const numOfItemsInCart = getNumOfItemsInCart(cartItems);
  const subtotal = getSubtotal(cartItems);
  const [shopItems, shopItemsLoading] = useCollection<ShopItem>('shop_items');
  const exploreMoreItems = useMemo(
    () =>
      shopItems.filter(
        (shopItem) => !cartItems.find((cartItem) => cartItem.id === shopItem.id)
      ),
    [shopItems, cartItems]
  );
  const filteredCartItems = cartItems.filter((item) => !item.savedForLater);
  const savedForLaterItems = cartItems.filter((item) => item.savedForLater);

  return (
    <Container maxWidth='xl'>
      <NeonTypography
        animation='fadeIn'
        component='h1'
        variant='h2'
        color='primary'
        align='center'
        style={{
          marginBottom: '2rem',
          marginTop: '4rem',
          fontWeight: 'bold',
        }}
      >
        YOUR CART
      </NeonTypography>

      <Grid container spacing={4}>
        <Grid item container wrap='wrap-reverse' spacing={4}>
          <Grid item xs={12} md={8}>
            <NeonCard
              style={{ padding: '2rem', width: '100%' }}
              shadowColor={theme.palette.info.main}
            >
              <CartSubtitle extraColor='info'>Shopping Cart</CartSubtitle>
              <Divider />
              {filteredCartItems.length ? (
                <List disablePadding>
                  {filteredCartItems.map((item) => (
                    <ListItem
                      disableGutters
                      divider
                      style={{ padding: '1rem 0' }}
                      key={item.id}
                    >
                      <CartItem
                        onAddQuantity={() =>
                          dispatch(addToCart({ ...item, quantity: 1 }))
                        }
                        onReduceQuantity={() =>
                          dispatch(removeFromCart({ ...item, quantity: 1 }))
                        }
                        onRemoveItem={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                        onSaveForLater={() => dispatch(saveForLater(item.id))}
                        {...item}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <>
                  <Typography
                    style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
                  >
                    There doesn't seem to be any items in your cart
                  </Typography>

                  <NeonButton extraColor='info' size='large'>
                    Shop Now
                  </NeonButton>
                </>
              )}
            </NeonCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <NeonCard
              style={{ padding: '2rem' }}
              shadowColor={theme.palette.secondary.main}
            >
              <CartSubtitle color='secondary'>Checkout</CartSubtitle>

              <Typography style={{ marginBottom: '1rem' }}>
                <b>Subtotal: </b>
                {formatPrice(subtotal)}
              </Typography>

              <NeonButton
                variant='contained'
                color='secondary'
                fullWidth
                disabled={numOfItemsInCart < 1}
              >
                Checkout ({numOfItemsInCart} item
                {numOfItemsInCart !== 1 ? 's' : ''})
              </NeonButton>
            </NeonCard>
          </Grid>
        </Grid>

        {!!savedForLaterItems.length && (
          <Grid item xs={12}>
            <NeonCard shadowColor={theme.palette.primary.main}>
              <div style={{ padding: '2rem' }}>
                <CartSubtitle color='primary'>Saved For Later</CartSubtitle>

                {savedForLaterItems.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <SavedForLaterItem
                      {...item}
                      previewImage={item.images?.[0]?.src}
                      shadowColor={theme.palette.primary.main}
                      onMoveToCart={() => dispatch(moveToCart(item.id))}
                      onRemoveItem={() =>
                        dispatch(removeFromCart({ id: item.id }))
                      }
                    />
                  </Grid>
                ))}
              </div>
            </NeonCard>
          </Grid>
        )}

        {!!exploreMoreItems.length && (
          <Grid item xs={12}>
            <NeonCard shadowColor={theme.palette.error.main}>
              <div style={{ padding: '2rem' }}>
                <CartSubtitle extraColor='error'>
                  Explore More Items
                </CartSubtitle>

                <Carousel
                  showDots
                  shouldResetAutoplay={false}
                  infinite
                  responsive={carouselResponsive}
                >
                  {shopItemsLoading
                    ? Array(8)
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} style={{ padding: '1rem' }}>
                            <ShopItemLoading
                              shadowColor={theme.palette.error.main}
                            />
                          </div>
                        ))
                    : exploreMoreItems?.map((item, i) => (
                        <div key={item.id} style={{ padding: '1rem' }}>
                          <ShopItemPreview
                            {...item}
                            shadowColor={theme.palette.error.main}
                            previewImage={item.images?.[0]?.src}
                          />
                        </div>
                      ))}
                </Carousel>
              </div>
            </NeonCard>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Cart;
