import { BaseComponent } from './BaseComponent.js';
import * as htmlConverter from '../HtmlToElementConverter.js';

export class PaginationComponent extends BaseComponent {
    constructor(targetElementId, onPageSelected, showPagesCount = 5) {
        super(targetElementId);
        this.onPageSelected = onPageSelected;
        this.showPagesCount = showPagesCount;
        this.nextButtonClick = this.nextButtonClick.bind(this);
        this.previousButtonClick = this.previousButtonClick.bind(this);
    }

    displayPagination(pageIndex, pageSize, totalItems) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalPagesCount = this.calculatePagesCount(totalItems, pageSize);
        this.displayPaginationInternal();
    }

    displayPaginationInternal() {
        const paginationContainer = this.getTargetElement();
        paginationContainer.innerHTML = '';
        const paginationList = htmlConverter.htmlToElement(`<ul class="pagination"></ul>`);
        paginationContainer.appendChild(paginationList);
        const previousButton = this.createPageItem('Previous');
        previousButton.addEventListener('click', () => this.previousButtonClick());
        if (this.pageIndex === 1) {
            previousButton.setAttribute('class', 'page-item disabled');
        }
        paginationList.appendChild(previousButton);
        let leftIndex = this.countLeftIndex();
        let rightIndex = this.countRightIndex();
        for (let i = leftIndex; i <= rightIndex; i++) {
            const pageItem = this.createPageItem(`${i}`);
            pageItem.addEventListener('click', () => this.pageButtonClick(i));
            if (i === this.pageIndex) {
                pageItem.setAttribute('class', 'page-item active');
            }
            paginationList.appendChild(pageItem);
        }
        const nextButton = this.createPageItem('Next');
        nextButton.addEventListener('click', () => this.nextButtonClick());
        if (this.pageIndex === this.totalPagesCount) {
            nextButton.setAttribute('class', 'page-item disabled');
        }
        paginationList.appendChild(nextButton);
    }

    countLeftIndex() {
        return 1;
    }

    countRightIndex() {
        return this.totalPagesCount;
    }

    createPageItem(itemText) {
        return htmlConverter.htmlToElement(`<li class="page-item"><span class="page-link" href="#">${itemText}</span></li>`);
    }

    calculatePagesCount(totalItems, pageSize) {
        return 10; // improve logic here
    }

    nextButtonClick() {
        if (this.pageIndex === this.totalPagesCount) {
            return;
        }

        this.changePage(this.pageIndex + 1);
    }

    previousButtonClick() {
        if (this.pageIndex === 1) {
            return;
        }

        this.changePage(this.pageIndex - 1);
    }

    pageButtonClick(pageIndex) {
        if (pageIndex === this.pageIndex) {
            return;
        }

        this.changePage(pageIndex);
    }

    changePage(pageIndex) {
        this.pageIndex = pageIndex;
        this.displayPaginationInternal();
        if (this.onPageSelected) {
            this.onPageSelected(this.pageIndex);
        }
    }
}