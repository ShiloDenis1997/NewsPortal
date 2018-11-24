export function htmlToElement(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}