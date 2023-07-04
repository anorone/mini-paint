import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import type { GridProps } from '@mui/material/Grid';
import type { Drawing } from '../api/drawings';
import type { Users } from '../api/users';

type DrawingItemProps = GridProps & {
  data: Drawing;
  users: Users;
};

const fallbackImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

const DrawingList = (props: GridProps) => (
  <>
    <Grid {...props} container spacing={3}>
      {props.children}
    </Grid>
  </>
);

const DrawingItem = (props: DrawingItemProps) => {
  const { authorId, dataUrl, timestamp } = props.data;
  const { users } = props;
  const author = users[authorId];

  return (
    <Grid {...props} item xs={12} sm={6} md={4}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <CardHeader
          sx={{ flexGrow: 1, alignItems: 'flex-start' }}
          title={`${author.firstName} ${author.lastName}`}
          subheader={new Date(timestamp).toLocaleDateString()}
        />
        <CardMedia component="img" image={dataUrl || fallbackImage} />
      </Card>
    </Grid>
  );
};

const DrawingPlaceholder = (props: GridProps) => (
  <Grid {...props} item xs={12} sm={6} md={4}>
    <Card>
      <CardHeader
        title={<Skeleton animation="wave" />}
        subheader={<Skeleton animation="wave" />}
      />
      <Skeleton variant="rectangular" animation="wave" width="100%">
        <div style={{ paddingTop: '100%' }} />
      </Skeleton>
    </Card>
  </Grid>
);

const Drawings = () => {};

Drawings.List = DrawingList;
Drawings.Item = DrawingItem;
Drawings.Placeholder = DrawingPlaceholder;

export default Drawings;
