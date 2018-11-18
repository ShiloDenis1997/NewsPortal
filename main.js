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

function loadNews(topicName) {
    return Promise.resolve(JSON.parse(`{
        "status": "ok",
        "totalResults": 5322,
        "articles": [
        {
        "source": {
        "id": "wired",
        "name": "Wired"
        },
        "author": "Emily Dreyfuss",
        "title": "Apple Data Downloads, A Dating App for Trump Fans, and More Security News This Week",
        "description": "North Korean bitcoin theft, Fake FCC complaints, and more security news this week.",
        "url": "https://www.wired.com/story/donald-trump-dating-app-exposed-data/",
        "urlToImage": "https://media.wired.com/photos/5bca5bfab1e96429a704b9d9/191:100/pass/TrumpCouple-1009882898.jpg",
        "publishedAt": "2018-10-20T13:00:00Z",
        "content": "As has become an unwelcome tradition, as Friday wound down and the weekend was so close we could nearly taste it, breaking news hit. The biggest Friday night bombshell came in the form of an indictment of a Russian national engaged in a massive conspiracy to … [+5433 chars]"
        },
        {
        "source": {
        "id": "wired",
        "name": "Wired"
        },
        "author": "Klint Finley",
        "title": "After 10 Years, Bitcoin Has Changed Everything—and Nothing",
        "description": "It all started when the pseudonymous Satoshi Nakamoto published a white paper outlining a digital currency, secured by something called the blockchain.",
        "url": "https://www.wired.com/story/after-10-years-bitcoin-changed-everything-nothing/",
        "urlToImage": "https://media.wired.com/photos/5bd8e9589f29d72d3c40e604/191:100/pass/bitcoin_10anni_niec.jpg",
        "publishedAt": "2018-10-31T14:45:00Z",
        "content": "Ten years ago today, someone using the name Satoshi Nakamoto sent an academic paper to a cryptography mailing list proposing a form of digital cash called \\"Bitcoin.\\" The pseudonymous Nakamoto, whose true identity remains unknown, described an idea for \\"mining… [+5593 chars]"
        },
        {
        "source": {
        "id": "techcrunch",
        "name": "TechCrunch"
        },
        "author": "Taylor Hatmaker",
        "title": "Coinbase now lets you buy and sell ZRX",
        "description": "Coinbase’s newest asset is live. On Tuesday the popular U.S.-based cryptocurrency platform added support for ZRX, the token representing the 0x Project. On Coinbase, ZRX joins the rarified ranks of Bitcoin, Bitcoin Cash, Ethereum, Ethereum Classic and Litecoi…",
        "url": "http://techcrunch.com/2018/10/16/zrx-coinbase/",
        "urlToImage": "https://techcrunch.com/wp-content/uploads/2018/10/GettyImages-1046001894.jpg?w=573",
        "publishedAt": "2018-10-16T19:48:06Z",
        "content": "Coinbase’s newest asset is live. On Tuesday the popular U.S.-based cryptocurrency platform added support for ZRX, the token representing the 0x Project. On Coinbase, ZRX joins the rarified ranks of Bitcoin, Bitcoin Cash, Ethereum, Ethereum Classic and Litecoi… [+1000 chars]"
        }]}`));
}

function saveIssue(e) {
    let issueId = chance.guid();
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}