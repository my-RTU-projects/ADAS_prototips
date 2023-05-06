import AutoPartForm from "../../components/autoParts/AutoPartForm";
import ModalBase from "../../components/ModelBase";
import {FormikHelpers, useFormik} from "formik";
import {AutoPartModel} from "../../models/AutoPartModel";
import {useContext} from "react";
import {DataQueryContext} from "../../components/providers/DataQueryProvider";
import {useAtom} from "jotai";
import {
    autoPartEditModalOpenAtom,
    selectedAutoPartAtom
} from "../../components/providers/atoms";

const EditAutoPartModal = () => {
    const queryContext = useContext(DataQueryContext);

    const [isOpen, setOpen] = useAtom(autoPartEditModalOpenAtom);
    const [selectedAutoPart, setSelectedAutoPart] = useAtom(selectedAutoPartAtom);

    const formik = useFormik<AutoPartModel>({
        initialValues: selectedAutoPart ?? {
            id: 0,
            name: "",
            productNumber: "",
            quantity: 0,
            price: 0,
            purchasePrice: 0
        },
        enableReinitialize: true,
        onSubmit: (values: AutoPartModel, formikHelpers: FormikHelpers<AutoPartModel>) => {
            queryContext.editAutoPart(values);
            setSelectedAutoPart(undefined);
            formikHelpers.resetForm();
            setOpen(false);
        }
    });

    if (!selectedAutoPart) {
        setOpen(false);
        return null;
    }

    return (
        <ModalBase
            open={isOpen}
            title={"Rediģēt informāciju par automašīnas daļu"}
            form={
                <AutoPartForm
                    type="edit"
                    formik={formik}
                />
            }
            acceptLabel={"Saglabāt"}
            onAccept={() => formik.handleSubmit()}
            onClose={() => setOpen(false)}
            closable
        />
    );
};

export default EditAutoPartModal;
