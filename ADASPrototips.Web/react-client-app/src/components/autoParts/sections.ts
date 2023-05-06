import {UserRole} from "../../utils/appTypes";

export const sections = [
    {
        label: "Auto rezerves daļas",
        path: "saraksts",
        visibleFor: [
            UserRole.WAREHOUSE_MANAGER,
            UserRole.CEO,
            UserRole.ACCOUNTANT,
            UserRole.SHIFT_LEADER,
            UserRole.SERVICE_WORKER
        ],
    },
    {
        label: "Auto detaļu pieprasījumi",
        path: "pieprasijumi",
        visibleFor: [
            UserRole.WAREHOUSE_MANAGER,
            UserRole.CEO,
            UserRole.ACCOUNTANT,
        ],
    }
];