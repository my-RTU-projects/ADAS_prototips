import {Box, Button, Typography} from "@mui/material";
import * as React from "react";
import ClientList from "../../components/service/ClientList";
import {useAtom} from "jotai";
import {clientAddModalOpenAtom, roleAtom} from "../../components/providers/atoms";
import CreateClientModal from "./CreateClientModal";
import {useAtomValue} from "jotai";
import {UserRole} from "../../utils/appTypes";

const ClientListPage = () => {
    const role = useAtomValue(roleAtom);
    const [isAddOpen, setAddOpen] = useAtom(clientAddModalOpenAtom);

    return (
        <Box>
            <Box display="flex">
                <Typography
                    textAlign="left"
                    variant="h5"
                    mt={1}
                    mb={1}
                >
                    Klienti
                </Typography>
                <Box sx={{ flex: "1 1 auto" }}/>
                {role === UserRole.SHIFT_LEADER ? (
                    <Button onClick={() => setAddOpen(true)}>
                        + Pievienot
                    </Button>
                ) : null}
            </Box>
            <ClientList />
            <CreateClientModal />
        </Box>
    );
};

export default ClientListPage;