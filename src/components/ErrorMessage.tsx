import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

const ErrorMessage = (props: TypographyProps) => (
  <Typography
    paragraph
    maxWidth={400}
    margin="auto"
    variant="caption"
    align="center"
    {...props}
  />
);

export default ErrorMessage;
