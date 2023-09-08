import { styled } from '@mui/material/styles';
import { Form } from 'formik';

const AddProductForm = styled(Form)(
    () => `
        display: flex;
        flex-direction: column;
    `,
);

export {
    AddProductForm,
}