import './scss/index.scss'
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import {ErrorPage} from '@/pages/ErrorPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
    error: ErrorPage
})

console.log('Work')
