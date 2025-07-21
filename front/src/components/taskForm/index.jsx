import { Box, Card, CardContent, Stack, TextField, Typography, Button } from '@mui/material'

export default function TaskForm({ form, isEditionMode, handleChange, handleSubmit, errorMessage }) {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                        📝 {isEditionMode ? 'Editar tarea' : 'Crear tarea'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Título"
                                value={form.title}
                                onChange={handleChange}
                                name="title"
                                required
                            />
                            <TextField
                                label="Descripción"
                                value={form.text}
                                onChange={handleChange}
                                name="text"
                                multiline
                                rows={3}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {isEditionMode ? 'Guardar' : 'Crear tarea'}
                            </Button>
                        </Stack>
                    </Box>
                    <Stack spacing={1.5} sx={{ mt: 3 }}>
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}