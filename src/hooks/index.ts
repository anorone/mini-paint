import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import type { State } from '../slices';

const useTypedSelector: TypedUseSelectorHook<State> = useSelector;

export { useTypedSelector };
