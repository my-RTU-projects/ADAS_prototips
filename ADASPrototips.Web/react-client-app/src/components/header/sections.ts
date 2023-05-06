import {Section, UserRole} from "../../utils/appTypes";

export const headerSections: Section[] = [
    {
        label: "Noliktava",
        path: "/noliktava/saraksts",
        visibleFor: [
            UserRole.WAREHOUSE_MANAGER,
            UserRole.CEO,
            UserRole.ACCOUNTANT,
            UserRole.SHIFT_LEADER,
            UserRole.SERVICE_WORKER
        ]
    },
    {
        label: "Remonts",
        path: "/remonts/protokoli",
        visibleFor: [
            UserRole.CEO,
            UserRole.ACCOUNTANT,
            UserRole.SHIFT_LEADER,
            UserRole.SERVICE_WORKER
        ]
    },
    {
        label: "Nolīgšana",
        path: "/noligsana",
        visibleFor: [
            UserRole.CEO,
            UserRole.ACCOUNTANT
        ]
    },
    {
        label: "Finanses",
        path: "/finanses",
        visibleFor: [
            UserRole.CEO,
            UserRole.ACCOUNTANT
        ]
    },
    {
        label: "Mārketings",
        path: "/marketings",
        visibleFor: [
            UserRole.MARKETER,
            UserRole.CEO,
            UserRole.ACCOUNTANT
        ]
    }
];