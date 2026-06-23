import * as React from 'react';
import { NavLink, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.mitre.org/">
        The MITRE Corporation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.text.gray,
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const getRoutePath = (route) => {
  if (route.path === '/') return null;
  if (route.path === '/*') return '*';
  return route.path.replace(/^\//, '');
};

const createRouter = (routes) =>
  createHashRouter([
    {
      path: '/',
      element: <LayoutShell routes={routes} />,
      children: routes.map((route) => {
        const path = getRoutePath(route);

        if (path == null) {
          return {
            index: true,
            element: route.element,
          };
        }

        return {
          path,
          element: route.element,
        };
      }),
    },
  ]);

function LayoutShell({ routes }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            fontSize="large"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h5" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Synthea Toolkit
          </Typography>
          <IconButton href="https://github.com/synthetichealth/spt" color="inherit">
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon fontSize="large" color="primary" />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {routes
            .filter((route) => !!route.label)
            .map((route) => {
              return (
                <ListItemButton
                  component={NavLink}
                  to={route.path}
                  key={route.path}
                  sx={{ '&.active': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
                >
                  <ListItemIcon>
                    {route.icon || <DashboardIcon color="primary" fontSize="large" />}
                  </ListItemIcon>
                  <ListItemText primary={route.label} sx={{ fontWeight: 'bold', color: 'white' }} />
                </ListItemButton>
              );
            })}
          <Divider sx={{ my: 1 }} />
          {/* TODO: add dividers within in nav list */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4, width: '100%' }} maxWidth={false}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
              textAlign: 'center',
              '& > *': {
                maxWidth: '100%',
              },
            }}
          >
            <Outlet />
          </Box>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

const routePropType = PropTypes.shape({
  path: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  element: PropTypes.element.isRequired,
  icon: PropTypes.element,
});

LayoutShell.propTypes = {
  routes: PropTypes.arrayOf(routePropType).isRequired,
};

export default function Layout({ routes }) {
  const hashRouter = React.useMemo(() => createRouter(routes), [routes]);

  return <RouterProvider router={hashRouter} />;
}

Layout.propTypes = {
  routes: PropTypes.arrayOf(routePropType).isRequired,
};
