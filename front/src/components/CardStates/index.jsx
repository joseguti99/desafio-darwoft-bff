import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function CardStates({ data }) {
    return (
        <Grid container justifyContent="space-between">
            {data.length && data.map((item) => {
                return (
                    <Card key={item.label} style={{ width: '30%', margin: 10, backgroundColor: '#fff' }}>
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {item.value}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {item.label}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </Grid>
    )
}