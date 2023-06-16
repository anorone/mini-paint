import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

interface Props {
  size?: 'small' | 'large';
}

const fontSizes = {
  small: '24px',
  large: { xs: null, sm: '9rem' },
};

const Logo = <L extends React.ElementType>(
  props: Props & TypographyProps<L, { component?: L }>
) => {
  const { size = 'small' } = props;
  return (
    <Typography
      color="inherit"
      fontWeight="bold"
      fontSize={fontSizes[size]}
      fontStyle="italic"
      letterSpacing="-0.0375em"
      sx={{ textDecoration: 'none' }}
      {...props}
    >
      Paintter
    </Typography>
  );
};

export default Logo;
