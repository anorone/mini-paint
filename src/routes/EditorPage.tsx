import { useState, useEffect } from 'react';
import { Link, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { saveDrawing } from '../slices/dataSlice';
import { Header, Main, Logo, Editor, Footer, Message } from '../components';
import type { SubmitHandler } from 'react-hook-form';

interface Inputs {
  name: string;
}

const EditorPage = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const user = useTypedSelector((state) => state.auth.user);
  const editor = useTypedSelector((state) => state.editor);
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (matchMedia('(max-width: 700px)').matches) {
      setIsMobileDevice(true);
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (inputs) => {
    const drawing = {
      name: inputs.name || 'My drawing',
      dataUrl: editor.image,
      authorId: user!.uid.slice(-4),
    };
    dispatch(saveDrawing(drawing));
  };

  return (
    <>
      <Header>
        <Logo component={Link} to="/" />
      </Header>
      <Main pb={6}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            py: 2,
          }}
          component={Form}
          onSubmit={handleSubmit(onSubmit)}
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
          />
          <Tooltip title="You won't be able to edit the drawing anymore." arrow>
            <Button
              sx={{ minWidth: { xs: 1, sm: 160 } }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isMobileDevice}
            >
              Save & Quit
            </Button>
          </Tooltip>
        </Box>

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
