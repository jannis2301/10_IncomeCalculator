import { Calculator } from './Calculator';
import { getElementBySelector } from './utils';

const bootstrap = () =>
  new Calculator(getElementBySelector<HTMLElement>('[data-calculator]'));

document.addEventListener('DOMContentLoaded', bootstrap);
