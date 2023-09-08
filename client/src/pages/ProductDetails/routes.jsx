import { ProductDetails } from './ProductDetails';

const PATH='/product';

const ProductDetailsRoute = {
    path: `${PATH}/:id`,
    element: <ProductDetails />,
};

export { ProductDetailsRoute, PATH }