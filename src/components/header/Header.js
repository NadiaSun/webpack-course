import {ExcelComponents} from '@core/ExcelComponents';

export class Header extends ExcelComponents {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    toHTML() {
        return `<input type="text" class="input" value="Новая таблица"/>
        <div>
            <div class="button">
                <i class="material-icons">delete_outline</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`
    }

    onInput() {
        console.log('Input')
    }
}
