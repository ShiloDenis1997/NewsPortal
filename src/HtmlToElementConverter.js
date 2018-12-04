export function htmlToElement(html) {
    let template = document.createElement('div'); // replace to 'template' and add IE support
    template.innerHTML = html;
    return template.firstElementChild;
}