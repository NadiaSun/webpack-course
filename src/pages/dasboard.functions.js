import {storage} from '@core/utils';

// function date(day, time) {
//     const arrDay = day.split('.')
//     const arrTime = time.split(':')
//     const newDay = (new Date).toLocaleDateString().split('.')
//     const newTime = (new Date).toLocaleTimeString().slice(0, 5).split(':')
//     const diff = newDay[0] - arrDay[0];
//     switch (diff) {
//         case 0:
//             return `${day} ${time}`;
//         case 1:
//             return '1 день назад';
//         case 2:
//             return '2 дня назад';
//         default:
//             if (diff > 30) {
//                 return 'месяц назад'
//             }
//     }
//     return ''
// }

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    date(new Date(model.openedDate).toLocaleDateString(), new Date(model.openedDate).toLocaleTimeString().slice(0, 5))
    return `<li class="db__record">
                <a href="#excel/${id}">${model.title}</a>
                <strong>
                    ${new Date(model.openedDate).toLocaleDateString()}
                    ${new Date(model.openedDate).toLocaleTimeString().slice(0, 5)}
                </strong>
            </li>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>Undefined</p>`
    }

    return `<div class="db__list-header">
                    <span>Название</span>
                    <span>Дата открытия</span>
                </div>
                <ul class="db__list">
                     ${keys.map(toHTML).join('')}
                </ul>`
}
