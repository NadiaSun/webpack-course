import {ExcelComponents} from '@core/ExcelComponents';
import {$} from '@core/dom';

export class Formula extends ExcelComponents {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return `<div class="info">fx</div>
                <div id="formula" class="input" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })
        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            this.$emit('formula:keyEnter', event)
        }
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    focus() {
        this.input.focus()
    }
}

