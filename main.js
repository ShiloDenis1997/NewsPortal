import { TopicsNavigationComponent } from './src/components/TopicsNavigationComponent.js';
import { NewsService } from './src/services/NewsService.js';
import { ArticlesListComponent } from './src/components/ArticlesListComponent.js';

import * as loader from './src/Loader.js';

var topics = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
var topicsComponent = new TopicsNavigationComponent('topicsList', topics, displayNews);
var articlesListComponent = new ArticlesListComponent('newsList');
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
        articlesListComponent.displayArtiles(news.articles);
    }).catch(error => console.log(error));
}