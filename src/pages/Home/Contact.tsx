import { Container, Grid, TextField, Typography } from '@material-ui/core';
import NeonButton from '../../components/NeonButton';
import NeonTypography from '../../components/NeonTypography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../hooks/useAnimation';

interface ContactFormDetails {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [loadingContactMessage, setLoadingContactMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDetails>();

  const onSubmitContactForm = (data: ContactFormDetails) => {
    setLoadingContactMessage(true);
    setLoadingContactMessage(false);
  };

  const [titleRef, , titleEntry] = useInView();
  const titleIsIntersecting = titleEntry?.isIntersecting;
  const titleAnimation = useAnimation(
    ['fadeIn', 'slideRight'],
    titleIsIntersecting
  );

  const [nameRef, , nameEntry] = useInView();
  const nameIsIntersecting = nameEntry?.isIntersecting;
  const nameAnimation = useAnimation(
    ['fadeIn', 'slideRight'],
    nameIsIntersecting
  );

  const [emailRef, , emailEntry] = useInView();
  const emailIsIntersecting = emailEntry?.isIntersecting;
  const emailAnimation = useAnimation(
    ['fadeIn', 'slideRight'],
    emailIsIntersecting
  );

  const [messageRef, , messageEntry] = useInView();
  const messageIsIntersecting = messageEntry?.isIntersecting;
  const messageAnimation = useAnimation(
    ['fadeIn', 'slideRight'],
    messageIsIntersecting
  );

  const [buttonRef, , buttonEntry] = useInView();
  const buttonIsIntersecting = buttonEntry?.isIntersecting;
  const buttonAnimation = useAnimation(
    ['fadeIn', 'slideRight'],
    buttonIsIntersecting
  );

  return (
    <section style={{ padding: '7rem 0' }}>
      <Container>
        <div ref={titleRef} style={{ ...titleAnimation }}>
          <NeonTypography
            variant='h3'
            component='h2'
            color='secondary'
            gutterBottom
            align='center'
            style={{ marginBottom: '3rem' }}
          >
            CONTACT
          </NeonTypography>
        </div>

        <form
          style={{ maxWidth: '500px', margin: '0 auto' }}
          onSubmit={handleSubmit(onSubmitContactForm)}
        >
          <Grid container direction='column' spacing={3}>
            <Grid item ref={nameRef} style={{ ...nameAnimation }}>
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

            <Grid item ref={emailRef} style={{ ...emailAnimation }}>
              <TextField
                inputRef={register({ required: 'Email is required' })}
                id='email'
                label='Email'
                fullWidth
                autoComplete='email'
                name='email'
                aria-invalid={errors.email ? 'true' : 'false'}
                variant='filled'
                color='secondary'
              />

              {errors.email && (
                <Typography role='alert' variant='subtitle2' color='error'>
                  {errors.email.message}
                </Typography>
              )}
            </Grid>

            <Grid item ref={messageRef} style={{ ...messageAnimation }}>
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
                InputProps={{ color: 'secondary' }}
              />

              {errors.message && (
                <Typography role='alert' variant='subtitle2' color='error'>
                  {errors.message.message}
                </Typography>
              )}
            </Grid>

            <Grid
              item
              container
              justify='center'
              ref={buttonRef}
              style={{ ...buttonAnimation }}
            >
              <NeonButton
                disabled={loadingContactMessage}
                variant='outlined'
                color='secondary'
                type='submit'
                fullWidth
                size='large'
              >
                Send
              </NeonButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
