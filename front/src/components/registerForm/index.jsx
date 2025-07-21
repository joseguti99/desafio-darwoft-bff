import { Box, Card, CardContent, Stack, TextField, Typography, Button, Alert, Grow } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { routesPaths } from '../../routes'

export default function RegisterForm({ form, handleChange, handleSubmit, errorMessage }) {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <Box sx={{ minWidth: '25%' }}>
                <Grow in timeout={300}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                                🔑 Registro
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        name="email"
                                        required
                                    />
                                    <TextField
                                        label="Contraseña"
                                        value={form.password}
                                        onChange={handleChange}
                                        name="password"
                                        type="password"
                                        required
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Registrarse
                                    </Button>
                                </Stack>
                            </Box>
                            <Stack spacing={1.5} sx={{ mt: 3 }}>
                                <Typography textAlign="center" variant="body2" color="text.secondary">
                                    ¿Ya tienes cuenta?
                                </Typography>
                                <Button
                                    onClick={() => navigate(routesPaths.login)}
                                    variant="outlined"
                                    startIcon={<PersonAddIcon />}
                                    sx={{ borderRadius: 2, fontWeight: 'bold', py: 1.2 }}>
                                    Ingresar
                                </Button>
                            </Stack>
                            <Stack spacing={1.5} sx={{ mt: 3 }}>
                                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grow>
            </Box>
        </Box>
    )
}