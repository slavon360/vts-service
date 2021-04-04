import React, { Suspense } from 'react';
import { Preloader } from '../../components';
const ShoppingCart = React.lazy(() => import('../ShoppingCart'));
const ShoppingCartLazy = props => (
	<Suspense fallback={<Preloader />}>
		<ShoppingCart { ...props } />
	</Suspense>
);

export default ShoppingCartLazy;