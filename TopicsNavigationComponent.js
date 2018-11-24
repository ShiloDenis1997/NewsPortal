import * as htmlConverter from './HtmlToElementConverter.js';

export class TopicsNavigationComponent {
    constructor(targetElementId, topics, onTopicSelected){
        this.targetElementId = targetElementId;
        this.onTopicSelected = onTopicSelected;
        this.topicsNames = new Set(topics);
    }

    initializeTopics() {
        const topicsList = document.getElementById(this.targetElementId);
        topicsList.innerHTML = '';
        for (let topicName of this.topicsNames) {
            let listItem = htmlConverter.htmlToElement(`
                <a href="#" id="${topicName}" class="list-group-item list-group-item-action">
                    ${topicName}
                </a>`);
            listItem.addEventListener('click', () => this.onTopicClick(topicName));
            topicsList.appendChild(listItem);
        }
    }

    onTopicClick(topicName) {
        this.setActiveTopic(topicName);
        this.onTopicSelected(topicName);
    }

    setActiveTopic(topicName) {
        if (!this.activeTopic) {
            this.activeTopic = topicName;
        } else {
            let currentActiveTopic = document.getElementById(this.activeTopic);
            currentActiveTopic.setAttribute('class', 'list-group-item list-group-item-action');
            this.activeTopic = topicName;
        }
    
        let newActiveTopic = document.getElementById(this.activeTopic);
        newActiveTopic.setAttribute('class', 'list-group-item list-group-item-action active');
    }

    get ActiveTopic() {
        return this.activeTopic;
    }
}