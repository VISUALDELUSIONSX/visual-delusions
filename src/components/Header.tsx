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
} from '@material-ui/core';
import NeonTypography from './NeonTypography';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
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
  const headerRef = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

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
          >
            Visual Delusions
          </NeonTypography>

          {mdUp ? (
            menuItems.map((item) => (
              <Button
                component={Link}
                to={item.href}
                color='inherit'
                style={{ marginLeft: '0.5rem' }}
                size='large'
              >
                {item.label}
              </Button>
            ))
          ) : (
            <IconButton onClick={handleDrawerToggle} color='inherit'>
              <MenuIcon />
            </IconButton>
          )}
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
          </List>
        </Drawer>
      )}
    </div>
  );
};

export default Header;
