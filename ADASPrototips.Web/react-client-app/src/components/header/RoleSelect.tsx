import React, {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {useAtom} from "jotai";
import {roleAtom} from "../providers/atoms";
import {useNavigate} from "react-router-dom";
import {UserRole} from "../../utils/appTypes";

const roleItems = Object.values(UserRole);

const RoleSelect = () => {
    const [role, setRole] = useAtom(roleAtom);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                color="inherit"
                variant="outlined"
                onClick={handleClick}
            >
                {role}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {roleItems.map(item =>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            navigate("/");
                            setRole(item);
                        }}
                    >
                        {item}
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}

export default RoleSelect;
