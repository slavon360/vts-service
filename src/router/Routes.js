import { routes as routeNames } from '../routes';
import RequireAuth from '../components/HOC/RequireAuth';

import {
    Home,
    Product,
    // SignIn,
    Login,
    Dashboard,
    ShoppingCart,
    Order,
    Repair
} from '../containers';

// import { Repair } from '../components';

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
    // {
    //     path: `${routeNames.SIGN_IN}`,
    //     component: SignIn
    // },
    {
        path: `${routeNames.LOGIN}`,
        component: Login
    },
    {
        path: `${routeNames.DASHBOARD}`,
        component: RequireAuth(Dashboard)
    },
    {
        path: `${routeNames.SHOPPING_CART}`,
        component: ShoppingCart
    },
    {
        path: `${routeNames.ORDER}`,
        component: Order
    },
    {
        path: routeNames.REPAIR,
        component: Repair
    }
]

export default routes;
