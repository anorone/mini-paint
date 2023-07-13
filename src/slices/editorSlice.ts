import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Thunk } from './';

type Tool = 'brush' | Shape | 'line';

type Shape = 'circle' | 'rectangle';

interface Coordinates {
  x: number;
  y: number;
}

interface Editor {
  tool: Tool;
  toolSize: number;
  toolColor: string;
  isButtonPressed: boolean;
  coordinates: Coordinates | null;
  clickCoordinates: Coordinates | null;
  image: string;
}

type DrawerFunction = (ctx: CanvasRenderingContext2D, editor: Editor) => void;

const initialState: Editor = {
  tool: 'brush',
  toolSize: 10,
  toolColor: '#000000',
  isButtonPressed: false,
  coordinates: null,
  clickCoordinates: null,
  image: '',
};

const CANVAS_SIZE = 650;
const CANVAS_BGCOLOR = '#eeeeee';

const convertToRadians = (degrees: number) => (degrees * Math.PI) / 180;

const restoreImage: DrawerFunction = (ctx, editor) => {
  const image = editor.image;
  const imageElement = new Image();
  imageElement.src = image;
  ctx.drawImage(imageElement, 0, 0);
};

const drawStripe: DrawerFunction = (ctx, editor) => {
  const { x, y } = editor.coordinates!;
  ctx.beginPath();
  ctx.arc(x, y, editor.toolSize, convertToRadians(0), convertToRadians(360));
  ctx.fill();
};

const drawRect: DrawerFunction = (ctx, editor) => {
  restoreImage(ctx, editor);
  const { x: clickX, y: clickY } = editor.clickCoordinates!;
  const { x, y } = editor.coordinates!;
  ctx.strokeRect(clickX, clickY, x - clickX, y - clickY);
};

const drawCircle: DrawerFunction = (ctx, editor) => {
  restoreImage(ctx, editor);
  const { x: clickX, y: clickY } = editor.clickCoordinates!;
  const { x, y } = editor.coordinates!;
  const diffX = x - clickX;
  const diffY = y - clickY;
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  ctx.beginPath();
  ctx.arc(x, y, distance, convertToRadians(0), convertToRadians(360));
  ctx.stroke();
};

const drawLine: DrawerFunction = (ctx, editor) => {
  restoreImage(ctx, editor);
  const { x: clickX, y: clickY } = editor.clickCoordinates!;
  const { x, y } = editor.coordinates!;
  ctx.beginPath();
  ctx.moveTo(clickX, clickY);
  ctx.lineTo(x, y);
  ctx.stroke();
};

const map: Record<Tool, DrawerFunction> = {
  brush: drawStripe,
  rectangle: drawRect,
  circle: drawCircle,
  line: drawLine,
};

const initEditor =
  (canvas: HTMLCanvasElement): Thunk =>
  (dispatch, getState) => {
    dispatch(resetEditor());

    const width = CANVAS_SIZE;
    const height = width;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = CANVAS_BGCOLOR;
    ctx.fillRect(0, 0, width, height);

    dispatch(updateEditor({ image: canvas.toDataURL() }));

    const loop = () => {
      const { editor } = getState();
      if (editor.isButtonPressed) {
        ctx.fillStyle = editor.toolColor;
        ctx.strokeStyle = editor.toolColor;
        ctx.lineWidth = editor.toolSize;
        map[editor.tool](ctx, editor);
      }
      requestAnimationFrame(loop);
    };

    loop();
  };

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateEditor: (editor, action: PayloadAction<Partial<Editor>>) => {
      Object.assign(editor, action.payload);
    },
    resetEditor: (editor) => {
      Object.assign(editor, initialState);
    },
  },
});

export const { updateEditor, resetEditor } = editorSlice.actions;
export { initEditor };
export default editorSlice.reducer;
