import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import {ResizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            const helloWorld = new ResizeHandler(event, this.$root);
            helloWorld.createEvent();
            helloWorld.cssEvent();

            document.onmousemove = e => {
                helloWorld.checkEvent(e);
            }

            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
                helloWorld.endEvent()
            }
        }
    }
    //     if (event.target.dataset.resize) {
    //         const $resizer = $(event.target)
    //         // const $parent = $resizer.$el.parentNode - Bat!
    //         // const $parent = $resizer.$el.closest('.column') - No good, fifty-fifty
    //         const $parent = $resizer.closest('[data-type="resizable"]')
    //         const coords = $parent.getCoords()
    //         const type = event.target.dataset.resize
    //         const sideProp = type === 'col' ? 'bottom' : 'right'
    //         let value
    //
    //         $resizer.css({
    //             opacity: 1,
    //             [sideProp]: '-5000px'
    //         })
    //
    //         document.onmousemove = e => {
    //             console.log(e)
    //             if (type === 'col') {
    //                 const delta = e.pageX - coords.right;
    //                 value = coords.width + delta;
    //                 $resizer.css({right: -delta + 'px'})
    //             } else {
    //                 const delta = e.pageY - coords.bottom;
    //                 value = coords.height + delta;
    //                 $resizer.css({bottom: -delta + 'px'})
    //             }
    //         }
    //
    //         document.onmouseup = () => {
    //             document.onmousemove = null
    //             document.onmouseup = null
    //             if (type === 'col') {
    //                 $parent.css({width: value + 'px'});
    //                 this.$root.findAll(`[data-col="${$parent.data.col}"]`)
    //                     .forEach(el => el.style.width = value + 'px');
    //             } else {
    //                 $parent.css({height: value + 'px'});
    //             }
    //
    //             $resizer.css({
    //                 opacity: 0,
    //                 bottom: 0,
    //                 right: 0,
    //             })
    //         }
    //     }
    // }
}
