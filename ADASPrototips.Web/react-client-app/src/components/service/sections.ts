import {UserRole} from "../../utils/appTypes";

export const sections = [
    {
        label: "Protokoli",
        path: "protokoli",
        visibleFor: [
            UserRole.CEO,
            UserRole.ACCOUNTANT,
            UserRole.SHIFT_LEADER,
            UserRole.SERVICE_WORKER
        ],
    },
    {
        label: "Klienti",
        path: "klienti",
        visibleFor: [
            UserRole.CEO,
            UserRole.ACCOUNTANT,
            UserRole.SHIFT_LEADER,
            UserRole.SERVICE_WORKER
        ],
    }
];