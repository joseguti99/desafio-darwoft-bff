import { Button, TextField, Box } from '@mui/material';

export default function Search({ value, setValue, onSearch }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: '100%', mt: 2 }}
        >
            <TextField
                sx={{ width: '100%', backgroundColor: '#fff' }}
                variant="outlined"
                size="small"
                placeholder="Buscar..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSearch();
                }}
            />
            <Button
                variant="contained"
                size="medium"
                onClick={onSearch}
                disabled={!value.trim()}
                sx={{ whiteSpace: 'nowrap' }}
            >
                Buscar
            </Button>
        </Box>
    );
}
