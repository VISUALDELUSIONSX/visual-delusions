import {
  Button,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useHistory } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import noImage from '../images/no-image.png';
import { theme } from '../theme';
import NeonCard from './NeonCard';

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.default,
    height: '100%',
    cursor: 'pointer',
    transition: '200ms',

    '&:hover': {
      transform: 'scale(1.025)',
    },
  },
}));

interface Props {
  src?: string | null;
  name: string;
  href: string;
  isEditable?: boolean;
  onEdit?: () => any;
  onDelete?: () => any;
}
const Category: React.FC<Props> = ({
  src,
  name,
  href,
  isEditable,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [ref, , entry] = useInView();
  const isIntersecting = entry?.isIntersecting;
  const animation = useAnimation(['fadeIn', 'grow'], isIntersecting, {
    transition: '300ms ease-in-out',
  });

  return (
    <NeonCard
      ref={ref}
      className={classes.card}
      onClick={() => history.push(href)}
      role='link'
      style={{ ...animation }}
      shadowColor={theme.palette.info.main}
    >
      <img
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        src={src || noImage}
        alt={name}
      />
      <CardContent>
        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={3}
          justifyContent='flex-end'
        >
          <Grid item>
            <Typography variant='h4' component='h3' align='center'>
              {name}
            </Typography>
          </Grid>

          {isEditable && (onEdit || onDelete) && (
            <Grid item container spacing={2} justifyContent='center'>
              {onEdit && (
                <Grid item>
                  <Button
                    variant='contained'
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
              )}

              {onDelete && (
                <Grid item>
                  <Button
                    variant='contained'
                    style={{
                      background: theme.palette.error.main,
                      color: 'white',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </NeonCard>
  );
};

export default Category;

