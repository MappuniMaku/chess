import { App } from './classes/App';
const $root = document.getElementById('root');
if ($root) {
    const app = new App({ root: $root });
    console.log(app);
}