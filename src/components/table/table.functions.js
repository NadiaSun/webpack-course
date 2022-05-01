import {range} from '@core/utils';
import {$} from '@core/dom';

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function isAllCol(event, type) {
    return event.target.dataset.all === 'col'
}

export function getId($el) {
    return $el.id(true)
}

export function matrix($target, $current) {
    const target = getId($target)
    const current = getId($current)

    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            (col - 1) < MIN_VALUE ? col : col--
            break
        case 'ArrowUp':
            (row - 1) < MIN_VALUE ? row : row--
            break
    }

    return `[data-id="${row}:${col}"]`
}

export function getAllCol($root, event) {
    const arr = []
    const col = event.target.dataset.col
    const allCol = $root.findAll(`[data-col="${col}"]`).forEach(e => arr.push(e))
    const $allCol = arr.map(e => $(e))
    return $allCol
}
