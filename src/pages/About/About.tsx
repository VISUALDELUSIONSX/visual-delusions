import { Container, Grid } from '@material-ui/core';
import NeonTypography from '../../components/NeonTypography';
import { theme } from '../../theme';
import Section from './Section';

const About = () => {
  return (
    <Container maxWidth='lg' style={{ marginTop: '3rem', overflow: 'hidden' }}>
      <NeonTypography
        animation='fadeIn'
        component='h1'
        variant='h2'
        shadowQuotient={4}
        color={theme.palette.warning.dark}
        align='center'
        style={{
          marginBottom: '4rem',
          marginTop: '4rem',
          fontWeight: 'bold',
        }}
      >
        ABOUT US
      </NeonTypography>

      <Grid container direction='column' spacing={8}>
        <Grid item>
          <Section
            color={theme.palette.info.main}
            path='pages/about'
            imageField='ourPurposeSrc'
            textField='ourPurpose'
            title='Our Purpose'
          />
        </Grid>

        <Grid item>
          <Section
            reverse
            color={theme.palette.error.main}
            path='pages/about'
            imageField='theArtistSrc'
            textField='theArtist'
            title='The Artist'
          />
        </Grid>

        <Grid item>
          <Section
            color={theme.palette.secondary.main}
            path='pages/about'
            imageField='howItStartedSrc'
            textField='howItStarted'
            title='How It Started'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
