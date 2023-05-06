import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useContext, useEffect} from "react";
import {DataQueryContext} from "../providers/DataQueryProvider";
import {useAtomValue} from "jotai/index";
import {autoPartEditModalOpenAtom, autoPartListAtom, roleAtom, selectedAutoPartAtom} from "../providers/atoms";
import Box from "@mui/material/Box";
import {useAtom} from "jotai";
import {GridAction, UserRole} from "../../utils/appTypes";

const AutoPartList = () => {
    const queryContext = useContext(DataQueryContext);

    const role = useAtomValue(roleAtom);
    const autoParts = useAtomValue(autoPartListAtom);
    const [isEditOpen, setEditOpen] = useAtom(autoPartEditModalOpenAtom);
    const [selectedAutoPart, setSelectedAutoPart] = useAtom(selectedAutoPartAtom);

    const actions: GridAction[] = [
        {
            action: (params) => {
                const autoPart = autoParts.find(x => x.id === params.id);
                setSelectedAutoPart(autoPart);
                setEditOpen(true);
            },
            icon: <EditIcon />,
            visibleFor: [UserRole.WAREHOUSE_MANAGER]
        }
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nosaukums', width: 150 },
        { field: 'productNumber', headerName: 'Produkta numurs', width: 150 },
        { field: 'quantity', headerName: 'Daudzums', width: 150 },
        { field: 'price', headerName: 'Cena', width: 150 },
        { field: 'purchasePrice', headerName: 'Iepirkuma cena', width: 150 },
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
        queryContext.getAutoParts();
    }, [])

    return (
        <Box>
            <DataGrid
                rows={autoParts}
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

export default AutoPartList;