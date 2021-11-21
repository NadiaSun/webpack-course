import {ExcelComponents} from '@core/ExcelComponents';

export class Toolbar extends ExcelComponents {
    static className = 'excel__toolbar'

    constructor($root) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click']
        });
    }

    toHTML() {
        return `<div class="button">
                    <i class="material-icons">format_align_left</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_align_center</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_align_right</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_bold</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_italic</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_underlined</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_color_text</i>
                </div>`
    }

    onClick() {
        console.log('toolbar', event.target)
    }
}
