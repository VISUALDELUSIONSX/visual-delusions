import { alpha, Card, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { theme } from '../theme';
import Bar from './Bar';

interface Props {
  i: number;
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

const ShopItemLoading: React.FC<Props> = ({ i }) => {
  const classes = useStyles();
  const isOdd = i % 2 === 0;

  return (
    <Card
      className={classes.card}
      style={{
        boxShadow: `2px 2px 20px ${alpha(
          isOdd ? theme.palette.info.main : theme.palette.secondary.main,
          0.4
        )}`,
      }}
    >
      <Skeleton variant='rect' height={250} width='100%' animation='wave' />
      <div style={{ padding: '1rem' }}>
        <Skeleton variant='text' height={50} animation='wave' />
        <Bar
          style={{ height: '2px', width: '50px', marginTop: '5' }}
          color={isOdd ? 'info' : 'secondary'}
        />
        <Skeleton variant='text' height={50} animation='wave' />
      </div>
    </Card>
  );
};

export default ShopItemLoading;
