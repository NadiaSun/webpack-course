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
}
