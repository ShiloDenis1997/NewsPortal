function initLoad() {
    initializeTopics();
    setActiveTopic('Business');
    displayNews(activeTopic);
    console.log('inited');
}

var activeTopic;

function initializeTopics() {
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';
    const topicsNames = new Set(['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']);
    for (let topicName of topicsNames) {
        let listItem = htmlToElement(`
            <a href="#" id="${topicName}" class="list-group-item list-group-item-action" onclick="onTopicClick('${topicName}')">
                ${topicName}
            </a>`);
        topicsList.appendChild(listItem);
    }
}

function onTopicClick(topicName) {
    setActiveTopic(topicName);
    displayNews(topicName);
}

function setActiveTopic(topicName) {
    if (!activeTopic) {
        activeTopic = topicName;
    } else {
        let currentActiveTopic = document.getElementById(activeTopic);
        currentActiveTopic.setAttribute('class', 'list-group-item list-group-item-action');
        activeTopic = topicName;
    }

    let newActiveTopic = document.getElementById(activeTopic);
    newActiveTopic.setAttribute('class', 'list-group-item list-group-item-action active');
}

function htmlToElement(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

function loadElement(elementId) {
    let element = document.getElementById(elementId);
    element.innerHTML = '';
    element.appendChild(htmlToElement('<div class="loader"></div>'));
}

function displayNews(topicName) {
    loadElement('newsList');
    loadNews(topicName).then(news => {
        let articles = news.articles;
        let articlesList = document.getElementById('newsList');
        articlesList.innerHTML = '';
        for (let i in articles) {
            let article = articles[i];
            let card = htmlToElement(`
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

function loadNews(topicName) {
    let url = `https://newsapi.org/v2/everything?q=${topicName}&apiKey=${apiKey}`;
    return fetch(url)
        .then(r => r.json())
        .catch(reason => console.error(reason));
}