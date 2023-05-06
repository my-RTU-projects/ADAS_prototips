import {GridRenderCellParams} from "@mui/x-data-grid";
import {ReactChild, ReactNode} from "react";

export enum UserRole {
    SERVICE_WORKER = 'Servisa darbinieks',
    SHIFT_LEADER = 'Maiņas vadītājs',
    ACCOUNTANT = 'Grāmatvedis',
    WAREHOUSE_MANAGER = 'Noliktavas vadītājs',
    MARKETER = 'Marketologs',
    CEO = 'Direktors'
}

export interface Section {
    label: string;
    path: string;
    visibleFor: UserRole[];
}

export interface GridAction {
    action: (params: GridRenderCellParams) => void;
    icon: ReactNode;
    visibleFor: UserRole[];
}