import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Anchor from '@mui/material/Link';
import ErrorIcon from '@mui/icons-material/ErrorTwoTone';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { loadData } from '../slices/dataSlice';
import { Header, Main, Logo, FeedList, ErrorMessage } from '../components';
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

  const pagesCount = Math.ceil(drawings.length / DRAWINGS_PER_PAGE);

  const currentPageIndex = Number(searchParams.get('page') ?? '1') - 1;

  return (
    <>
      <Header>
        <Logo component={Link} to="/" />
      </Header>
      <Main py={9}>
        {requestStatus === 'failed' ? (
          <ErrorMessage sx={{ maxWidth: 300 }} icon={ErrorIcon}>
            No data available. This could happen if loading data from the server
            failed. Try to{' '}
            <Anchor
              component={Link}
              to={routes.feed(currentPageIndex)}
              color="secondary"
              onClick={() => dispatch(loadData())}
            >
              reload this page.
            </Anchor>
          </ErrorMessage>
        ) : (
          <FeedList
            drawings={drawings}
            users={users}
            pageSize={DRAWINGS_PER_PAGE}
            currentPage={currentPageIndex}
            loading={requestStatus === 'loading'}
          />
        )}

        {drawings.length > DRAWINGS_PER_PAGE && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pagesCount}
              page={currentPageIndex + 1}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={routes.feed(item.page)}
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
