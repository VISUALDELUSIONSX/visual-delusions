import {
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
} from '@material-ui/core';
import NeonTypography from './NeonTypography';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuth } from 'react-redux-firebase-auth';
// import { displaySignInDialog } from '../store/authSlice';
// import { useAppDispatch } from '../hooks/useAppDispatch';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: '400ms',
    background: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    boxShadow: `0px 5px 5px ${alpha(theme.palette.secondary.main, 0.2)}`,
  },
  rootAnimate: {
    transform: 'translateY(-100%)',
  },
  title: {
    textDecoration: 'none',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  button: {
    transition: '200ms',
    position: 'relative',
    fontWeight: 'bold',

    '&::after': {
      content: '""',
      height: '3px',
      width: '100%',
      background: theme.palette.secondary.main,
      position: 'absolute',
      bottom: '0',
      left: '0',
      transform: 'scale(0, 1)',
      transformOrigin: 'center',
      transition: '200ms',
    },

    '&:hover': {
      '&::after': {
        transform: 'scale(1, 1)',
      },
    },
  },
}));

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const classes = useStyles();
  // const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const { loaded, user } = useAppSelector((state) => state.auth);
  const { signOut } = useAuth();

  useEffect(() => {
    /* Header animates on mount */
    const header = headerRef.current!;
    header.classList.remove(classes.rootAnimate);

    /* Puts main into view from under header */
    const main = document.querySelector('main')!;
    const headerHeight = header.getBoundingClientRect().height + 'px';
    main.style.paddingTop = headerHeight;

    //eslint-disable-next-line
  }, []);

  return (
    <div>
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
            component={Link}
            to='/'
          >
            Visual Delusions
          </NeonTypography>

          <div style={{ marginLeft: 'auto' }}>
            {mdUp ? (
              <>
                {menuItems.map((item) => (
                  <Button
                    component={Link}
                    to={item.href}
                    color='inherit'
                    className={classes.button}
                    style={{ marginLeft: '0.5rem', height: 70 }}
                    size='large'
                    key={item.href}
                  >
                    {item.label}
                  </Button>
                ))}
                {loaded && user && (
                  <Button
                    onClick={signOut}
                    style={{
                      marginLeft: '0.5rem',
                      background: 'darkred',
                      color: 'white',
                    }}
                    size='large'
                    variant='contained'
                  >
                    Logout
                  </Button>
                )}
                {/* <Button
                onClick={() => dispatch(displaySignInDialog())}
                color='inherit'
                style={{ marginLeft: '0.5rem' }}
                size='large'
              >
                Login
              </Button> */}
              </>
            ) : (
              <IconButton onClick={handleDrawerToggle} color='inherit'>
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {!mdUp && (
        <Drawer
          onClose={handleDrawerToggle}
          className={classes.drawer}
          variant='temporary'
          anchor='left'
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerToggle} color='inherit'>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.href}
                component={Link}
                to={item.href}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={signOut}>
              <ListItemText primary='Logout' />
            </ListItem>
            {/* <ListItem
              button
              onClick={() => {
                dispatch(displaySignInDialog());
                handleDrawerToggle();
              }}
            >
              <ListItemText primary='Login' />
            </ListItem> */}
          </List>
        </Drawer>
      )}
    </div>
  );
};

export default Header;

