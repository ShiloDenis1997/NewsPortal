export class BaseComponent {
    constructor(targetElementId) {
        this.targetElementId = targetElementId;
    }

    getTargetElement() {
        return document.getElementById(this.targetElementId);
    }
}