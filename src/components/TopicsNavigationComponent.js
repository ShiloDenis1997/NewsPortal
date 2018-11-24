import * as htmlConverter from '../HtmlToElementConverter.js';
import { BaseComponent } from './BaseComponent.js';

export class TopicsNavigationComponent extends BaseComponent {
    constructor(targetElementId, topics, onTopicSelected) {
        super(targetElementId);
        this.onTopicSelected = onTopicSelected;
        this.topicsNames = new Set(topics);
    }

    initializeTopics() {
        const topicsContainer = this.getTargetElement();
        topicsContainer.innerHTML = '';
        const topicsList = htmlConverter.htmlToElement('<div class="list-group"></div>');
        topicsContainer.appendChild(topicsList);
        for (let topicName of this.topicsNames) {
            let listItem = htmlConverter.htmlToElement(`
                <a href="#" id="${topicName}" class="list-group-item list-group-item-action">
                    ${topicName}
                </a>`);
            listItem.addEventListener('click', () => this.onTopicClick(topicName));
            topicsContainer.appendChild(listItem);
        }
    }

    onTopicClick(topicName) {
        this.setActiveTopic(topicName);
        if (this.onTopicSelected) {
            this.onTopicSelected(topicName);
        }
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