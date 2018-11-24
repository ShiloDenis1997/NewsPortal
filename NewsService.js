export class NewsService {
    constructor() {
        this.apiKey = 'ad1f839e3b024bf89bbe346e478fd085';
        this.baseUrl = 'https://newsapi.org/v2';
    }

    loadNews(topicName, page = 1, pageSize = 10) {
        let url = `${this.baseUrl}/everything?q=${topicName}&apiKey=${this.apiKey}&page=${page}&pageSize=${pageSize}`;
        return fetch(url).then(r => r.json());
    }
}