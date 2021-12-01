import {$} from '@core/dom';

export class ResizeHandler {
    constructor(event, $root) {
        this.onEvent = event
        this.$root = $root
    }

    createEvent() {
        this.$resizer = $(this.onEvent.target)
        this.$parent = this.$resizer.closest('[data-type="resizable"]')
        this.type = this.onEvent.target.dataset.resize // col
    }

    cssEvent() {
        this.coords = this.$parent.getCoords()
        this.sideProp = this.type === 'col' ? 'bottom' : 'right' // bottom
        this.value = undefined

        this.$resizer.css({
            opacity: 1,
            [this.sideProp]: '-5000px'
        })
    }

    checkEvent(e) {
        if (this.type === 'col') {
            const delta = e.pageX - this.coords.right;
            this.value = this.coords.width + delta;
            this.$resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - this.coords.bottom;
            this.value = this.coords.height + delta;
            this.$resizer.css({bottom: -delta + 'px'})
        }
    }

    endEvent() {
        if (this.type === 'col') {
            this.$parent.css({width: this.value + 'px'});
            this.$root.findAll(`[data-col="${this.$parent.data.col}"]`)
                .forEach(el => el.style.width = this.value + 'px');
        } else {
            this.$parent.css({height: this.value + 'px'});
        }

        this.$resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
        })
    }
}

    //     document.onmousemove = e => {
    //         console.log(e)
    //
    //     }
    //
    //     document.onmouseup = () => {
    //         document.onmousemove = null
    //         document.onmouseup = null

