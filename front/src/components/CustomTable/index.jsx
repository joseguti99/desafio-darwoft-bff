import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material";

export default function DynamicTable({ columns, rows }) {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: "#d0d7e1" }}>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.key}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {col.label.toUpperCase()}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <Typography variant="body2" color="textSecondary">
                                    Sin registros disponibles
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, idx) => (
                            <TableRow key={idx}>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {col.render
                                            ? col.render(row[col.key], row)
                                            : String(row[col.key] || '')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
