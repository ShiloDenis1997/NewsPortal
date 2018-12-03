import { BaseComponent } from './BaseComponent.js';
import * as htmlConverter from '../HtmlToElementConverter.js';

export class ArticlesListComponent extends BaseComponent {
    constructor(targetElementId) {
        super(targetElementId);
    }

    displayArtiles(articles) {
        const articlesList = this.getTargetElement();
        articlesList.innerHTML = '';
        for (let i in articles) {
            let article = articles[i];
            let card = htmlConverter.htmlToElement(`
                    <div class="card news-item">
                        <div class="card-header">
                            <h5>${article.title}</h5>
                        </div>
                        <div class="card-body">
                            <div>
                                <img class="img-fluid" src="${article.urlToImage}"/>
                            </div>
                            <div class="card-article-content">
                                ${article.content} 
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-info float-right">Read more</button>
                        </div>
                    </div>`);
            articlesList.appendChild(card);
        }
    }
}