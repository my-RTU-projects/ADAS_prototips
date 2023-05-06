import Box from "@mui/material/Box";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {useContext, useEffect} from "react";
import {DataQueryContext} from "../providers/DataQueryProvider";
import {useAtomValue} from "jotai";
import {
    autoPartListAtom,
    clientListAtom,
    clientOrderEditModalOpenAtom,
    clientOrderListAtom,
    selectedClientOrderAtom
} from "../providers/atoms";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useAtom} from "jotai";

const ProtocolList = () => {
    const queryContext = useContext(DataQueryContext);

    const clientOrders = useAtomValue(clientOrderListAtom);
    const clients = useAtomValue(clientListAtom);

    const [isEditOpen, setEditOpen] = useAtom(clientOrderEditModalOpenAtom);
    const [selectedClientOrder, setSelectedClientOrder] = useAtom(selectedClientOrderAtom);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'client',
            headerName: 'Klients',
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const order = clientOrders.find(x => x.id === params.id);
                const client = clients.find(x => x.id === order?.clientId);
                return client?.name;
            },
        },
        { field: 'description', headerName: 'Apraksts', width: 150 },
        { field: 'comment', headerName: 'Eksperta komentārs', width: 150 },
        { field: 'bill', headerName: 'Rēķins', width: 150 },
        { field: 'expenses', headerName: 'Izmaksas', width: 150 },
        {
            field: 'actions',
            headerName: 'Darbības',
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    size="small"
                    onClick={() => {
                        const order = clientOrders.find(x => x.id === params.id);
                        setSelectedClientOrder(order);
                        setEditOpen(true);
                    }}
                >
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    useEffect(() => {
        queryContext.getClientOrders();
        queryContext.getClients();
    }, [])

    return (
        <Box>
            <DataGrid
                rows={clientOrders}
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

export default ProtocolList;