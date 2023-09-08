import { useState } from 'react';
import { Alert, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAxios } from '../../hooks';
import ProductForm from '../../components/ProductForm';

import { PATH as ProductsPath } from '../Products/routes';

const ProductDetails = () => {
    const { id } = useParams();
    const [putError, setPutError] = useState(false);
    const { data, loading, error } = useAxios(`/api/products/${id}`, 'get');
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        await axios({
            method: 'put',
            url: `/api/products/${id}`,
            data: { ...values },
            })
        .then(() => {
            setPutError(false);
            navigate(ProductsPath);
        }).catch((e) => {
            setPutError(e);
        });
    }

    return (
        <Container>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {putError && <Alert severity="error">{putError}</Alert>}
            {(data && !loading) && (
                <>
                    <Typography variant="h2" component={'h1'}>
                        View/edit product
                    </Typography>
                    <Divider />
                    <ProductForm onSubmit={onSubmit} existingValues={data} />
                </>
            )}
        </Container>
    );
}

export { ProductDetails };