import ModalBase from "../../components/ModelBase";
import {FormikHelpers, useFormik} from "formik";
import {useContext} from "react";
import {DataQueryContext} from "../../components/providers/DataQueryProvider";
import {useAtom} from "jotai";
import {
    autoPartAddModalOpenAtom,
    clientAddModalOpenAtom,
    clientOrderCreateModalOpenAtom, clientOrderEditModalOpenAtom, selectedClientOrderAtom
} from "../../components/providers/atoms";
import {ClientModel} from "../../models/ClientModel";
import ClientForm from "../../components/service/ClientForm";
import ClientOrderForm from "../../components/service/ClientOrderForm";
import {ClientOrderModel} from "../../models/ClientOrderModel";

const EditProtocolModal = () => {
    const queryContext = useContext(DataQueryContext);

    const [isOpen, setOpen] = useAtom(clientOrderEditModalOpenAtom);
    const [selectedClientOrder, setSelectedClientOrder] = useAtom(selectedClientOrderAtom);

    const formik = useFormik<ClientOrderModel>({
        initialValues: selectedClientOrder ?? {
            id: 0,
            clientId: 0,
            description: "",
            comment: "",
            bill: null,
            expenses: null
        },
        enableReinitialize: true,
        onSubmit: (values: ClientOrderModel, formikHelpers: FormikHelpers<ClientOrderModel>) => {
            queryContext.editClientOrder(values);
            formikHelpers.resetForm();
            setOpen(false);
        }
    });

    if (!selectedClientOrder) {
        setOpen(false);
        return null;
    }

    return (
        <ModalBase
            open={isOpen}
            title={"Rediģēt protokolu"}
            form={
                <ClientOrderForm
                    type="edit"
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

export default EditProtocolModal;