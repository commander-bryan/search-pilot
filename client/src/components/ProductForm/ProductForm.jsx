import { memo } from 'react';
import { 
    Alert,
    Autocomplete,
    Checkbox,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Formik } from 'formik';

import { 
    AddProductButton,
    AddProductInputLabel,
    AddProductForm
} from './styles';

import {
    clothingTypes,
    clothingSizes,
    footwearSizes,
} from './options';

import { 
    initialValues,
    getProductSchema,
} from './schema';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions();

const handleTypeChange = (setFieldValue, handleFormikChange, params) => {
    // if type changes, invalidate sizes and style as they may not be valid now
    // TODO: check what the new type is and invalidate only where necessary
    setFieldValue("sizes", initialValues.sizes);
    setFieldValue("style", initialValues.style);
    setFieldValue("colour", initialValues.colour);
    setFieldValue("neckline", initialValues.neckline);
    setFieldValue("materials", initialValues.materials);
    handleFormikChange(params);
}

const ProductForm = ({ onSubmit, existingValues }) => {
    return (
        <Formik
            initialValues={existingValues ? existingValues : initialValues}
            validationSchema={getProductSchema(!!existingValues)}
            validateOnBlur
            enableReinitialize
            onSubmit={onSubmit}
            >
            {({ errors, touched, isSubmitting, values, handleChange, handleBlur, setFieldValue }) => {
                return (
                    <AddProductForm>
                        <AddProductInputLabel id="name-label">Product name</AddProductInputLabel>
                        <TextField
                            name="name"
                            onChange={handleChange}
                            defaultValue={values.name}
                            onBlur={handleBlur}
                            error={errors.name && touched.name}
                        />
                        {/* Explicit error so its obvious if unique name validation fails*/}
                        {errors.name && errors.name === 'Product name is not unique'
                            && <Alert severity='error' name="type" component="div">{errors.name}</Alert>}

                        <AddProductInputLabel id="types-label">Select product type</AddProductInputLabel>
                        <Select 
                            defaultValue={values.type}
                            name="type"
                            onChange={(params) => handleTypeChange(setFieldValue, handleChange, params)}
                        >
                            {clothingTypes.map(cType => {
                                return <MenuItem key={cType.id} value={cType.id}>{cType.label}</MenuItem>
                            })}
                        </Select>
                        {errors.type && touched.type && <Alert severity='error' name="type" component="div">Error: {errors.type}</Alert>}

                        {values.type && (
                            <>
                                <AddProductInputLabel id="sizes-label">Select product size(s)</AddProductInputLabel>
                                <Autocomplete
                                    // this key is a hacky way to clear the mui autocomplete when type changes, fix later
                                    key={`sizes-select-for-${values.type}`}
                                    multiple
                                    options={values.type === 'footwear' ? footwearSizes : clothingSizes}
                                    defaultValue={values.sizes}
                                    disableCloseOnSelect
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            error={errors.sizes && touched.sizes}
                                            {...params}
                                        />
                                    )}
                                    onChange={(_e, value) => {
                                        setFieldValue("sizes", value !== null ? value : initialValues.sizes);
                                    }}
                                />

                                <AddProductInputLabel id="features-label">Add product feature(s)</AddProductInputLabel>
                                <Autocomplete
                                    // this key is a hacky way to clear the mui autocomplete when type changes, fix later
                                    key={`features-select-for-${values.type}`}
                                    multiple
                                    freeSolo
                                    options={existingValues?.features ? existingValues.features : initialValues.features}
                                    defaultValue={values.features}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => {
                                      // label for dynamically added option
                                      if (option.inputValue) {
                                        return option.inputValue;
                                      }
                                      return option;
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title ? option.title : option}
                                        </li>
                                    )}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                
                                        const { inputValue } = params;
                                        // pop up element and allow the feature to be added
                                        const isExisting = filtered.some((option) => inputValue === option);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                title: `Add "${inputValue}"`,
                                            });
                                        }
                                
                                        return filtered;
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                error={errors.features && touched.features}
                                                {...params}
                                            />
                                        );
                                    }}
                                    onChange={(_e, values) => {
                                        const valuesToAdd = values?.map(v => v.inputValue ? v.inputValue : v);
                                        setFieldValue("features", values !== null ? valuesToAdd : initialValues.features);
                                    }}
                                />

                                {values.type === 'footwear' && 
                                    <>
                                        <AddProductInputLabel id="style-label">Product style</AddProductInputLabel>
                                        <TextField
                                            name="style"
                                            defaultValue={values.style}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.style && touched.style}
                                        />
                                    </>
                                }

                                {values.type === 'dress' && 
                                    <>
                                        <AddProductInputLabel id="colour-label">Product colour</AddProductInputLabel>
                                        <TextField
                                            name="colour"
                                            defaultValue={values.colour}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.colour && touched.colour}
                                        />
                                    </>
                                }

                                {(values.type === 'top' || values.type === 'outerwear') && 
                                    <>
                                        <AddProductInputLabel id="neckline-label">Product neckline</AddProductInputLabel>
                                        <TextField
                                            name="neckline"
                                            defaultValue={values.neckline}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.neckline && touched.neckline}
                                        />
                                    </>
                                }

                                {values.type === 'outerwear' && 
                                    <>
                                        <AddProductInputLabel id="materials-label">Product materials</AddProductInputLabel>
                                        <TextField
                                            name="materials"
                                            defaultValue={values.materials}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.materials && touched.materials}
                                        />
                                    </>
                                }

                                <AddProductInputLabel id="brand-label">Product brand</AddProductInputLabel>
                                <TextField
                                    name="brand"
                                    defaultValue={values.brand}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.brand && touched.brand}
                                />
                            </>
                        )}

                        <AddProductButton type="submit" variant="contained" disabled={isSubmitting}>
                            Submit
                        </AddProductButton>
                    </AddProductForm>
                );
            }}
        </Formik>
    )
}

// Further work/bugs
// TODO: Refactor this form so that the fields are their own components and 
// the form is built from a schema rather than using conditional renderering
// TODO: Optimise form and prevent unneccessary re-renders
// BUG: Fix controlled/uncontrolled errors for autocompletes
// BUG: Submit button should disable if there are errors in validation or is submitting


export default memo(ProductForm);
