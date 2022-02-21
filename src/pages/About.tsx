import { alpha, Card, Container } from '@material-ui/core';
import { FirestoreTextEditor } from 'firestore-text-editor';
import NeonTypography from '../components/NeonTypography';
import { theme } from '../theme';

const About = () => {
  return (
    <Container maxWidth='md' style={{ marginTop: '3rem' }}>
      <Card
        style={{
          boxShadow: `2px 2px 20px ${alpha(theme.palette.info.main, 0.4)}`,
          padding: '2rem',
        }}
      >
        <NeonTypography
          gutterBottom
          component='h1'
          align='center'
          variant='h3'
          extraColor='info'
        >
          ABOUT
        </NeonTypography>
        <FirestoreTextEditor path='pages/about' />
      </Card>
    </Container>
  );
};

export default About;
