import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix, nextSelector, isAllCol, getAllCol} from './table.functions';
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('table:input', text => {
            this.updateTextInStore(text)
        })

        this.$on('formula:keyEnter', event => {
            this.onKeydown(event)
            this.$emit('table:select', this.selection.current)
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.appleStyle({
                value,
                ids: this.selection.selectedIds
            }));
        })
        // this.$subscribe(state => console.log('Table state: ', state))
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        this.$emit('toolbar:select', $cell.getStyles(Object.keys(defaultStyles)))
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            // const $resizerAll = $(document.querySelector(`.${Table.className}`))
            // $resizerAll.css({pointerEvents: 'none'})
            const data = await resizeHandler(this.$root, event);
            // $resizerAll.css({pointerEvents: 'all'})
            this.$dispatch(actions.tableResize(data))
        } catch (error) {
            console.warn('ERROR RESIZE: ', error)
        }
    }

    onMousedown(event) {
        if (isAllCol(event)) {
            const $cells = getAllCol(this.$root, event)
            this.selection.selectGroup($cells)
        }
        if (shouldResize(event)) {
            event.preventDefault()
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $cell = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($cell, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                console.log($cells)
                this.selection.selectGroup($cells)
                console.log($cells)
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

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    updateTextInStoreTwo(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
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


