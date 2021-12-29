import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:keyEnter', event => {
            this.onKeydown(event)
            this.$emit('table:select', $cell)
        })

        this.$on('toolbar:style', style => {
            this.selection.current.css(style)
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $cell = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($cell, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($cell)
                // document.onmousemove = (endEvent) => {
                //     if (event.target !== endEvent.target) {
                //         const $cells = matrix($cell, $(endEvent.target))
                //             .map(id => this.$root.find(`[data-id="${id}"]`))
                //         this.selection.selectGroup($cells)
                //     }
                // }
                // document.onmouseup = () => {
                //     document.onmousemove = null
                // }
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }
}


