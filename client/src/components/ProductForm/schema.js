import axios from 'axios';
import * as Yup from 'yup';

import {
    clothingTypes,
    clothingSizes,
    footwearSizes,
} from './options';

const initialValues = {
    name: '',
    type: '',
    sizes: [],
    features: [],
    brand: '',
    colour: '',
    neckline: '',
    materials: '',
};

const getProductSchema = (editing = false) => Yup.object().shape({
    name: Yup.string()
        .test('check product name is unique', 'Product name must be unique', function (value) {
            // TODO: rework this so it doesnt validate for every character and every render
            // TODO: check requirements around whether this check needs done when editing an existing product. Assuming not for now.
            return editing ? true :  new Promise((resolve) => {
                axios({
                    method: 'post',
                    // TODO: check with BE why this needs an ID
                    url: '/api/validate/1',
                    data: { name: value },
                    })
                .then(() => {
                    // name is unique
                    resolve(true);
                }).catch(() => {
                    // TODO: handle any API errors
                    // name is not unique
                    resolve(false);
                });
            })
        })
        .required('Required'),
    type: Yup.string().oneOf(clothingTypes.map(cType => cType.id))
        .required('Required'),
    // TODO: check with ux that this is required
    sizes: Yup.array(
        // TODO: the following validation is causing an error when the form is prepopulated, need to figure out how to prevent that
        // Yup.string().oneOf([
        //     // for simplicity, validate the size is any one of our size types.
        //     // can go back later and check its the correct size type for the given
        //     // clothing type if required
        //     ...clothingSizes.map(cSize => cSize.id),
        //     ...footwearSizes.map(fSize => fSize.id)
        // ])
        // for now, just use basic string validation
        Yup.string(),
    ).required('Required'),
    // TODO: check with ux that this is required
    features: Yup.array(
        Yup.string()
    ).required('Required'),
    // TODO: check with ux that this is required
    brand: Yup.string()
        .required('Required'),
    style: Yup.string(),
    colour: Yup.string(),
    neckline: Yup.string(),
    materials: Yup.string(),
});

export { 
    initialValues,
    getProductSchema,
};