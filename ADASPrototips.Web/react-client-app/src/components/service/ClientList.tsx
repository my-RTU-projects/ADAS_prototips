import Box from "@mui/material/Box";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {useContext, useEffect} from "react";
import {DataQueryContext} from "../providers/DataQueryProvider";
import {useAtomValue} from "jotai";
import {clientListAtom} from "../providers/atoms";

const ClientList = () => {
    const queryContext = useContext(DataQueryContext);

    const clients = useAtomValue(clientListAtom);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Vārds', width: 150 },
        { field: 'phone', headerName: 'Telefons', width: 150 },
    ];

    useEffect(() => {
        queryContext.getClients();
    }, [])

    return (
        <Box>
            <DataGrid
                rows={clients}
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

export default ClientList;