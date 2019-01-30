import { routes as routeNames } from '../routes';

import {
    Home,
    Product
} from '../containers';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: `${routeNames.PRODUCT_DETAILS}/:productSlug`,
        exact: true,
        component: Product
    }
]

export default routes;
