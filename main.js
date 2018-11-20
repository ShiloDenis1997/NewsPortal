function initLoad() {
    initializeTopics();
    displayNews('Business');
    console.log('inited');
    //document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
    //fetchIssues();
}

function initializeTopics() {
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';
    const topicsNames = new Set(['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']);
    for (let topicName of topicsNames) {
        let listItem = document.createElement('a');
        listItem.setAttribute('href', '#');
        listItem.setAttribute('class', 'list-group-item list-group-item-action');
        listItem.innerText = topicName;
        topicsList.appendChild(listItem);
    }
}

function displayNews(topicName) {
    loadNews(topicName).then(news => {
        let articles = news.articles;
        let articlesList = document.getElementById('newsList');
        articlesList.innerHTML = '';
        for (let i in articles) {
            let article = articles[i];
            let card = document.createElement('div');
            card.setAttribute('class', 'card news-item');
            card.innerHTML = `
                    <div class="card-header">
                        <h5>${article.title}</h5>
                    </div>
                    <div class="card-body">
                        ${article.content} 
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-info float-right">Read more</button>
                    </div>`;
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