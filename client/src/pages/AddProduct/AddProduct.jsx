import { useState } from 'react';
import { Alert, Container, Divider, Typography  } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { PATH as ProductsPath } from '../Products/routes';
import ProductForm from '../../components/ProductForm';

const AddProduct = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        await axios({
            method: 'post',
            url: '/api/products',
            data: { ...values },
            })
        .then(() => {
            setError(false);
            navigate(ProductsPath);
        }).catch((e) => {
            setError(e);
        });
    }
    
    return (
        <Container>
            <Typography variant="h2" component={'h1'}>
                Create new product
            </Typography>
            <Divider />
            {error && <Alert severity='error'>
                There has been an error submitting your new product. Please check for errors then try again
            </Alert>}
            <ProductForm onSubmit={onSubmit} />
        </Container>
);
}

export { AddProduct };