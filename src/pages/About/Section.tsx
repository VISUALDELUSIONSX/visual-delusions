import { Grid } from '@material-ui/core';
import { FirestoreTextEditor } from 'firestore-text-editor';
import NeonCard from '../../components/NeonCard';
import NeonTypography from '../../components/NeonTypography';
import ImageDropzoneAndDisplayContainer from '../../containers/ImageDropzoneAndDisplayContainer';

interface Props {
  title: string;
  path: string;
  imageField: string;
  textField: string;
  reverse?: boolean;
  color: string;
}

const Section: React.FC<Props> = ({
  title,
  path,
  imageField,
  textField,
  color,
  reverse,
}) => {
  const smallSection = (
    <Grid
      item
      xs={12}
      sm={5}
      md={4}
      style={{ height: 400, width: 400, alignSelf: 'center' }}
    >
      <ImageDropzoneAndDisplayContainer
        storagePath={path}
        docPath={path}
        field={imageField}
      />
    </Grid>
  );

  const largeSection = (
    <Grid item xs={12} sm={7} md={8}>
      <NeonTypography color={color} component='h2' variant='h4' gutterBottom>
        {title}
      </NeonTypography>
      <FirestoreTextEditor
        editorStyle={{ lineHeight: '200%' }}
        path={path}
        field={textField}
      />
    </Grid>
  );

  return (
    <section>
      <NeonCard
        shadowColor={color}
        animation={reverse ? 'slideLeft' : 'slideRight'}
      >
        <div style={{ padding: '2rem' }}>
          <Grid
            container
            direction='row'
            spacing={4}
            wrap={reverse ? 'wrap' : 'wrap-reverse'}
          >
            {reverse ? (
              <>
                {largeSection}
                {smallSection}
              </>
            ) : (
              <>
                {smallSection}
                {largeSection}
              </>
            )}
          </Grid>
        </div>
      </NeonCard>
    </section>
  );
};

export default Section;
