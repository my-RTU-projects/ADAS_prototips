import {Stack, TextField} from "@mui/material";
import {FormikProps} from "formik";
import {ClientModel} from "../../models/ClientModel";

interface ClientFormFormProps {
    type: "create" | "edit";
    formik: FormikProps<ClientModel>
}

const ClientForm = ({type, formik}: ClientFormFormProps) => {
    return (
        <Stack spacing={2} mt={1}>
            <TextField
                variant="outlined"
                fullWidth
                name="name"
                label="Vārds"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                variant="outlined"
                fullWidth
                name="phone"
                label="Telefons"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />
        </Stack>
    );
};

export default ClientForm;