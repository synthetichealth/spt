import * as React from 'react';
import { NavLink, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import Tooltip from '@mui/material/Tooltip';

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
const collapsedDrawerWidth = 72;

const getDesktopDrawerWidth = (open) => (open ? drawerWidth : collapsedDrawerWidth);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isDesktop',
})(({ theme, open, isDesktop }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDesktop && {
    marginLeft: getDesktopDrawerWidth(open),
    width: `calc(100% - ${getDesktopDrawerWidth(open)}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isDesktop',
})(({ theme, open, isDesktop }) => ({
  ...(isDesktop && {
    width: getDesktopDrawerWidth(open),
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
  }),
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.gray,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: isDesktop ? getDesktopDrawerWidth(open) : drawerWidth,
    maxWidth: isDesktop ? drawerWidth : '85vw',
    transition: theme.transitions.create(['width', 'max-width'], {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
    ...(isDesktop && {
      height: '100vh',
    }),
  },
}));

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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} isDesktop={isDesktop}>
        <Toolbar
          sx={{
            pr: { xs: 1, sm: 3 }, // keep right padding when drawer closed
            minWidth: 0,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            fontSize="large"
            sx={{
              mr: { xs: 1, sm: 4 },
              ...(isDesktop && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h5"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, minWidth: 0, fontSize: { xs: '1.05rem', sm: '1.5rem' } }}
          >
            Synthea Toolkit
          </Typography>
          <IconButton href="https://github.com/synthetichealth/spt" color="inherit">
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={open}
        isDesktop={isDesktop}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            px: [1],
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            aria-label={open ? 'collapse sidebar' : 'expand sidebar'}
          >
            {open ? (
              <ChevronLeftIcon fontSize="large" color="primary" />
            ) : (
              <MenuIcon fontSize="large" color="primary" />
            )}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {routes
            .filter((route) => !!route.label)
            .map((route) => {
              const isCollapsed = isDesktop && !open;
              const navItem = (
                <ListItemButton
                  component={NavLink}
                  to={route.path}
                  onClick={() => {
                    if (!isDesktop) setOpen(false);
                  }}
                  aria-label={isCollapsed ? route.label : undefined}
                  sx={{
                    minHeight: 48,
                    justifyContent: isCollapsed ? 'center' : 'initial',
                    px: isCollapsed ? 0 : 2.5,
                    '&.active': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: isCollapsed ? 0 : 48,
                      justifyContent: 'center',
                    }}
                  >
                    {route.icon || <DashboardIcon color="primary" fontSize="large" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                    sx={{
                      color: 'white',
                      display: isCollapsed ? 'none' : 'block',
                      minWidth: 0,
                      overflow: 'hidden',
                      '& .MuiListItemText-primary': {
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </ListItemButton>
              );

              return (
                <Tooltip
                  title={isCollapsed ? route.label : ''}
                  placement="right"
                  arrow
                  key={route.path}
                >
                  {navItem}
                </Tooltip>
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
          minWidth: 0,
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container
          sx={{
            mt: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            maxWidth: '100%',
          }}
          maxWidth={false}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
              textAlign: 'center',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
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
