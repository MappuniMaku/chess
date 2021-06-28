import { App } from './classes/App';

document.addEventListener('DOMContentLoaded', () => {
    const $root = document.getElementById('root');

    if ($root !== null) {
        const app = new App($root);
    }
});
