import { StylesConfigsInterface } from './stylesConfig.types';

export interface DataReceiver {
  startY: number;
  body: string[][];
  head: string[][];
}

export interface PrinterProps {
  name: string;
  state: State;
}

export type State = StylesConfigsInterface & DataReceiver;
