import { useState, useEffect } from 'react';
import { Link, Form } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Header, Main, Logo, Editor, Footer, Message } from '../components';

const EditorPage = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    if (matchMedia('(max-width: 700px)').matches) {
      setIsMobileDevice(true);
    }
  }, []);

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
        >
          <TextField
            label="Name"
            defaultValue="New drawing"
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

        <Divider sx={{ mb: 4 }} />

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
