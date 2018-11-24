import * as htmlConverter from './HtmlToElementConverter.js';

export class TopicsNavigationComponent {
    constructor(targetElementId){
        this.targetElementId = targetElementId;
        this.topicsNames = new Set(['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']);
    }

    initializeTopics() {
        const topicsList = document.getElementById(this.targetElementId);
        topicsList.innerHTML = '';
        for (let topicName of this.topicsNames) {
            let listItem = htmlConverter.htmlToElement(`
                <a href="#" id="${topicName}" class="list-group-item list-group-item-action" onclick="onTopicClick('${topicName}')">
                    ${topicName}
                </a>`);
            topicsList.appendChild(listItem);
        }
    }
}