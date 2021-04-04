import React, { Suspense } from 'react';
import { Preloader } from '../../components';
const Order = React.lazy(() => import('./Order'));
const OrderLazy = props => (
	<Suspense fallback={<Preloader />}>
		<Order { ...props } />
	</Suspense>
);

export default OrderLazy;