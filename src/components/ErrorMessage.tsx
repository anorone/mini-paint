import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import type { TypographyProps } from '@mui/material/Typography';

type Props = TypographyProps & {
  icon?: React.ComponentType;
};

const ErrorMessage = (props: Props) => (
  <Typography
    paragraph
    maxWidth={400}
    margin="auto"
    variant="body1"
    align="center"
    {...props}
  >
    {props.icon && (
      <SvgIcon
        sx={{ display: 'block', m: 'auto', mb: 3, fontSize: 64 }}
        component={props.icon}
        color="secondary"
      />
    )}
    {props.children}
  </Typography>
);

export default ErrorMessage;
