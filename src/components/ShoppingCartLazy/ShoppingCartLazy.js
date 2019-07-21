import React, { Suspense } from 'react';
const ShoppingCart = React.lazy(() => import('../ShoppingCart'));
console.log(ShoppingCart);
const ShoppingCartLazy = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ShoppingCart />
    </Suspense>
);

export default ShoppingCartLazy;