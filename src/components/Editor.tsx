import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Divider from '@mui/material/Divider';
import BrushIcon from '@mui/icons-material/Brush';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/SquareOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useTypedSelector, useTypedDispatch } from '../hooks';
import { initEditor, updateEditor } from '../slices/editorSlice';

const Editor = () => {
  const editor = useTypedSelector((state) => state.editor);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useTypedDispatch();

  useEffect(() => dispatch(initEditor(canvasRef.current!)), [dispatch]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    dispatch(
      updateEditor({
        isButtonPressed: true,
        clickCoordinates: { x, y },
        coordinates: { x, y },
        image: canvasRef.current!.toDataURL(),
      })
    );
  };

  const handleMouseUp = () => {
    dispatch(
      updateEditor({
        isButtonPressed: false,
        clickCoordinates: null,
        coordinates: null,
      })
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (editor.isButtonPressed) {
      const x = e.pageX - e.currentTarget.offsetLeft;
      const y = e.pageY - e.currentTarget.offsetTop;
      dispatch(updateEditor({ coordinates: { x, y } }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <ToggleButtonGroup
          value={editor.tool}
          onChange={(_, value) => dispatch(updateEditor({ tool: value }))}
          size="small"
          exclusive
        >
          <ToggleButton value="brush">
            <BrushIcon />
          </ToggleButton>
          <ToggleButton value="line">
            <HorizontalRuleIcon />
          </ToggleButton>
          <ToggleButton value="circle">
            <CircleIcon />
          </ToggleButton>
          <ToggleButton value="rectangle">
            <SquareIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

        <TextField
          sx={{ minWidth: 45 }}
          type="color"
          value={editor.toolColor}
          onChange={(e) =>
            dispatch(updateEditor({ toolColor: e.target.value }))
          }
          color="secondary"
          size="small"
        />

        <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

        <Slider
          sx={{ minWidth: 100 }}
          min={1}
          max={50}
          value={editor.toolSize}
          onChange={(_, value) =>
            dispatch(updateEditor({ toolSize: value as number }))
          }
          valueLabelDisplay="auto"
          color="secondary"
        />
      </Box>

      <Paper
        component="canvas"
        ref={canvasRef}
        elevation={1}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </Box>
  );
};

export default Editor;
