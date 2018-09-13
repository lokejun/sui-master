/*--============================---
 *  全局路由配置页
 *  loke 2018-07-17 09:51:08
 *--==============================*/

const routerData = [
    {path: '/', component : require('./main').default},
    {path: '/base/alert', component : require('./acts/alert').default},
    {path: '/base/button', component: require('./acts/button').default},
    {path: '/base/calendar', component: require('./acts/calendar').default},
    {path: '/base/checkbox', component: require('./acts/checkbox').default},
    {path: '/base/input', component: require('./acts/input').default},
    {path: '/base/icon', component: require('./acts/icon').default},
    {path: '/base/table', component: require('./acts/table').default},
    {path: '/base/edittable', component: require('./acts/edittable').default},
    {path: '/base/form', component: require('./acts/form').default},
    {path: '/base/modal', component: require('./acts/modal').default},
    {path: '/base/pager', component: require('./acts/pager').default},
    {path: '/base/select', component: require('./acts/select').default},
    {path: '/base/steps', component: require('./acts/steps').default},
    {path: '/base/tabs', component: require('./acts/tabs').default},
    {path: '/base/timeline', component: require('./acts/timeline').default},
    {path: '/base/tree', component: require('./acts/tree').default},
    {path: '/base/treeselect', component: require('./acts/treeselect').default},
    {path: '/base/upload', component: require('./acts/upload').default},
    {path: '/advance/dateselect', component: require('./advance/dateselect').default},
    {path: '/advance/deptuser', component: require('./advance/deptuser').default},
    {path: '/layout/baselayout', component: require('./advance/baselayout').default},
    {path: '/layout/basepage', component: require('./advance/basepage').default},
    {path: '/layout/baselogin', component: require('./advance/baselogin').default},
    {path: '/layout/basesearch', component: require('./advance/basesearch').default},
    {path: '/charts/linebar', component: require('./charts/linebar').default},
];

export default routerData;
