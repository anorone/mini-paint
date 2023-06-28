import { useSelector, useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import useColorTheme from './useColorTheme';
import type { State, Dispatch } from '../slices';

const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
const useTypedDispatch: () => Dispatch = useDispatch;

export { useTypedSelector, useTypedDispatch, useColorTheme };
