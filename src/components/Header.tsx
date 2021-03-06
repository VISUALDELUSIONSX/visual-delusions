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
  Badge,
  Grid,
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
import { ShoppingCart } from '@material-ui/icons';
import getNumOfItemsInCart from '../utils/getNumOfItemsInCart';
import RichTooltip from './RichTooltip';
import CartTooltipContent from './CartTooltipContent';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { closeAddedToCart } from '../store/cartSlice';
import Instagram from '@material-ui/icons/Instagram';
import { HashLink } from 'react-router-hash-link';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: '400ms',
    background: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.pink.main}`,
    boxShadow: `0px 5px 5px ${alpha(theme.palette.pink.main, 0.2)}`,
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
  iconButton: {
    transition: '200ms',
    '&:hover': {
      color: theme.palette.pink.main,
    },
  },
  badge: {
    background: theme.palette.pink.main,
  },
  button: {
    transition: '200ms',
    position: 'relative',
    fontWeight: 'bold',

    '&::after': {
      content: '""',
      height: '3px',
      width: '100%',
      background: theme.palette.pink.main,
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
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/#contact' },
];

const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const { signOut } = useAuth();
  const { loaded, user } = useAppSelector((state) => state.auth);
  const openAddedToCart = useAppSelector((state) => state.cart.openAddedToCart);
  const cartItems = useAppSelector((state) => state.cart.items);
  const numOfItemsInCart = getNumOfItemsInCart(cartItems);

  const headingBPOne = useMediaQuery('(max-width:500px)');
  const headingBPTwo = useMediaQuery('(max-width:440px)');

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

  const CartButton = () => (
    <RichTooltip
      open={openAddedToCart}
      placement='bottom'
      content={<CartTooltipContent />}
      backgroundColor='#333'
      PopperProps={{
        style: {
          boxShadow: `0px 0px 20px ${alpha(theme.palette.primary.main, 0.8)}`,
        },
      }}
    >
      <IconButton
        component={Link}
        to='/cart'
        size={headingBPTwo ? 'small' : 'medium'}
        color='inherit'
        className={classes.iconButton}
        onClick={() => dispatch(closeAddedToCart())}
      >
        <Badge
          badgeContent={numOfItemsInCart}
          color='primary'
          classes={{ badge: classes.badge }}
        >
          <ShoppingCart fontSize='medium' />
        </Badge>
      </IconButton>
    </RichTooltip>
  );

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
            color={theme.palette.pink.main}
            variant='h4'
            style={{
              fontSize: headingBPTwo ? 20 : headingBPOne ? 27 : undefined,
            }}
            className={classes.title}
            component={Link}
            to='/'
          >
            Visual Delusions
          </NeonTypography>

          <IconButton
            component='a'
            href='https://www.instagram.com/visualdelusionsx/'
            size={headingBPTwo ? 'small' : 'medium'}
            color='inherit'
            target='_blank'
            className={classes.iconButton}
          >
            <Instagram fontSize='medium' />
          </IconButton>

          <div style={{ marginLeft: 'auto' }}>
            {mdUp ? (
              <>
                {menuItems.map((item) => (
                  <Button
                    component={item.href.includes('#') ? HashLink : Link}
                    smooth
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
                <CartButton />
              </>
            ) : (
              <Grid container direction='row' wrap='nowrap'>
                <CartButton />

                <IconButton
                  onClick={handleDrawerToggle}
                  color='inherit'
                  className={classes.iconButton}
                  size={headingBPTwo ? 'small' : 'medium'}
                >
                  <MenuIcon fontSize='medium' />
                </IconButton>
              </Grid>
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
                component={item.href.includes('#') ? HashLink : Link}
                smooth
                to={item.href}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={signOut}>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
      )}
    </div>
  );
};

export default Header;

