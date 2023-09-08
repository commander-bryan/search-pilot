import { useNavigate } from "react-router-dom";

import {
    AddNewProductButton,
    AddNewProductCard as StyledAddNewProductCard,
    AddNewProductCardActions,
    AddNewProductIcon
} from './styles';

import { PATH as AddProductPath } from '../../../AddProduct/routes';

const AddNewProductCard = () => {
    const navigate = useNavigate();
  
    const onClick = () => {
      navigate(AddProductPath);
    }

    return (
        <StyledAddNewProductCard variant="outlined">
            <AddNewProductCardActions>
                <AddNewProductButton onClick={onClick}>
                    <AddNewProductIcon />
                </AddNewProductButton>
            </AddNewProductCardActions>
        </StyledAddNewProductCard>
    )
};

export { AddNewProductCard };