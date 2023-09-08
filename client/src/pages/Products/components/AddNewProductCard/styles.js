import { styled } from '@mui/material/styles';
import { Button, Card, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddNewProductButton = styled(Button)`
    margin-right: auto;
    margin-left: auto;
`;

const AddNewProductCard = styled(Card)(
    ({ theme }) => `
        min-width: 240px;
        width: 30%;
        height: 200px;
        display: flex;
        flex-direction: column;
        margin: ${theme.spacing(2)};
  `,
);

const AddNewProductCardActions = styled(CardActions)`
    height: 100%;
    width: 100%;
    padding: 0;
`;

const AddNewProductIcon = styled(AddIcon)`
    height: 50%;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

export {
    AddNewProductButton,
    AddNewProductCard,
    AddNewProductCardActions,
    AddNewProductIcon,
}