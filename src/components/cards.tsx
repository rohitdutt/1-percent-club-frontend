import React from 'react';
import { Avatar, Card, CardContent, Stack, Typography} from '@mui/material';
import "./cards.css"

const Cards: React.FC<any> = ({title, count}) => {
    return(
        <>
            <Card style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
                <CardContent>
                    <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                    >
                    <Stack spacing={1}>
                        <Typography
                        color="text.secondary"
                        variant="overline"
                        >
                        {title}
                        </Typography>
                        <Typography variant="h4">
                        {count}
                        </Typography>
                    </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
  };
  
export default Cards;