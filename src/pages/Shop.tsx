import React from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ShopItemPreview from '../components/ShopItemPreview';
import { useAppSelector } from '../hooks/useAppSelector';
import NeonTypography from '../components/NeonTypography';
import NeonButton from '../components/NeonButton';
import { Category } from '../types/client';
import useCollection from '../hooks/useCollection';
import { Skeleton } from '@material-ui/lab';

interface MatchProps {
  category?: string;
}

interface Props extends RouteComponentProps<MatchProps> {}

const Shop: React.FC<Props> = ({ match }) => {
  const category = match.params.category;
  const history = useHistory();
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);

  const [categories, categoriesLoading] = useCollection<Category>('categories');

  return (
    <div>
      <Container maxWidth='lg'>
        <NeonTypography
          component='h1'
          variant='h2'
          color='primary'
          align='center'
          style={{ marginBottom: '2rem', marginTop: '3rem' }}
        >
          OUR SELECTION
        </NeonTypography>

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
          <Button style={{ marginBottom: '1rem' }} variant='contained'>
            Add Item
          </Button>
        )}

        <Grid container spacing={8}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 19].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <ShopItemPreview
                name='Test Item'
                price={20}
                category='lighters'
                id='1'
                i={i}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Shop;
