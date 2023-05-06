import {Section} from "../utils/appTypes";
import React from "react";
import {Grid, List, ListItemButton, ListItemText, Menu, MenuItem} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useAtomValue} from "jotai";
import {roleAtom} from "./providers/atoms";

interface SubsectionMenuLayoutProps {
    items: Section[];
    children: React.ReactNode;
    basePath: string;
}

const SubsectionMenuLayout: React.FC<SubsectionMenuLayoutProps> = ({items, children, basePath}: SubsectionMenuLayoutProps) => {
    const location = useLocation();
    const role = useAtomValue(roleAtom);

    return (
        <Grid container>
            <Grid item xs={3}>
                <List sx={{bgcolor: "lightGray", minHeight: "92vh", p: 1}}>
                    {items.filter(x => x.visibleFor.includes(role)).map(item =>
                        <Link to={item.path} style={{ textDecoration: 'none' }}>
                            <ListItemButton
                                selected={location.pathname === `/${basePath}/${item.path}`}
                            >
                                <ListItemText primary={item.label} sx={{ color: "black" }} />
                            </ListItemButton>
                        </Link>
                    )}
                </List>
            </Grid>
            <Grid item xs={9} p={2}>
                {children}
            </Grid>
        </Grid>
    );
};

export default SubsectionMenuLayout;