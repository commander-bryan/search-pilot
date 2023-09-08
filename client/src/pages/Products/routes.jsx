import { Products } from './Products';

const PATH='/products';

const ProductsRoute = {
    path: PATH,
    element: <Products />,
};

export { ProductsRoute, PATH }