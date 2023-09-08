import { styled } from '@mui/material/styles';
import { Button, InputLabel } from '@mui/material';
import { Field, Form } from 'formik';

const AddProductButton = styled(Button)(
    ({ theme }) => `
        margin-top: ${theme.spacing(1.5)};
        min-width: 120px;
        width: 20%;
        align-self: end;
    `,
);

const AddProductInputLabel = styled(InputLabel)(
    ({ theme }) => `
        margin-top: ${theme.spacing(1.5)};
    `,
);

const AddProductForm = styled(Form)(
    () => `
        display: flex;
        flex-direction: column;
    `,
);

export {
    AddProductButton,
    AddProductInputLabel,
    AddProductForm,
}