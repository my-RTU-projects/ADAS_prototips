import {
    AppBar,
    Box, Button,
    Stack,
    Toolbar
} from "@mui/material";
import React from "react";
import RoleSelect from "./RoleSelect";
import {headerSections} from "./sections";
import {Link} from "react-router-dom";
import {useAtomValue} from "jotai";
import {roleAtom} from "../providers/atoms";

const Header = () => {
    const role = useAtomValue(roleAtom);

    return (
        <AppBar position="static" sx={{ maxHeight: "8vh", borderRadius: 0, boxShadow: 0 }}>
            <Toolbar disableGutters sx={{ maxHeight: "8vh", pl: 2, pr: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" alignContent="center" >
                    {headerSections.map(s =>
                        s.visibleFor.includes(role)
                            ? (<Link to={s.path}><Button sx={{ color: "white" }}>{s.label}</Button></Link>)
                            : null
                        )
                    }
                </Stack>

                <Box sx={{ flex: "1 1 auto" }}/>

                <Box>
                    <RoleSelect />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;