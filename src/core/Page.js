export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error(`"getRoot" is don't`)
    }
    afterRender() {}

    destroy() {}
}
