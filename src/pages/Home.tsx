import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  // TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
// import React, { useState } from 'react';
import Bar from '../components/Bar';
import Category from '../components/Category';
import NeonButton from '../components/NeonButton';
import NeonTypography from '../components/NeonTypography';
import lighter from '../images/lighter.jpg';
import hoodie from '../images/hoodie.jpg';
import canvas from '../images/canvas.jpg';
import jewellery from '../images/jewellery.jpg';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setIsAddCategoryDialogOpen } from '../store/simpleValuesSlice';
// import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '10rem 0',
  },
  shop: {
    background: theme.palette.background.paper,
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
  },
}));

// interface ContactFormDetails {
//   name: string;
//   email: string;
//   message: string;
// }

const Home = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);
  // const [loadingContactMessage, setLoadingContactMessage] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ContactFormDetails>();

  // const onSubmitContactForm = (data: ContactFormDetails) => {};

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
          <NeonTypography
            variant='h3'
            component='h2'
            extraColor='info'
            gutterBottom
          >
            CATEGORIES
          </NeonTypography>

          {isAdmin && (
            <Button
              onClick={() => dispatch(setIsAddCategoryDialogOpen(true))}
              variant='contained'
              style={{ marginBottom: '1rem' }}
            >
              Add Category
            </Button>
          )}

          <Bar
            color='info'
            style={{ width: '100%', height: '3px', marginBottom: '3rem' }}
          />

          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={3}>
              <Category
                src={canvas}
                title='Canvases & Paintings'
                href='/shop/canvases'
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category
                src={hoodie}
                title='Hoodies & Sweatshirts'
                href='/shop/hoodies'
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category
                src={lighter}
                title='Lighters & Accessories'
                href='/shop/accessories'
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Category
                src={jewellery}
                title='Jewellery'
                href='/shop/jewellery'
              />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container>
          <NeonTypography
            variant='h3'
            component='h2'
            color='primary'
            gutterBottom
          >
            CONTACT
          </NeonTypography>

          <Bar
            color='primary'
            style={{ width: '100%', height: '3px', marginBottom: '3rem' }}
          />

          <Grid container direction='column' spacing={2} alignItems='center'>
            <Grid item style={{ width: '100%', maxWidth: '600px' }}>
              <a
                href='mailto:samanthavlachos00@gmail.com'
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <CardContent>
                    <Typography variant='h5' align='center'>
                      <strong>Email: </strong>samanthavlachos00@gmail.com
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>

            <Grid item style={{ width: '100%', maxWidth: '600px' }}>
              <a href='tel:14164195618' style={{ textDecoration: 'none' }}>
                <Card>
                  <CardContent>
                    <Typography variant='h5' align='center'>
                      <strong>Phone: </strong>+1 (416) 419-5618
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          </Grid>

          {/* <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmitContactForm)}
          >
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <TextField
                  inputRef={register({ required: 'Name is required' })}
                  id='name'
                  label='Name'
                  fullWidth
                  autoComplete='name'
                  name='name'
                  aria-invalid={errors.email ? 'true' : 'false'}
                  variant='filled'
                  color='secondary'
                />

                {errors.name && (
                  <Typography role='alert' variant='subtitle2' color='error'>
                    {errors.name.message}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <TextField
                  inputRef={register({ required: 'Email is required' })}
                  id='email'
                  label='Email'
                  fullWidth
                  autoComplete='email'
                  name='email'
                  aria-invalid={errors.email ? 'true' : 'false'}
                  variant='filled'
                />

                {errors.email && (
                  <Typography role='alert' variant='subtitle2' color='error'>
                    {errors.email.message}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <TextField
                  inputRef={register({ required: 'Message is required' })}
                  id='message'
                  label='Message'
                  fullWidth
                  multiline
                  minRows={3}
                  autoComplete='message'
                  name='message'
                  aria-invalid={errors.message ? 'true' : 'false'}
                  variant='filled'
                  color='primary'
                  InputProps={{ color: 'primary' }}
                />

                {errors.message && (
                  <Typography role='alert' variant='subtitle2' color='error'>
                    {errors.message.message}
                  </Typography>
                )}
              </Grid>

              <Grid item container justify='center'>
                <NeonButton
                  disabled={loadingContactMessage}
                  variant='outlined'
                  color='primary'
                  type='submit'
                >
                  Send
                </NeonButton>
              </Grid>
            </Grid>
          </form> */}
        </Container>
      </section>
    </>
  );
};

export default Home;
