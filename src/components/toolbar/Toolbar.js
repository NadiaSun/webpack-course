import {createToolbar} from '@/components/toolbar/toolbar.tempate';
import {$} from '@core/dom';
import {isButton} from '@/components/toolbar/toolbar.functions';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    init() {
        super.init()
        this.$on('toolbar:select', styles => {
            const key = Object.keys(styles)[0];
            this.setState({
                [key]: styles[key]
            })
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if (isButton(event)) {
            const value = JSON.parse($target.data.value);
            this.$emit('toolbar:applyStyle', value)
        }
    }
}

