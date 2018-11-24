import { TopicsNavigationComponent } from './src/components/TopicsNavigationComponent.js';
import { NewsService } from './src/services/NewsService.js';
import { ArticlesListComponent } from './src/components/ArticlesListComponent.js';
import { PaginationComponent } from './src/components/PaginationComponent.js';

import * as loader from './src/Loader.js';

var topics = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
var topicsComponent = new TopicsNavigationComponent('topicsList', topics, topicSelected);
var articlesListComponent = new ArticlesListComponent('newsList');
var topPaginationComponent = new PaginationComponent('topPagination');
var bottomPaginationComponent = new PaginationComponent('bottomPagination');
var newsService = new NewsService();

window.addEventListener('load', initLoad);

function initLoad() {
    topicsComponent.initializeTopics();
    topicsComponent.setActiveTopic('Business');
    displayNews(topicsComponent.ActiveTopic, 1);
}

function topicSelected(topicName) {
    displayNews(topicName, 1);
}

function displayNews(topicName, pageIndex) {
    loader.loadElement('newsList');
    newsService.loadNews(topicName).then(news => {
        articlesListComponent.displayArtiles(news.articles);
        topPaginationComponent.displayPagination(pageIndex, 10, news.totalResults);
        bottomPaginationComponent.displayPagination(pageIndex, 10, news.totalResults);
    }).catch(error => console.log(error));
}