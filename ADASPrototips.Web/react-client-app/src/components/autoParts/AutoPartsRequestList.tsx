import Box from "@mui/material/Box";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {useContext, useEffect} from "react";
import {DataQueryContext} from "../providers/DataQueryProvider";
import {useAtomValue} from "jotai";
import {autoPartsRequestListAtom, roleAtom} from "../providers/atoms";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {GridAction, UserRole} from "../../utils/appTypes";
import {AutoPartsRequestStatus} from "../../models/AutoPartsRequestStatus";

const AutoPartsRequestList = () => {
    const queryContext = useContext(DataQueryContext);

    const role = useAtomValue(roleAtom);
    const autoPartsRequests = useAtomValue(autoPartsRequestListAtom);

    const actions: GridAction[] = [
        {
            action: (params) => {
                console.log("Nepietika budžeta. Funkcionālitāte tiks pabeigta pēc finansējuma palielināšanas")
            },
            icon: <EditIcon />,
            visibleFor: [UserRole.WAREHOUSE_MANAGER]
        },
        {
            action: (params) => {
                console.log("Nepietika budžeta. Funkcionālitāte tiks pabeigta pēc finansējuma palielināšanas")
            },
            icon: <CheckIcon />,
            visibleFor: [UserRole.ACCOUNTANT, UserRole.CEO]
        },
        {
            action: (params) => {
                console.log("Nepietika budžeta. Funkcionālitāte tiks pabeigta pēc finansējuma palielināšanas")
            },
            icon: <CloseIcon />,
            visibleFor: [UserRole.ACCOUNTANT, UserRole.CEO]
        }
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const request = autoPartsRequests.find(x => x.id === params.id);
                switch (request?.status) {
                    case AutoPartsRequestStatus.PROCESSING:
                        return "Apstrādē";
                    case AutoPartsRequestStatus.APPROVED:
                        return "Apstiprināts";
                    case AutoPartsRequestStatus.REJECTED:
                        return "Noraidīts";
                    default:
                        return "-";
                }
            },
        },
        { field: 'justification', headerName: 'Pamatojums', width: 350 },
        {
            field: 'actions',
            headerName: 'Darbības',
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    {actions.filter(a => a.visibleFor.includes(role)).map(a => (
                        <IconButton
                            size="small"
                            onClick={() => a.action(params)}
                        >
                            {a.icon}
                        </IconButton>
                    ))}
                </Box>
            ),
        },
    ];

    useEffect(() => {
        queryContext.getAutoPartsRequests();
    }, [])

    return (
        <Box>
            <DataGrid
                rows={autoPartsRequests}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default AutoPartsRequestList;