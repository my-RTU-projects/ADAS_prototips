import ModalBase from "../../components/ModelBase";
import {FormikHelpers, useFormik} from "formik";
import {useContext} from "react";
import {DataQueryContext} from "../../components/providers/DataQueryProvider";
import {useAtom} from "jotai";
import {
    autoPartAddModalOpenAtom,
    clientAddModalOpenAtom,
    clientOrderCreateModalOpenAtom
} from "../../components/providers/atoms";
import {ClientModel} from "../../models/ClientModel";
import ClientForm from "../../components/service/ClientForm";
import ClientOrderForm from "../../components/service/ClientOrderForm";
import {ClientOrderModel} from "../../models/ClientOrderModel";

const CreateProtocolModal = () => {
    const queryContext = useContext(DataQueryContext);

    const [isOpen, setOpen] = useAtom(clientOrderCreateModalOpenAtom);

    const formik = useFormik<ClientOrderModel>({
        initialValues: {
            id: 0,
            clientId: 0,
            description: "",
            comment: "",
            bill: null,
            expenses: null
        },
        enableReinitialize: true,
        onSubmit: (values: ClientOrderModel, formikHelpers: FormikHelpers<ClientOrderModel>) => {
            queryContext.createClientOrder(values);
            formikHelpers.resetForm();
            setOpen(false);
        }
    });

    return (
        <ModalBase
            open={isOpen}
            title={"Pievienot protokolu"}
            form={
                <ClientOrderForm
                    type="create"
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

export default CreateProtocolModal;