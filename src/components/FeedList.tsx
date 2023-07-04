import isEmpty from 'lodash/isEmpty';
import { Drawings } from './';
import type { Drawing } from '../api/drawings';
import type { Users } from '../api/users';

interface Props {
  drawings: Drawing[];
  users: Users;
  pageSize: number;
  currentPage: number;
  loading: boolean;
}

const FeedList = (props: Props) => {
  const { loading, drawings, users, pageSize, currentPage } = props;

  return (
    <Drawings.List>
      {loading && (isEmpty(drawings) || isEmpty(users))
        ? Array.from({ length: pageSize }, (_, i) => (
            <Drawings.Placeholder key={i} />
          ))
        : drawings
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((drawing) => (
              <Drawings.Item data={drawing} users={users} key={drawing.id} />
            ))}
    </Drawings.List>
  );
};

export default FeedList;
