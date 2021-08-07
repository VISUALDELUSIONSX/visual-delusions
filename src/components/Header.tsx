import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NeonTypography from './NeonTypography';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: '400ms',
      background: theme.palette.background.default,
    },
    rootAnimate: {
      transform: 'translateY(-100%)',
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* Header animates on mount */
    const header = headerRef.current!;
    header.classList.remove(classes.rootAnimate);

    /* Puts main into view from under header */
    const main = document.querySelector('main')!;
    const headerHeight = header.getBoundingClientRect().height + 16 + 'px';
    main.style.paddingTop = headerHeight;

    //eslint-disable-next-line
  }, []);

  return (
    <AppBar
      position='fixed'
      color='inherit'
      ref={headerRef}
      className={clsx(classes.root, classes.rootAnimate)}
    >
      <Toolbar>
        <NeonTypography
          color='secondary'
          variant='h4'
          className={classes.title}
        >
          Visual Delusions
        </NeonTypography>
        <Button component={Link} to='/' color='inherit'>
          Home
        </Button>
        <Button component={Link} to='/shop' color='inherit'>
          Shop
        </Button>
        <Button component={Link} to='/about' color='inherit'>
          About
        </Button>
        <Button component={Link} to='/faq' color='inherit'>
          FAQ
        </Button>
        <Button component={Link} to='/contact' color='inherit'>
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
