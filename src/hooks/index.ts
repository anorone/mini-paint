import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import useColorTheme from './useColorTheme';
import type { State } from '../slices';

const useTypedSelector: TypedUseSelectorHook<State> = useSelector;

export { useTypedSelector, useColorTheme };
