import {TopicsNavigationComponent} from './TopicsNavigationComponent.js';
import * as htmlConverter from './HtmlToElementConverter.js';

var topicsComponent;

window.addEventListener('load', initLoad);

function initLoad() {
    topicsComponent = new TopicsNavigationComponent('topicsList', displayNews);
    topicsComponent.initializeTopics();
    topicsComponent.setActiveTopic('Business');
    displayNews(topicsComponent.ActiveTopic);
    console.log('inited');
}

function loadElement(elementId) {
    let element = document.getElementById(elementId);
    element.innerHTML = '';
    element.appendChild(htmlConverter.htmlToElement('<div class="loader"></div>'));
}

function displayNews(topicName) {
    loadElement('newsList');
    loadNews(topicName).then(news => {
        let articles = news.articles;
        let articlesList = document.getElementById('newsList');
        articlesList.innerHTML = '';
        for (let i in articles) {
            let article = articles[i];
            let card = htmlConverter.htmlToElement(`
                    <div class="card news-item">
                        <div class="card-header">
                            <h5>${article.title}</h5>
                        </div>
                        <div class="card-body">
                            ${article.content} 
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-info float-right">Read more</button>
                        </div>
                    </div>`);
            articlesList.appendChild(card);
        }
    }).catch(error => console.log(error));
}

var apiKey = 'ad1f839e3b024bf89bbe346e478fd085';

function loadNews(topicName, page=1, pageSize=10) {
    let url = `https://newsapi.org/v2/everything?q=${topicName}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    return fetch(url)
        .then(r => r.json())
        .catch(reason => console.error(reason));
}