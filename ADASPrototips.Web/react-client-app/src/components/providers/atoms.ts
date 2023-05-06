import {atom} from "jotai";
import {AutoPartModel} from "../../models/AutoPartModel";
import {AutoPartsRequestModel} from "../../models/AutoPartsRequestModel";
import {ClientModel} from "../../models/ClientModel";
import {ClientOrderModel} from "../../models/ClientOrderModel";
import {JobApplicantModel} from "../../models/JobApplicantModel";
import {JobPositionModel} from "../../models/JobPositionModel";
import {JobVacancyModel} from "../../models/JobVacancyModel";
import {WorkerModel} from "../../models/WorkerModel";
import {Section, UserRole} from "../../utils/appTypes";

export const roleAtom = atom<UserRole>(UserRole.SERVICE_WORKER);

export const autoPartAddModalOpenAtom = atom<boolean>(false);
export const autoPartEditModalOpenAtom = atom<boolean>(false);
export const selectedAutoPartAtom = atom<AutoPartModel | undefined>(undefined);
export const clientAddModalOpenAtom = atom<boolean>(false);
export const clientOrderCreateModalOpenAtom = atom<boolean>(false);
export const clientOrderEditModalOpenAtom = atom<boolean>(false);
export const selectedClientOrderAtom = atom<ClientOrderModel | undefined>(undefined);

export const autoPartListAtom = atom<Array<AutoPartModel>>([]);
export const autoPartsRequestListAtom = atom<Array<AutoPartsRequestModel>>([]);
export const clientListAtom = atom<Array<ClientModel>>([]);
export const clientOrderListAtom = atom<Array<ClientOrderModel>>([]);
export const jobApplicantListAtom = atom<Array<JobApplicantModel>>([]);
export const jobPositionListAtom = atom<Array<JobPositionModel>>([]);
export const jobVacancyListAtom = atom<Array<JobVacancyModel>>([]);
export const workerListAtom = atom<Array<WorkerModel>>([]);



