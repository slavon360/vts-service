import React, { Suspense } from 'react';
import { Preloader } from '../../components';
const ProductPage = React.lazy(() => import('./ProductPage'));
const ProductPageLazy = props => (
	<Suspense fallback={<Preloader />}>
		<ProductPage { ...props } />
	</Suspense>
);

export default ProductPageLazy;