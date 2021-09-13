import React from 'react';
import Card from '@material-ui/core/Card';
import {Box, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {Attendant} from "../domain/attendant";

interface IAttendantListItemProps {
    attendant: Attendant;
}

export const AttendantListItem = (props: IAttendantListItemProps) => {
    return (
        <Box marginBottom={2}>
            <Card>
                <div>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            {props.attendant.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.attendant.location.locationName}
                        </Typography>
                    </CardContent>
                </div>
                {/*<CardMedia*/}
                {/*    image="/static/images/cards/live-from-space.jpg"*/}
                {/*    title="Live from space album cover"*/}
                {/*/>*/}
            </Card>
        </Box>
    );
};
