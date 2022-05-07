import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NeonButton from '../../components/NeonButton';
import NeonTypography from '../../components/NeonTypography';
import hero from '../../images/hero.jpg';
import { useInView } from 'react-intersection-observer';
import useAnimation from '../../hooks/useAnimation';
import { theme } from '../../theme';

const Hero = () => {
  const history = useHistory();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [titleRef, , titleEntry] = useInView({ delay: 100 });
  const [subtitleRef, , subtitleEntry] = useInView({ delay: 100 });
  const [buttonRef, , buttonEntry] = useInView({ delay: 100 });

  const isTitleIntersecting = titleEntry?.isIntersecting;
  const isSubtitleIntersecting = subtitleEntry?.isIntersecting;
  const isButtonIntersecting = buttonEntry?.isIntersecting;

  const titleAnimation = useAnimation('fadeIn', isTitleIntersecting, {
    transition: '1000ms',
  });
  const subtitleAnimation = useAnimation('fadeIn', isSubtitleIntersecting, {
    transition: '1000ms',
  });
  const buttonAnimation = useAnimation('fadeIn', isButtonIntersecting, {
    transition: '1000ms',
  });

  return (
    <section
      style={{
        padding: '7rem 0',
        backgroundImage: `url(${hero})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Grid
          container
          justifyContent='center'
          direction='column'
          alignItems='center'
          spacing={3}
          style={{ height: '60vh' }}
        >
          <Grid item ref={titleRef} style={{ ...titleAnimation }}>
            <NeonTypography
              style={{
                fontSize: xsDown ? 60 : smDown ? 80 : undefined,
                fontWeight: 700,
              }}
              align='center'
              variant='h1'
              color={theme.palette.primary.main}
            >
              Saving Our Earth
            </NeonTypography>
          </Grid>

          <Grid item ref={subtitleRef} style={{ ...subtitleAnimation }}>
            <Typography
              align='center'
              component='p'
              variant={xsDown ? 'h5' : 'h4'}
            >
              One Lighter At A Time
            </Typography>
          </Grid>

          <Grid item ref={buttonRef} style={{ ...buttonAnimation }}>
            <NeonButton
              variant='contained'
              color={theme.palette.primary.main}
              size='large'
              onClick={() => history.push('/shop')}
            >
              Shop Now
            </NeonButton>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
