import {Page} from '@core/Page';
import {$} from '@core/dom';
export class ErrorPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
        <div class="error">
            <div class="error__text">
                 <h2>An error has occurred. Invalid table hash</h2>
                 <img class="img" src="snake.png" alt="">
            </div>
            <h3 class="error__return">
                <a href="#dashboard">
                    Go back to main page
                </a>
            </h3>
        </div>
        `)
    }
}
