import {
  Button,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, FileWithId, ShopItem } from '../types/client';
import FormError from './FormError';
import ImageDropzone from './ImageDropzone';
import ReactHookFormSelect from './ReactHookFormSelect';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { theme } from '../theme';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  editor: {
    border: '1px solid #444',
    borderRadius: 4,
    padding: '0 12px',

    '&:hover': {
      borderRadius: 2,
      borderColor: 'white',
    },
  },
}));

interface Props {
  open: boolean | ShopItem;
  onClose: () => any;
  onSubmit: (data: FormDetails) => any;
  loading: boolean;
  categories: Category[];
  defaultImages?: FileWithId[];
  defaultImagesLoading?: boolean;
}

interface FormDetails {
  name: string;
  price: number;
  description?: string;
  previewImage?: string;
  category: string;
  images?: (FileWithId & { src?: string })[];
}

const ShopItemAddDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  loading,
  categories,
  defaultImages,
  defaultImagesLoading,
}) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormDetails>();

  useEffect(() => {
    register('images');
  }, [register]);

  const description = typeof open === 'object' && open.description;

  useEffect(() => {
    setEditorState(
      description
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
        : EditorState.createEmpty()
    );
  }, [description]);

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth='sm' fullWidth>
      <div style={{ padding: '2rem' }}>
        <Typography variant='h4' gutterBottom align='center'>
          Add Shop Item
        </Typography>

        <form
          aria-label='shop item form'
          onSubmit={handleSubmit((data) =>
            onSubmit({
              ...data,
              description: JSON.stringify(
                convertToRaw(editorState.getCurrentContent())
              ),
            })
          )}
        >
          <Grid container direction='column' spacing={3}>
            <Grid item>
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

              {errors.name && <FormError>{errors.name.message}</FormError>}
            </Grid>

            <Grid item>
              <TextField
                inputRef={register({ required: 'Price is required' })}
                defaultValue={typeof open === 'object' ? open.price : ''}
                id='price'
                label='Price'
                fullWidth
                name='price'
                type='number'
                aria-invalid={errors.price ? 'true' : 'false'}
                variant='outlined'
              />

              {errors.price && <FormError>{errors.price.message}</FormError>}
            </Grid>

            <Grid item>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbarStyle={{
                  background: theme.palette.background.paper,
                  border: 'none',
                  color: 'black',
                }}
                placeholder='Description'
                editorClassName={classes.editor}
              />
            </Grid>

            <Grid item>
              <ReactHookFormSelect
                control={control}
                variant='outlined'
                id='category'
                label='Category'
                name='category'
                fullWidth
                aria-invalid={errors.category ? 'true' : 'false'}
                defaultValue={typeof open === 'object' ? open.category : ''}
                rules={{
                  required: { value: true, message: 'Category is required' },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.slug} value={category.slug}>
                    {category.name}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>

              {errors.category && (
                <FormError>{errors.category.message}</FormError>
              )}
            </Grid>

            <Grid item>
              <ImageDropzone
                onFilesChange={(files) => setValue('images', files)}
                defaultImages={defaultImages}
                defaultImagesLoading={defaultImagesLoading}
              />
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

export default ShopItemAddDialog;
