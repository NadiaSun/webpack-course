export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    clear() {
        this.group.map($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    add() {
        this.group.map($el => $el.addClass(TableSelection.className))
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.add()
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}
