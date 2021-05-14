import { App } from './app';
const $root = document.getElementById('root');
if ($root) {
    const app = new App({ root: $root });
    console.log(app);
}