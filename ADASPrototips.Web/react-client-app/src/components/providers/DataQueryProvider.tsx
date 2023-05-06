import React, {createContext} from "react";
import axios from "../../utils/axios";
import {enqueueSnackbar} from "notistack";
import {useAtom} from "jotai";
import {
    autoPartListAtom,
    autoPartsRequestListAtom,
    clientListAtom,
    clientOrderListAtom,
    jobApplicantListAtom, jobPositionListAtom, jobVacancyListAtom, workerListAtom
} from "./atoms";
import {AutoPartModel} from "../../models/AutoPartModel";
import {AutoPartsRequestModel} from "../../models/AutoPartsRequestModel";
import {ClientModel} from "../../models/ClientModel";
import {ClientOrderModel} from "../../models/ClientOrderModel";
import {JobPositionModel} from "../../models/JobPositionModel";
import {JobApplicantModel} from "../../models/JobApplicantModel";
import {JobVacancyModel} from "../../models/JobVacancyModel";
import {WorkerModel} from "../../models/WorkerModel";

interface DataQueryContextState {
    getAutoParts: () => void;
    addAutoPart: (model: AutoPartModel) => void;
    editAutoPart: (model: AutoPartModel) => void;
    getAutoPartsRequests: () => void;
    createAutoPartsRequest: (model: AutoPartsRequestModel) => void;
    answerAutoPartsRequest: (model: AutoPartsRequestModel) => void;
    getClients: () => void;
    createClient: (model: ClientModel) => void;
    getClientOrders: () => void;
    createClientOrder: (model: ClientOrderModel) => void;
    editClientOrder: (model: ClientOrderModel) => void;
    getJobPositions: () => void;
    createJobPosition: (model: JobPositionModel) => void;
    getJobApplicants: () => void;
    createJobApplicant: (model: JobApplicantModel) => void;
    editJobApplicant: (model: JobApplicantModel) => void;
    getJobVacancies: () => void;
    createJobVacancy: (model: JobVacancyModel) => void;
    editJobVacancy: (model: JobVacancyModel) => void;
    getWorkers: () => void;
    createWorker: (model: WorkerModel) => void;
    editWorker: (model: WorkerModel) => void;
}

interface DataQueryProviderProps {
    children: React.ReactNode;
}

export const DataQueryContext = createContext<DataQueryContextState>({} as DataQueryContextState);

const DataQueryProvider: React.FC<DataQueryProviderProps> = ({ children }: DataQueryProviderProps) => {
    const [autoPartList, setAutoPartList] = useAtom(autoPartListAtom);
    const [autoPartsRequestList, setAutoPartsRequestList] = useAtom(autoPartsRequestListAtom);
    const [clientList, setClientList] = useAtom(clientListAtom);
    const [clientOrderList, setClientOrderList] = useAtom(clientOrderListAtom);
    const [jobApplicantList, setJobApplicantList] = useAtom(jobApplicantListAtom);
    const [jobPositionList, setJobPositionList] = useAtom(jobPositionListAtom);
    const [jobVacancyList, setJobVacancyList] = useAtom(jobVacancyListAtom);
    const [workerList, setWorkerList] = useAtom(workerListAtom);

    const getAutoParts = () => {
        axios
            .get<Array<AutoPartModel>>(`api/autoParts`)
            .then(response => {
                setAutoPartList(response.data);
                console.log(response.data)
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const addAutoPart = (model: AutoPartModel) => {
        axios
            .post(`api/autoParts/add`, model)
            .then(() => {
                getAutoParts();
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const editAutoPart = (model: AutoPartModel) => {
        axios
            .post(`api/autoParts/edit`, model)
            .then(() => {
                getAutoParts();
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getAutoPartsRequests = () => {
        axios
            .get<Array<AutoPartsRequestModel>>(`api/autoParts/requests`)
            .then(response => {
                setAutoPartsRequestList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createAutoPartsRequest = (model: AutoPartsRequestModel) => {
        axios
            .post(`api/autoParts/requests/create`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const answerAutoPartsRequest = (model: AutoPartsRequestModel) => {
        axios
            .post(`api/autoParts/requests/answer`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getClients = () => {
        axios
            .get<Array<ClientModel>>(`api/clients`)
            .then(response => {
                setClientList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createClient = (model: ClientModel) => {
        axios
            .post(`api/clients/create`, model)
            .then(() => {
                getClients();
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    }

    const getClientOrders = () => {
        axios
            .get<Array<ClientOrderModel>>(`api/orders`)
            .then(response => {
                setClientOrderList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createClientOrder = (model: ClientOrderModel) => {
        axios
            .post(`api/orders/create`, model)
            .then(() => {
                getClientOrders();
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const editClientOrder = (model: ClientOrderModel) => {
        axios
            .post(`api/orders/edit`, model)
            .then(() => {
                getClientOrders();
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getJobPositions = () => {
        axios
            .get<Array<JobPositionModel>>(`api/jobPositions`)
            .then(response => {
                setJobPositionList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createJobPosition = (model: JobPositionModel) => {
        axios
            .post(`api/jobPositions/create`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getJobApplicants = () => {
        axios
            .get<Array<JobApplicantModel>>(`api/jobApplicants`)
            .then(response => {
                setJobApplicantList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createJobApplicant = (model: JobApplicantModel) => {
        axios
            .post(`api/jobApplicants/create`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const editJobApplicant = (model: JobApplicantModel) => {
        axios
            .post(`api/jobApplicants/edit`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getJobVacancies = () => {
        axios
            .get<Array<JobVacancyModel>>(`api/vacancies`)
            .then(response => {
                setJobVacancyList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createJobVacancy = (model: JobVacancyModel) => {
        axios
            .post(`api/vacancies/create`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const editJobVacancy = (model: JobVacancyModel) => {
        axios
            .post(`api/vacancies/edit`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const getWorkers = () => {
        axios
            .get<Array<WorkerModel>>(`api/workers`)
            .then(response => {
                setWorkerList(response.data);
            })
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const createWorker = (model: WorkerModel) => {
        axios
            .post(`api/workers/create`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    const editWorker = (model: WorkerModel) => {
        axios
            .post(`api/workers/edit`, model)
            .catch(reason => enqueueSnackbar(reason.response.data, {variant: "error"}));
    };

    return (
        <DataQueryContext.Provider
            value={{
                getAutoParts: getAutoParts,
                addAutoPart: addAutoPart,
                editAutoPart: editAutoPart,
                getAutoPartsRequests: getAutoPartsRequests,
                createAutoPartsRequest: createAutoPartsRequest,
                answerAutoPartsRequest: answerAutoPartsRequest,
                getClients: getClients,
                createClient: createClient,
                getClientOrders: getClientOrders,
                createClientOrder: createClientOrder,
                editClientOrder: editClientOrder,
                getJobPositions: getJobPositions,
                createJobPosition: createJobPosition,
                getJobApplicants: getJobApplicants,
                createJobApplicant: createJobApplicant,
                editJobApplicant: editJobApplicant,
                getJobVacancies: getJobVacancies,
                createJobVacancy: createJobVacancy,
                editJobVacancy: editJobVacancy,
                getWorkers: getWorkers,
                createWorker: createWorker,
                editWorker: editWorker
            }}
        >
            {children}
        </DataQueryContext.Provider>
    );
}

export default DataQueryProvider;