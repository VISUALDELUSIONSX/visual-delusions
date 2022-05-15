import {
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import NeonButton from '../../components/NeonButton';
import NeonTypography from '../../components/NeonTypography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../hooks/useAnimation';
import { theme } from '../../theme';
import { callableContactSubmission } from '../../services/firebase';
import ColoredTextField from '../../components/ColoredTextField';
import { Alert } from '@material-ui/lab';

interface ContactFormDetails {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [loadingContactMessage, setLoadingContactMessage] = useState(false);
  const [openSubmissionSuccess, setOpenSubmissionSuccess] = useState(false);
  const [openSubmissionFail, setOpenSubmissionFail] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormDetails>();

  const onSubmitContactForm = async (data: ContactFormDetails) => {
    setLoadingContactMessage(true);
    await callableContactSubmission(data)
      .then(() => {
        reset();
        setOpenSubmissionSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setOpenSubmissionFail(true);
      });
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
    <section style={{ padding: '7rem 0' }} id='contact'>
      <Container>
        <div ref={titleRef} style={{ ...titleAnimation }}>
          <NeonTypography
            variant={xsDown ? 'h4' : 'h3'}
            component='h2'
            color={theme.palette.secondary.dark}
            gutterBottom
            align='center'
            style={{ marginBottom: '3rem', fontWeight: 'bold' }}
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
              <ColoredTextField
                inputRef={register({ required: 'Name is required' })}
                id='name'
                label='Name'
                fullWidth
                autoComplete='name'
                name='name'
                aria-invalid={errors.email ? 'true' : 'false'}
                variant='outlined'
                color={theme.palette.secondary.main}
              />

              {errors.name && (
                <Typography role='alert' variant='subtitle2' color='error'>
                  {errors.name.message}
                </Typography>
              )}
            </Grid>

            <Grid item ref={emailRef} style={{ ...emailAnimation }}>
              <ColoredTextField
                inputRef={register({ required: 'Email is required' })}
                id='email'
                label='Email'
                fullWidth
                autoComplete='email'
                name='email'
                aria-invalid={errors.email ? 'true' : 'false'}
                variant='outlined'
                color={theme.palette.secondary.main}
              />

              {errors.email && (
                <Typography role='alert' variant='subtitle2' color='error'>
                  {errors.email.message}
                </Typography>
              )}
            </Grid>

            <Grid item ref={messageRef} style={{ ...messageAnimation }}>
              <ColoredTextField
                inputRef={register({ required: 'Message is required' })}
                id='message'
                label='Message'
                fullWidth
                multiline
                minRows={3}
                autoComplete='message'
                name='message'
                aria-invalid={errors.message ? 'true' : 'false'}
                variant='outlined'
                color={theme.palette.secondary.main}
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
                color={theme.palette.secondary.main}
                type='submit'
                size='large'
                endIcon={
                  loadingContactMessage ? (
                    <CircularProgress
                      size={20}
                      style={{ color: theme.palette.secondary.main }}
                    />
                  ) : undefined
                }
              >
                Send
              </NeonButton>
            </Grid>

            <Snackbar
              open={openSubmissionSuccess}
              autoHideDuration={6000}
              onClose={() => setOpenSubmissionSuccess(false)}
            >
              <Alert variant='filled' severity='success'>
                Your message has been sent! We will get back to your shortly
              </Alert>
            </Snackbar>

            <Snackbar
              open={openSubmissionFail}
              autoHideDuration={6000}
              onClose={() => setOpenSubmissionFail(false)}
            >
              <Alert variant='filled' severity='error'>
                Your message failed to send! Please try again or email us
                directly at samanthavlachos00@gmail.com
              </Alert>
            </Snackbar>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
