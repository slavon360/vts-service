import React, { Suspense } from 'react';
import { Preloader } from '../../components';
const Repair = React.lazy(() => import('./Repair'));
const RepairLazy = props => (
	<Suspense fallback={<Preloader />}>
		<Repair { ...props } />
	</Suspense>
);

export default RepairLazy;