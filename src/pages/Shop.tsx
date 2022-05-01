import React from 'react';
import { Button, Container, Grid, IconButton } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ShopItemPreview from '../components/ShopItemPreview';
import { useAppSelector } from '../hooks/useAppSelector';
import NeonTypography from '../components/NeonTypography';
import NeonButton from '../components/NeonButton';
import { Category, ShopItem } from '../types/client';
import useCollection from '../hooks/useCollection';
import { Skeleton } from '@material-ui/lab';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  setIsCategoryAddDialogOpen,
  setIsCategoryDeleteDialogOpen,
  setIsShopItemAddDialogOpen,
  setIsShopItemDeleteDialogOpen,
} from '../store/simpleValuesSlice';
import ShopItemLoading from '../components/ShopItemLoading';
import { Delete } from '@material-ui/icons';
import { theme } from '../theme';

interface MatchProps {
  category?: string;
}

interface Props extends RouteComponentProps<MatchProps> {}

const Shop: React.FC<Props> = ({ match }) => {
  const category = match.params.category;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);

  const [categories, categoriesLoading] = useCollection<Category>('categories');
  const [shopItems, shopItemsLoading] = useCollection<ShopItem>('shop_items', {
    where: category ? ['category', '==', category] : undefined,
  });

  return (
    <div>
      <Container maxWidth='lg'>
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
          OUR SELECTION
        </NeonTypography>

        {isAdmin && (
          <Button
            style={{ display: 'block', margin: '0 auto', marginBottom: '1rem' }}
            variant='contained'
            onClick={() => dispatch(setIsCategoryAddDialogOpen(true))}
          >
            Add Category
          </Button>
        )}

        <Grid
          container
          direction='row'
          spacing={5}
          justifyContent='center'
          style={{ marginBottom: '3rem' }}
        >
          <Grid item>
            <NeonButton
              color='primary'
              variant={!category ? 'contained' : 'outlined'}
              onClick={() => history.push(`/shop`)}
            >
              All
            </NeonButton>
          </Grid>

          {categoriesLoading &&
            Array(3)
              .fill(null)
              .map((_, i) => (
                <Grid item key={i}>
                  <Skeleton
                    variant='rect'
                    width={150}
                    height={36.5}
                    animation='wave'
                  />
                </Grid>
              ))}

          {categories.map((c) => (
            <Grid item key={c.id}>
              <NeonButton
                endIcon={
                  isAdmin && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setIsCategoryDeleteDialogOpen(c));
                      }}
                      style={{ color: theme.palette.error.main }}
                      size='small'
                    >
                      <Delete fontSize='small' />
                    </IconButton>
                  )
                }
                color='primary'
                variant={c.slug === category ? 'contained' : 'outlined'}
                onClick={() => history.push(`/shop/${c.slug}`)}
              >
                {c.name}
              </NeonButton>
            </Grid>
          ))}
        </Grid>

        {isAdmin && (
          <Button
            onClick={() => dispatch(setIsShopItemAddDialogOpen(true))}
            style={{ marginBottom: '1rem' }}
            variant='contained'
          >
            Add Item
          </Button>
        )}

        <Grid container spacing={8}>
          {shopItemsLoading &&
            Array(8)
              .fill(null)
              .map((_, i) => {
                const isOdd = i % 2 === 0;
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ShopItemLoading
                      shadowColor={
                        isOdd
                          ? theme.palette.info.main
                          : theme.palette.secondary.main
                      }
                    />
                  </Grid>
                );
              })}

          {shopItems.map((item, i) => {
            const isOdd = i % 2 === 0;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <ShopItemPreview
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  id={item.id}
                  shadowColor={
                    isOdd
                      ? theme.palette.info.main
                      : theme.palette.secondary.main
                  }
                  previewImage={item.images?.[0]?.src}
                  isAdmin={isAdmin}
                  onEditItem={() => dispatch(setIsShopItemAddDialogOpen(item))}
                  onDeleteItem={() =>
                    dispatch(setIsShopItemDeleteDialogOpen(item))
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Shop;
