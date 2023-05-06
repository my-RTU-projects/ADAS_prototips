import {MenuItem, Stack, TextField, Typography} from "@mui/material";
import {FormikProps} from "formik";
import {ClientOrderModel} from "../../models/ClientOrderModel";
import {useAtomValue} from "jotai";
import {clientListAtom, roleAtom} from "../providers/atoms";
import {UserRole} from "../../utils/appTypes";

interface ClientOrderFormFormProps {
    type: "create" | "edit";
    formik: FormikProps<ClientOrderModel>
}

const ClientOrderForm = ({type, formik}: ClientOrderFormFormProps) => {
    const role = useAtomValue(roleAtom);
    const clients = useAtomValue(clientListAtom)

    return (
        <Stack spacing={2} mt={1}>
            <TextField
                disabled={role !== UserRole.SHIFT_LEADER}
                variant="outlined"
                fullWidth
                id="clientId"
                name="clientId"
                label="Klients"
                value={formik.values.clientId}
                onChange={formik.handleChange}
                error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                helperText={formik.touched.clientId && formik.errors.clientId}
                SelectProps={{
                    displayEmpty: true,
                    MenuProps: {
                        sx: {
                            maxHeight: "40vh"
                        }
                    }
                }}
                select
            >
                <MenuItem value="">{" "}</MenuItem>
                {
                    clients
                        .map(client =>
                            <MenuItem value={client.id}>
                                <Typography>{client.name}</Typography>
                            </MenuItem>
                        )
                }
            </TextField>
            <TextField
                disabled={role !== UserRole.SHIFT_LEADER}
                multiline
                variant="outlined"
                fullWidth
                name="description"
                label="Apraksts"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
                multiline
                variant="outlined"
                fullWidth
                name="comment"
                label="Komentārs"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
            />
            <TextField
                disabled={role !== UserRole.SHIFT_LEADER}
                type="number"
                variant="outlined"
                fullWidth
                name="bill"
                label="Rēkins"
                value={formik.values.bill}
                onChange={formik.handleChange}
                error={formik.touched.bill && Boolean(formik.errors.bill)}
                helperText={formik.touched.bill && formik.errors.bill}
            />
            <TextField
                disabled={role !== UserRole.SHIFT_LEADER}
                type="number"
                variant="outlined"
                fullWidth
                name="expenses"
                label="Izmāksas"
                value={formik.values.expenses}
                onChange={formik.handleChange}
                error={formik.touched.expenses && Boolean(formik.errors.expenses)}
                helperText={formik.touched.expenses && formik.errors.expenses}
            />
        </Stack>
    );
};

export default ClientOrderForm;