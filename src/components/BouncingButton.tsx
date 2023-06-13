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
  animation: 'bounce 3s ease-out infinite',
};

const BouncingButton = <L extends React.ElementType>(
  props: ButtonProps<L, { component: L }>
) => <Button sx={cssAnimation} {...props} />;

export default BouncingButton;
