// Сегодняшняя дата
// миллисекунды переведённые в дни и с округлением вниз
// Итого получается сколько дней прошло с открытия
const daysDavePassed = ml => Math.floor(ml/(60000*60*24))
// Массивы
const day = ['Сегодня в', 'Вчера в', '2 дня назад в', '3 дня назад в']

export function openingDate(openedDate) {
    const nowDate = new Date()
    const difference = nowDate - openedDate
    return day[daysDavePassed(difference)]
}
