import { routes as routeNames } from '../routes';
import RequireAuth from '../components/HOC/RequireAuth';

import {
    Home,
    Product,
    SignIn,
    Login
} from '../containers';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: `${routeNames.PRODUCT_DETAILS}/:productSlug`,
        component: Product
    },
    {
        path: `${routeNames.SIGN_IN}`,
        component: SignIn
    },
    {
        path: `${routeNames.LOGIN}`,
        component: Login
    }
]

export default routes;
