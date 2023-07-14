import { useState, useEffect } from 'react';
import { Link, Form, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { saveDrawing, resetRequestStatus } from '../slices/dataSlice';
import { Header, Main, Logo, Editor, Footer, Message } from '../components';
import { routes } from './';
import type { SubmitHandler } from 'react-hook-form';

interface Inputs {
  name: string;
}

const EditorPage = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const user = useTypedSelector((state) => state.auth.user);
  const editor = useTypedSelector((state) => state.editor);
  const requestStatus = useTypedSelector((state) => state.data.requestStatus);
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (matchMedia('(max-width: 700px)').matches) {
      setIsMobileDevice(true);
    }
  }, []);

  useEffect(
    (): (() => void) => () => dispatch(resetRequestStatus()),
    [dispatch]
  );

  const onSubmit: SubmitHandler<Inputs> = (inputs) => {
    const drawing = {
      name: inputs.name || 'My drawing',
      dataUrl: editor.image,
      authorId: user!.uid.slice(-4),
    };
    dispatch(saveDrawing(drawing));
  };

  return requestStatus === 'succeeded' ? (
    <Navigate to={routes.feed()} />
  ) : (
    <>
      <Header>
        <Logo component={Link} to="/" />
      </Header>
      <Main pb={6}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              alignItems: 'center',
              gap: { xs: 2, sm: 3 },
              py: 1,
            }}
          >
            <TextField
              {...register('name')}
              label="Name"
              id="name"
              defaultValue="My drawing"
              variant="filled"
              size="small"
              disabled={isMobileDevice}
              fullWidth
              error={requestStatus === 'failed'}
            />
            <Tooltip
              title="You won't be able to edit the drawing anymore."
              arrow
            >
              <Button
                sx={{ minWidth: { xs: 1, sm: 160 } }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isMobileDevice}
              >
                {requestStatus === 'loading' ? 'Saving...' : 'Save & Quit'}
              </Button>
            </Tooltip>
          </Box>
          {requestStatus === 'failed' && (
            <Message sx={{ mb: 1 }} variant="caption">
              Something went wrong. Try again.
            </Message>
          )}
        </Form>

        <Divider sx={{ mb: 2 }} />

        {isMobileDevice ? (
          <Message icon={InfoOutlined}>
            The editor is better used on larger screens. Please use the desktop
            version of the application.
          </Message>
        ) : (
          <Editor />
        )}
      </Main>

      <Divider variant="middle" />

      <Footer />
    </>
  );
};

export default EditorPage;
