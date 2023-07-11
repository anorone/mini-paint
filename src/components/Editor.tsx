import { useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';

const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const width = 650;
    const height = width;

    canvas.width = width;
    canvas.height = height;
  }, []);

  return (
    <Paper
      sx={{ display: 'block', m: 'auto', bgcolor: '#eee' }}
      component="canvas"
      ref={canvasRef}
      elevation={1}
    />
  );
};

export default Editor;
