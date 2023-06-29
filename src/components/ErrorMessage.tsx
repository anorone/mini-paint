import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

const ErrorMessage = (props: TypographyProps) => (
  <Typography paragraph variant="caption" align="center" {...props} />
);

export default ErrorMessage;
