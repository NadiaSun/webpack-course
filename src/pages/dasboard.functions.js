import {storage} from '@core/utils';
import {openingDate} from '@core/openedDate';

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
//             return '1 day ago';
//         case 2:
//             return '2 days ago';
//         default:
//             if (diff > 30) {
//                 return 'a month ago'
//             }
//     }
//     return ''
// }

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `<li class="db__record">
                <a href="#excel/${id}">${model.title}</a>
                <strong>
                    ${openingDate(new Date(model.openedDate))}
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

function getKey(key) {
    return {
        key,
        openedDate: storage(key).openedDate}
}

function byField() {
    return (a, b) => a.openedDate > b.openedDate ? -1 : 1;
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>You haven't created anything yet</p>`
    }
    const newKeys = keys
        .map(key => getKey(key))
        .sort(byField())
        .map(obj => obj.key)
    return `<div class="db__list-header">
                    <span>Name</span>
                    <span>Opening date</span>
                </div>
                <ul class="db__list">
                     ${newKeys.map(toHTML).join('')}
                </ul>`
}
