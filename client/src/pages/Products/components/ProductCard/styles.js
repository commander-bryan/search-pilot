import { styled } from '@mui/material/styles';
import { Card, CardActions } from '@mui/material';

const ProductCard = styled(Card)(
    ({ theme }) => `
        min-width: 240px;
        width: 30%;
        height: 200px;
        display: flex;
        flex-direction: column;
        margin: ${theme.spacing(2)};
  `,
);

const ProductCardActions = styled(CardActions)`
    margin-top:auto;
`;

export {
    ProductCard,
    ProductCardActions,
}