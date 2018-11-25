import * as htmlConverter from './HtmlToElementConverter.js';

export function startLoading(loaderId) {
    let element = document.getElementById(loaderId);
    element.innerHTML = '';
    element.setAttribute('class', 'loaderElement');
    element.appendChild(htmlConverter.htmlToElement('<div class="loader"></div>'));
}

export function stopLoading(loaderId) {
    let element = document.getElementById(loaderId);
    element.innerHTML = '';
    element.setAttribute('class', '');
}