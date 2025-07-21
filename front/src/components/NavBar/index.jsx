import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, FormGroup, FormControlLabel, Switch, Stack } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useAuth } from "../../context/auth/authContext";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const { logout } = useAuth()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <LibraryBooksIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                        Gestion de Tareas
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            sx={{
                                mt: '3rem',
                                '& .MuiPaper-root': {
                                    borderRadius: 2,
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                    minWidth: 200,
                                    padding: 1,
                                },
                            }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={logout}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LogoutIcon fontSize="small" />
                                    <Typography textAlign="center">Cerrar sesion</Typography>
                                </Stack>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}