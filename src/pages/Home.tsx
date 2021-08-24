import {
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import Bar from '../components/Bar';
import Category from '../components/Category';
import NeonButton from '../components/NeonButton';
import NeonTypography from '../components/NeonTypography';
import { theme } from '../theme';
import lighter from '../images/lighter.jpg';
import hoodie from '../images/hoodie.jpg';
import canvas from '../images/canvas.jpg';
import jewellery from '../images/jewellery.jpg';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '10rem 0',
  },
  shop: {
    background: theme.palette.background.paper,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.section}>
        <Container>
          <Grid
            container
            justifyContent='center'
            direction='column'
            alignItems='center'
            spacing={3}
          >
            <Grid item>
              <NeonTypography align='center' variant='h1' color='primary'>
                Saving Our Earth
              </NeonTypography>
            </Grid>

            <Grid item>
              <Typography align='center' variant='h4'>
                One Lighter At A Time
              </Typography>
            </Grid>

            <Grid item>
              <NeonButton variant='outlined' color='primary'>
                Shop Now
              </NeonButton>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.shop)}>
        <Container>
          <NeonTypography variant='h3' color='secondary' gutterBottom>
            CATEGORIES
          </NeonTypography>

          <Bar
            color='secondary'
            style={{ width: '100%', height: '3px', marginBottom: '3rem' }}
          />

          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={3}>
              <Category src={canvas} title='Canvases & Paintings' />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category src={hoodie} title='Hoodies & Sweatshirts' />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category src={lighter} title='Lighters & Accessories' />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category src={jewellery} title='Jewellery' />
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Home;
