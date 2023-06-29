import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { logOut } from '../slices/authSlice';
import type { ButtonProps } from '@mui/material/Button';

const LogoutButton = (props: ButtonProps) => {
  const requestStatus = useTypedSelector((state) => state.auth.requestStatus);
  const dispatch = useTypedDispatch();

  return (
    <Button
      variant="outlined"
      color="inherit"
      {...props}
      onClick={() => dispatch(logOut())}
    >
      {requestStatus === 'loading' ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        'Log Out'
      )}
    </Button>
  );
};

export default LogoutButton;
