import { TopicsNavigationComponent } from './TopicsNavigationComponent.js';
import { NewsService } from './NewsService.js';
import * as loader from './Loader.js';
import * as htmlConverter from './HtmlToElementConverter.js';

var topics = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
var topicsComponent = new TopicsNavigationComponent('topicsList', topics, displayNews);
var newsService = new NewsService();

window.addEventListener('load', initLoad);

function initLoad() {
    topicsComponent.initializeTopics();
    topicsComponent.setActiveTopic('Business');
    displayNews(topicsComponent.ActiveTopic);
}

function displayNews(topicName) {
    loader.loadElement('newsList');
    newsService.loadNews(topicName).then(news => {
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