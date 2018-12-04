import { TopicsNavigationComponent } from './components/TopicsNavigationComponent.js';
import { NewsService } from './services/NewsService.js';
import { ArticlesListComponent } from './components/ArticlesListComponent.js';
import { PaginationComponent } from './components/PaginationComponent.js';
import * as loader from './Loader.js';

import babelPolyfill from '@babel/polyfill';
import "isomorphic-fetch";
import './main.scss';

var topics = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
var topicsComponent = new TopicsNavigationComponent('topicsList', topics, topicSelected);
var articlesListComponent = new ArticlesListComponent('newsList');
var topPaginationComponent = new PaginationComponent('topPagination', onPageSelected);
var bottomPaginationComponent = new PaginationComponent('bottomPagination', onPageSelected);
var newsService = new NewsService();
var mainContentLoaderId = 'mainContentLoader';

window.addEventListener('load', initLoad);

var pageSize = 10;

function initLoad() {
    topicsComponent.initializeTopics();
    topicsComponent.setActiveTopic('Business');
    displayNews(topicsComponent.ActiveTopic, 1);
}

function topicSelected(topicName) {
    displayNews(topicName, 1);
}

function displayNews(topicName, pageIndex) {
    loader.startLoading(mainContentLoaderId);
    newsService.loadNews(topicName, pageIndex, pageSize).then(news => {
        articlesListComponent.displayArtiles(news.articles);
        applyPagination(pageIndex, pageSize, news.totalResults);
        loader.stopLoading(mainContentLoaderId);
    }).catch(error => console.log(error));
}

function onPageSelected(pageIndex) {
    displayNews(topicsComponent.ActiveTopic, pageIndex);
}

function applyPagination(pageIndex, pageSize, totalPagesCount) {
    topPaginationComponent.displayPagination(pageIndex, pageSize, totalPagesCount);
    bottomPaginationComponent.displayPagination(pageIndex, pageSize, totalPagesCount);
}