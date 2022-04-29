import {
  alpha,
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
  Link as StyledLink,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { convertFromRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Link, RouteComponentProps } from 'react-router-dom';
import useDoc from '../hooks/useDoc';
import { Category, ShopItem as ShopItemType } from '../types/client';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useCollection from '../hooks/useCollection';
import Bar from '../components/Bar';
import { theme } from '../theme';
import { formatPrice } from '../utils';
import NeonButton from '../components/NeonButton';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  setIsShopItemAddDialogOpen,
  setIsShopItemDeleteDialogOpen,
} from '../store/simpleValuesSlice';

const useStyles = makeStyles({
  original: {
    '& img': {
      objectFit: 'cover !important',
    },
  },
  thumbnail: {
    '& img': {
      objectFit: 'cover',
    },
  },
});

interface MatchProps {
  shopItemId: string;
  category: string;
}

interface Props extends RouteComponentProps<MatchProps> {}

const ShopItem: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const id = match.params.shopItemId;
  const categorySlug = match.params.category;
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [shopItem, shopItemLoading] = useDoc<ShopItemType>(`shop_items/${id}`);
  const [categories, categoriesLoading] = useCollection<Category>(
    'categories',
    {
      where: ['slug', '==', categorySlug],
    }
  );
  const category = categories[0];

  useEffect(() => {
    shopItem?.description &&
      setDescription(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(shopItem.description))
        )
      );
  }, [shopItem?.description]);

  return (
    <Container maxWidth='lg' style={{ paddingTop: '4rem' }}>
      {shopItemLoading || categoriesLoading ? (
        <Grid container justifyContent='center'>
          <CircularProgress color='secondary' />
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageGallery
              showBullets
              showPlayButton={false}
              showFullscreenButton={false}
              items={
                shopItem?.images?.map((image) => ({
                  original: image.src,
                  originalAlt: image.alt,
                  originalClass: classes.original,
                  originalHeight: 400,
                  thumbnail: image.src,
                  thumbnailAlt: image.alt,
                  thumbnailClass: classes.thumbnail,
                  thumbnailHeight: 50,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              style={{
                boxShadow: `2px 2px 20px ${alpha(
                  theme.palette.secondary.main,
                  0.4
                )}`,
                padding: '2rem',
              }}
            >
              {isAdmin && (
                <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
                  <Grid item>
                    <Button
                      onClick={() =>
                        dispatch(setIsShopItemAddDialogOpen(shopItem))
                      }
                      variant='contained'
                    >
                      Edit Item
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      style={{
                        background: theme.palette.error.main,
                        color: 'white',
                      }}
                      onClick={() =>
                        dispatch(setIsShopItemDeleteDialogOpen(shopItem))
                      }
                    >
                      Delete Item
                    </Button>
                  </Grid>
                </Grid>
              )}

              <StyledLink
                component={Link}
                to={`/shop/${categorySlug}`}
                gutterBottom
                style={{ color: 'white' }}
              >
                {category?.name}
              </StyledLink>

              <Typography
                component='h1'
                variant='h3'
                style={{ fontWeight: 700 }}
                gutterBottom
              >
                {shopItem?.name}
              </Typography>

              <Bar
                color='secondary'
                align='left'
                style={{ width: '100%', height: '1px', marginBottom: '1rem' }}
              />

              <Typography
                gutterBottom
                style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
              >
                {formatPrice(shopItem?.price || 0)}
              </Typography>

              <Editor
                readOnly
                toolbarHidden
                editorState={description}
                editorStyle={{ margin: '-14px 0' }}
              />

              {/* <FirestoreTextEditor
                path={`shop_items/${id}`}
                field='description'
                editIconStyle={{ color: 'green' }}
              /> */}

              <Grid
                container
                direction='row'
                spacing={3}
                style={{ marginTop: '2rem' }}
              >
                <Grid item>
                  <NeonButton size='large' color='secondary' variant='outlined'>
                    Buy Now
                  </NeonButton>
                </Grid>
                <Grid item>
                  <NeonButton
                    size='large'
                    color='secondary'
                    variant='contained'
                  >
                    Add To Cart
                  </NeonButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ShopItem;
