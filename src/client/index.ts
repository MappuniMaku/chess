import './main.scss';
import { App } from './classes/App';

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');

  if ($root !== null) {
    new App($root as HTMLDivElement);
  }
});
