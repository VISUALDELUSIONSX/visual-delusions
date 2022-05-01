import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Bar from './Bar';
import NeonCard from './NeonCard';

interface Props {
  shadowColor?: string;
}

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

const ShopItemLoading: React.FC<Props> = ({ shadowColor = '#fff' }) => {
  const classes = useStyles();

  return (
    <NeonCard className={classes.card} shadowColor={shadowColor}>
      <Skeleton variant='rect' height={250} width='100%' animation='wave' />
      <div style={{ padding: '1rem' }}>
        <Skeleton variant='text' height={50} animation='wave' />
        <Bar
          style={{
            height: '2px',
            width: '50px',
            marginTop: '5',
            background: shadowColor,
          }}
        />
        <Skeleton variant='text' height={50} animation='wave' />
      </div>
    </NeonCard>
  );
};

export default ShopItemLoading;
