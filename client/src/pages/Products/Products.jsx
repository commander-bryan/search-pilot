import { Alert, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { ProductCard } from './components/ProductCard';
import { AddNewProductCard } from './components/AddNewProductCard';

import { ProductsContainer } from './styles';

import { useAxios } from '../../hooks';

const Products = () => {
    const { data, loading, error } = useAxios('/api/products', 'get');

    return (
        <Container>
            <Typography variant="h2" component={'h1'}>
                View All Products
            </Typography>
            <Divider />
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {data && (
                <ProductsContainer>
                    <AddNewProductCard />
                    {data.map(d => 
                        <ProductCard
                            key={d.id}
                            id={d.id}
                            name={d.name}
                            type={d.type}
                        />
                    )}
                </ProductsContainer>
            )}
        </Container>
    );
}

export { Products };