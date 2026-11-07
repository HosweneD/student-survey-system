import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <HowToVoteIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Система опросов
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {user.fullName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;