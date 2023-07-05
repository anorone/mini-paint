import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Anchor from '@mui/material/Link';
import ErrorIcon from '@mui/icons-material/ErrorTwoTone';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { loadData } from '../slices/dataSlice';
import {
  Header,
  Main,
  Logo,
  FilterForm,
  FeedList,
  ErrorMessage,
} from '../components';
import { routes } from '../routes';

const DRAWINGS_PER_PAGE = 6;

const FeedPage = () => {
  const users = useTypedSelector((state) => state.data.users);
  const drawings = useTypedSelector((state) => state.data.drawings);
  const requestStatus = useTypedSelector((state) => state.data.requestStatus);
  const [searchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const getUserDrawings = (userId: string) => {
    const coll = users[userId]?.drawings ?? {};
    const drawingIds = Object.keys(coll);
    return drawingIds.map((drawingId) => drawings[drawingId]);
  };

  const getAllDrawings = () => Object.values(drawings);

  const filterId = searchParams.get('filterId');

  const filteredDrawings = filterId
    ? getUserDrawings(filterId)
    : getAllDrawings();

  const filterOptions = Object.values(users).map(
    ({ id, firstName, lastName }) => ({ id, label: `${firstName} ${lastName}` })
  );

  const pagesCount = Math.ceil(filteredDrawings.length / DRAWINGS_PER_PAGE);
  const currentPageIndex = Number(searchParams.get('page') ?? '1') - 1;

  return (
    <>
      <Header>
        <Logo component={Link} to="/" mr={6} />
        <FilterForm options={filterOptions} />
      </Header>
      <Main py={9}>
        {requestStatus === 'failed' ? (
          <ErrorMessage sx={{ maxWidth: 300 }} icon={ErrorIcon}>
            No data available. This could happen if loading data from the server
            failed. Try to{' '}
            <Anchor
              component={Link}
              to={routes.feed({ filterId, page: currentPageIndex })}
              color="secondary"
              onClick={() => dispatch(loadData())}
            >
              reload this page.
            </Anchor>
          </ErrorMessage>
        ) : (
          <FeedList
            drawings={filteredDrawings}
            users={users}
            pageSize={DRAWINGS_PER_PAGE}
            currentPage={currentPageIndex}
            loading={requestStatus === 'loading'}
          />
        )}

        {filteredDrawings.length > DRAWINGS_PER_PAGE && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pagesCount}
              page={currentPageIndex + 1}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={routes.feed({ filterId, page: item.page })}
                  {...item}
                />
              )}
            />
          </Box>
        )}
      </Main>
    </>
  );
};

export default FeedPage;
