import React from 'react';
import {
  Breadcrumbs,
  Container,
  Grid,
  Link as StyledLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShopItemPreview from '../components/ShopItemPreview';
import ShopFilter from '../components/ShopFilter';

const Shop = () => {
  return (
    <div>
      <Container maxWidth='xl'>
        <Breadcrumbs
          aria-label='breadcrumb'
          style={{
            fontWeight: 'bold',
            fontSize: '14px',
            marginBottom: '1.5rem',
          }}
        >
          <StyledLink component={Link} to='/' underline='hover' color='inherit'>
            HOME
          </StyledLink>
          <StyledLink
            component={Link}
            to='/shop'
            underline='hover'
            color='inherit'
          >
            SHOP
          </StyledLink>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <ShopFilter
              categories={[
                { value: 'canvases', label: 'Canvases & Paintains' },
                { value: 'hoodies', label: 'Hoodies & Sweatshirts' },
                { value: 'accessories', label: 'Lighters & Accessories' },
                { value: 'jewellery', label: 'Jewellery' },
              ]}
            />
          </Grid>

          <Grid item md={9}>
            <Grid container spacing={6}>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Shop;
