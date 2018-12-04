export class NewsService {
    constructor() {
        this.apiKey = 'ad1f839e3b024bf89bbe346e478fd085';
        this.baseUrl = 'https://newsapi.org/v2';
    }

    async loadNews(topicName, page = 1, pageSize = 10) {
        let url = `${this.baseUrl}/everything?q=${topicName}&apiKey=${this.apiKey}&page=${page}&pageSize=${pageSize}`;
        let response = await fetch(url);
        return await response.json();
    }
}