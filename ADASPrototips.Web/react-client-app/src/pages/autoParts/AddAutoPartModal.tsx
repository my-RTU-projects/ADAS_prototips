import AutoPartForm from "../../components/autoParts/AutoPartForm";
import ModalBase from "../../components/ModelBase";
import {FormikHelpers, useFormik} from "formik";
import {AutoPartModel} from "../../models/AutoPartModel";
import {useContext} from "react";
import {DataQueryContext} from "../../components/providers/DataQueryProvider";
import {useAtom} from "jotai";
import {autoPartAddModalOpenAtom} from "../../components/providers/atoms";

const AddAutoPartModal = () => {
    const queryContext = useContext(DataQueryContext);

    const [isOpen, setOpen] = useAtom(autoPartAddModalOpenAtom);

    const formik = useFormik<AutoPartModel>({
        initialValues: {
            id: 0,
            name: "",
            productNumber: "",
            quantity: 0,
            price: 0,
            purchasePrice: 0
        },
        enableReinitialize: true,
        onSubmit: (values: AutoPartModel, formikHelpers: FormikHelpers<AutoPartModel>) => {
            queryContext.addAutoPart(values);
            formikHelpers.resetForm();
            setOpen(false);
        }
    });

    return (
        <ModalBase
            open={isOpen}
            title={"Pievienot detaļu"}
            form={
                <AutoPartForm
                    type="add"
                    formik={formik}
                />
            }
            acceptLabel={"Izveidot"}
            onAccept={() => formik.handleSubmit()}
            onClose={() => setOpen(false)}
            closable
        />
    );
};

export default AddAutoPartModal;