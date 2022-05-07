import { Button, Container, Grid, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Category from '../../components/Category';
import CategoryLoading from '../../components/CategoryLoading';
import NeonTypography from '../../components/NeonTypography';
import useAnimation from '../../hooks/useAnimation';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useCollection from '../../hooks/useCollection';
import {
  setIsCategoryAddDialogOpen,
  setIsCategoryDeleteDialogOpen,
} from '../../store/simpleValuesSlice';
import { theme } from '../../theme';
import { Category as CategoryType } from '../../types/client';

const Categories = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);
  const [categories, categoriesLoading] =
    useCollection<CategoryType>('categories');

  const [titleRef, , titleEntry] = useInView({ delay: 100 });
  const isTitleIntersecting = titleEntry?.isIntersecting;
  const titleAnimation = useAnimation('fadeIn', isTitleIntersecting);
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <section
      style={{ padding: '7rem 0', background: theme.palette.background.paper }}
    >
      <Container>
        <div ref={titleRef}>
          <NeonTypography
            variant={xsDown ? 'h4' : 'h3'}
            component='h2'
            color={theme.palette.info.main}
            align='center'
            style={{
              marginBottom: '4rem',
              fontWeight: 'bold',
              ...titleAnimation,
            }}
          >
            CATEGORIES
          </NeonTypography>
        </div>

        {isAdmin && (
          <Button
            onClick={() => dispatch(setIsCategoryAddDialogOpen(true))}
            variant='contained'
            style={{
              marginBottom: '1rem',
            }}
          >
            Add Category
          </Button>
        )}

        <Grid container spacing={6} justifyContent='center'>
          {categoriesLoading
            ? new Array(4).fill(0).map((_, i) => (
                <Grid key={i} item xs={12} sm={6} lg={3}>
                  <CategoryLoading />
                </Grid>
              ))
            : categories.map((category) => (
                <Grid key={category.slug} item xs={12} sm={6} lg={3}>
                  <Category
                    src={category.image?.src}
                    name={category.name}
                    href={`/shop/${category.slug}`}
                    isEditable={isAdmin}
                    onDelete={() =>
                      dispatch(
                        setIsCategoryDeleteDialogOpen({
                          name: category.name,
                          id: category.id,
                          imgId: category.image?.id,
                        })
                      )
                    }
                    onEdit={() =>
                      dispatch(setIsCategoryAddDialogOpen(category))
                    }
                  />
                </Grid>
              ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Categories;
