import ModalBase from "../../components/ModelBase";
import {FormikHelpers, useFormik} from "formik";
import {useContext} from "react";
import {DataQueryContext} from "../../components/providers/DataQueryProvider";
import {useAtom} from "jotai";
import {autoPartAddModalOpenAtom, clientAddModalOpenAtom} from "../../components/providers/atoms";
import {ClientModel} from "../../models/ClientModel";
import ClientForm from "../../components/service/ClientForm";

const CreateClientModal = () => {
    const queryContext = useContext(DataQueryContext);

    const [isOpen, setOpen] = useAtom(clientAddModalOpenAtom);

    const formik = useFormik<ClientModel>({
        initialValues: {
            id: 0,
            name: "",
            phone: "",
            orders: null
        },
        enableReinitialize: true,
        onSubmit: (values: ClientModel, formikHelpers: FormikHelpers<ClientModel>) => {
            queryContext.createClient(values);
            formikHelpers.resetForm();
            setOpen(false);
        }
    });

    return (
        <ModalBase
            open={isOpen}
            title={"Pievienot klientu"}
            form={
                <ClientForm
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

export default CreateClientModal;