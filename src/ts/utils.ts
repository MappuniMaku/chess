export function createElement(tag: string, className = ''): HTMLElement {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    return el;
}

export function createDiv(className = ''): HTMLElement {
    return createElement('div', className);
}