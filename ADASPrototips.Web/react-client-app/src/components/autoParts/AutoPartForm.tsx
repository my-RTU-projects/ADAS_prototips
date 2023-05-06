import {Stack, TextField} from "@mui/material";
import {AutoPartModel} from "../../models/AutoPartModel";
import {FormikProps} from "formik";

interface AutoPartFormProps {
    type: "add" | "edit";
    formik: FormikProps<AutoPartModel>
}

const AutoPartForm = ({type, formik}: AutoPartFormProps) => {
    return (
        <Stack spacing={2} mt={1}>
            <TextField
                variant="outlined"
                fullWidth
                name="name"
                label="Nosaukums"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                variant="outlined"
                fullWidth
                name="productNumber"
                label="Produkta numurs"
                value={formik.values.productNumber}
                onChange={formik.handleChange}
                error={formik.touched.productNumber && Boolean(formik.errors.productNumber)}
                helperText={formik.touched.productNumber && formik.errors.productNumber}
            />
            <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="quantity"
                label="Skaits"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
            />
            <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="price"
                label="Cena"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="purchasePrice"
                label="Iepirkuma cena"
                value={formik.values.purchasePrice}
                onChange={formik.handleChange}
                error={formik.touched.purchasePrice && Boolean(formik.errors.purchasePrice)}
                helperText={formik.touched.purchasePrice && formik.errors.purchasePrice}
            />
        </Stack>
    );
};

export default AutoPartForm;