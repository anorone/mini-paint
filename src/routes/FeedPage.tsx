import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Anchor from '@mui/material/Link';
import ErrorIcon from '@mui/icons-material/ErrorTwoTone';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { loadData } from '../slices/dataSlice';
import { Header, Main, Logo, Drawings, ErrorMessage } from '../components';
import { routes } from '../routes';

const DRAWINGS_PER_PAGE = 6;

const FeedPage = () => {
  const users = useTypedSelector((state) => state.data.users);
  const drawings = useTypedSelector((state) => state.data.drawings);
  const requestStatus = useTypedSelector((state) => state.data.requestStatus);
  const dispatch = useTypedDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const pagesCount = Math.ceil(drawings.length / DRAWINGS_PER_PAGE);

  const searchParams = new URLSearchParams(location.search);
  const currentPageIndex = Number(searchParams.get('page') ?? '1') - 1;

  return (
    <>
      <Header>
        <Logo component={Link} to="/" />
      </Header>
      <Main py={9}>
        {requestStatus === 'failed' ? (
          <ErrorMessage sx={{ maxWidth: 300 }} variant="body1">
            <ErrorIcon
              sx={{ display: 'block', m: 'auto', mb: 3, fontSize: 64 }}
              color="secondary"
            />
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
          <Drawings.List>
            {requestStatus === 'loading' &&
            (isEmpty(drawings) || isEmpty(users))
              ? Array.from({ length: DRAWINGS_PER_PAGE }, (_, i) => (
                  <Drawings.Placeholder key={i} />
                ))
              : drawings
                  .slice(
                    currentPageIndex * DRAWINGS_PER_PAGE,
                    (currentPageIndex + 1) * DRAWINGS_PER_PAGE
                  )
                  .map((drawing) => (
                    <Drawings.Item
                      data={drawing}
                      users={users}
                      key={drawing.id}
                    />
                  ))}
          </Drawings.List>
        )}

        {drawings.length !== 0 && (
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
