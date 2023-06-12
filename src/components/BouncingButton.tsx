import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

const cssAnimation = {
  '@keyframes bounce': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.15)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  animation: 'bounce 3.5s ease-out infinite',
};

const BouncingButton = (props: ButtonProps) => (
  <Button sx={cssAnimation} {...props}>
    {props.children}
  </Button>
);

export default BouncingButton;
