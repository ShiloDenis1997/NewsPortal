import { BaseComponent } from './BaseComponent.js';
import * as htmlConverter from '../HtmlToElementConverter.js';

const PAGE_ITEM_ACTIVE = 'page-item active';
const PAGE_ITEM_DISABLED = 'page-item disabled';

export class PaginationComponent extends BaseComponent {

    constructor(targetElementId, onPageSelected, showPagesCount = 7) {
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
        this.appendPreviousButton(paginationList);
        this.appendIndexButtons(paginationList);
        this.appendNextButton(paginationList);
    }

    appendPreviousButton(paginationList) {
        const previousButton = this.createPageItem('Previous');
        previousButton.addEventListener('click', () => this.previousButtonClick());
        if (this.pageIndex === 1) {
            previousButton.setAttribute('class', PAGE_ITEM_DISABLED);
        }
        paginationList.appendChild(previousButton);
    }

    appendIndexButtons(paginationList) {
        let indexInterval = this.countIndexInterval();
        for (let i = indexInterval.leftIndex; i <= indexInterval.rightIndex; i++) {
            const pageItem = this.createPageItem(`${i}`);
            pageItem.addEventListener('click', () => this.pageButtonClick(i));
            if (i === this.pageIndex) {
                pageItem.setAttribute('class', PAGE_ITEM_ACTIVE);
            }
            paginationList.appendChild(pageItem);
        }
    }

    appendNextButton(paginationList) {
        const nextButton = this.createPageItem('Next');
        nextButton.addEventListener('click', () => this.nextButtonClick());
        if (this.pageIndex === this.totalPagesCount) {
            nextButton.setAttribute('class', PAGE_ITEM_DISABLED);
        }
        paginationList.appendChild(nextButton);
    }

    countIndexInterval() {
        // clean up
        let leftShift = Math.floor(this.showPagesCount / 2);
        let leftIndex = this.pageIndex - leftShift;
        let rightIndex = leftIndex + this.showPagesCount - 1;
        if (leftIndex < 1) {
            rightIndex += 1 - leftIndex;
            leftIndex = 1;
        }
        if (rightIndex > this.totalPagesCount) {
            leftIndex -= rightIndex - this.totalPagesCount;
            rightIndex = this.totalPagesCount;
        }
        if (leftIndex < 1) {
            leftIndex = 1;
        }
        return { leftIndex: leftIndex, rightIndex: rightIndex };
    }

    createPageItem(itemText) {
        return htmlConverter.htmlToElement(`<li class="page-item"><span class="page-link" href="#">${itemText}</span></li>`);
    }

    calculatePagesCount(totalItems, pageSize) {
        let pagesCount = Math.floor(totalItems / pageSize);
        if (pagesCount * pageSize != totalItems) {
            pagesCount++;
        }
        return pagesCount;
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