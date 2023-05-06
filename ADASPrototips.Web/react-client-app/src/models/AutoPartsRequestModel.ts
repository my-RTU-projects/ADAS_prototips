import { AutoPartsRequestStatus } from "./AutoPartsRequestStatus";
import { AutoPartsRequestComponentModel } from "./AutoPartsRequestComponentModel";

export interface AutoPartsRequestModel {
    id: number;
    status: AutoPartsRequestStatus;
    justification: string;
    components: AutoPartsRequestComponentModel[];
}