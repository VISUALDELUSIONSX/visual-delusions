import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, FileWithId } from '../types/client';
import ImageDropzone from './ImageDropzone';

interface Props {
  open: boolean | Category;
  onClose: () => any;
  onSubmit: (data: FormDetailsWithImage) => any;
  loading: boolean;
}

interface FormDetails {
  name: string;
  slug: string;
}

interface FormDetailsWithImage extends FormDetails {
  img?: FileWithId | { id: string; src: string };
}
const CategoryAddDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit, errors, setValue, watch } =
    useForm<FormDetails>();
  const [img, setImg] = useState<FileWithId | { id: string; src: string }>();
  const name = watch('name');

  useEffect(() => {
    const slug = name || '';
    setValue(
      'slug',
      encodeURIComponent(
        slug.replaceAll('&', 'and').replaceAll(' ', '-').toLowerCase()
      )
    );
  }, [name, setValue]);

  useEffect(() => {
    setImg((typeof open === 'object' && open.image) || undefined);
  }, [open]);

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth='sm' fullWidth>
      <div style={{ padding: '2rem' }}>
        <Typography variant='h4' gutterBottom align='center'>
          Add Category
        </Typography>
        <form
          aria-label='log in form'
          onSubmit={handleSubmit((data) => onSubmit({ ...data, img }))}
        >
          <Grid container direction='column' spacing={3}>
            <Grid item style={{ width: '100%' }}>
              <TextField
                inputRef={register({ required: 'Name is required' })}
                defaultValue={typeof open === 'object' ? open.name : ''}
                id='name'
                label='Name'
                fullWidth
                autoFocus
                name='name'
                aria-invalid={errors.name ? 'true' : 'false'}
                variant='outlined'
              />

              {errors.name && (
                <Typography
                  role='alert'
                  variant='subtitle2'
                  color='error'
                  style={{
                    marginTop: '0.5rem',
                  }}
                >
                  {errors.name.message}
                </Typography>
              )}
            </Grid>

            <Grid item>
              <TextField
                inputRef={register({ required: 'Slug is required' })}
                defaultValue={typeof open === 'object' ? open.slug : ''}
                id='slug'
                label='Slug'
                fullWidth
                name='slug'
                aria-invalid={errors.slug ? 'true' : 'false'}
                variant='outlined'
              />

              {errors.slug && (
                <Typography
                  role='alert'
                  variant='subtitle2'
                  color='error'
                  style={{
                    marginTop: '0.5rem',
                  }}
                >
                  {errors.slug.message}
                </Typography>
              )}
            </Grid>

            <Grid item>
              {img && 'src' in img ? (
                <Button variant='contained' onClick={() => setImg(undefined)}>
                  Change Photo
                </Button>
              ) : (
                <ImageDropzone
                  singleImage
                  onDrop={(files) => setImg(files[0])}
                />
              )}
            </Grid>

            <Grid item style={{ alignSelf: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default CategoryAddDialog;
