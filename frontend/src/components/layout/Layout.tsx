import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './Header';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'grey.50',
      }}
    >
      <Header />
      <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;