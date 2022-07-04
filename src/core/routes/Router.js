import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error(`Selector does not exist`)
        }

        this.$placeholder = $(selector)
        this.routes = routes

        this.page = null

        this.changePlaceHandler = this.changePlaceHandler.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePlaceHandler)
        this.changePlaceHandler()
    }

    changePlaceHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear();
        const Page = ActiveRoute.path.includes('dashboard') || ActiveRoute.path === ''
            ? this.routes.dashboard
            : ActiveRoute.path.includes('excel')
                ? this.routes.excel
                : this.routes.error;
        this.page = new Page(ActiveRoute.param);
        this.$placeholder.append(this.page.getRoot());
        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePlaceHandler)
    }
}
