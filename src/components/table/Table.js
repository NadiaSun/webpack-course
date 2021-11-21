import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click']
        });
    }

    toHTML() {
        return createTable()
    }
}
