import { Button, CardContent, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { ProductCard as StyledProductCard, ProductCardActions } from './styles';

import { PATH as ProductDetailsPath } from '../../../ProductDetails/routes';

const ProductCard = ({ id, name, type }) => {
    const navigate = useNavigate();
  
    const onEditClick = (pId) => {
      navigate(`${ProductDetailsPath}/${pId}`);
    }

    return (
        <StyledProductCard variant="outlined">
            <CardContent>
                <Typography noWrap>
                    {name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {type}
                </Typography>
            </CardContent>
            <ProductCardActions>
                <Button onClick={() => onEditClick(id)} size="small">View/Edit</Button>
            </ProductCardActions>
        </StyledProductCard>
    )
};

export { ProductCard };