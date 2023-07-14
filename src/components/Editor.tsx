import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import BrushIcon from '@mui/icons-material/Brush';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/SquareOutlined';
import CleaningIcon from '@mui/icons-material/CleaningServices';
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
      })
    );
  };

  const handleMouseUp = () => {
    dispatch(
      updateEditor({
        isButtonPressed: false,
        clickCoordinates: null,
        coordinates: null,
        image: canvasRef.current!.toDataURL(),
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
          <ToggleButton value="eraser">
            <CleaningIcon />
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

        <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

        <Button
          sx={{ minWidth: 90 }}
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(initEditor(canvasRef.current!))}
        >
          Reset
        </Button>
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
