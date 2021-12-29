import {range} from '@core/utils';

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
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
