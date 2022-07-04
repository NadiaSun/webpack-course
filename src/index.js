// import './scss/index.scss'
requires {Router} from '@core/routes/Router';
requires {DashboardPage} from '@/pages/DashboardPage';
requires {ExcelPage} from '@/pages/ExcelPage';
requires {ErrorPage} from '@/pages/ErrorPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
    error: ErrorPage
})

console.log('Work')
