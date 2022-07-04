import {Page} from '@core/Page';
import {$} from '@core/dom';
export class ErrorPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
        <div class="error">
            <div class="error__text">
                 <h2>Произошла ошибка. Неправильный хэш таблицы</h2>
                 <img class="img" src="snake.png" alt="">
            </div>
            <h3 class="error__return">
                <a href="#dashboard">
                    Вернуться на главную страницу
                </a>
            </h3>
        </div>
        `)
    }
}
