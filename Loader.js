import * as htmlConverter from './HtmlToElementConverter.js';

export function loadElement(elementId) {
    let element = document.getElementById(elementId);
    element.innerHTML = '';
    element.appendChild(htmlConverter.htmlToElement('<div class="loader"></div>'));
}