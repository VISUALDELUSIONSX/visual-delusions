import { Container, Grid, Typography } from '@material-ui/core';
import NeonAccordion from '../components/NeonAccordion';
import NeonTypography from '../components/NeonTypography';
import { theme } from '../theme';

const About = () => {
  return (
    <Container maxWidth='lg' style={{ marginTop: '3rem' }}>
      <NeonTypography
        animation='fadeIn'
        component='h1'
        variant='h2'
        shadowQuotient={4}
        color={theme.palette.error.dark}
        align='center'
        style={{
          marginBottom: '4rem',
          marginTop: '4rem',
          fontWeight: 'bold',
        }}
      >
        FAQ
      </NeonTypography>

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <NeonAccordion
            color={theme.palette.primary.main}
            summary={<Typography>Accordion 1</Typography>}
          >
            <Typography>TEST !@#</Typography>
          </NeonAccordion>
        </Grid>
        <Grid item>
          <NeonAccordion
            color={theme.palette.secondary.main}
            summary={<Typography>Accordion 1</Typography>}
          >
            <Typography>TEST !@#</Typography>
          </NeonAccordion>
        </Grid>
        <Grid item>
          <NeonAccordion
            color={theme.palette.info.main}
            summary={<Typography>Accordion 1</Typography>}
          >
            <Typography>TEST !@#</Typography>
          </NeonAccordion>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
