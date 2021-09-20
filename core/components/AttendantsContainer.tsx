import React from 'react';
import {useRecoilValue, useSetRecoilState} from "recoil";
import { AttendantState} from "../atoms/AttendantsState";
import {Box, CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {Attendant} from "../domain/attendant";



interface IAttendantListItemProps {
    attendant: Attendant;
}

export const AttendantListItem = ({attendant}: IAttendantListItemProps) => {

    return (
        <Box marginBottom={2}>
            <Card>
                <div>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            {attendant.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {attendant.location.locationName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {attendant.id}
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



interface IAttendantsContainerProps {
    attendantId: UniqueId;
}

export const AttendantsContainer = ({attendantId}: IAttendantsContainerProps) => {

    const attendant = useRecoilValue(AttendantState(attendantId))
    const setAttendant = useSetRecoilState(AttendantState(attendantId))


    console.log('attendant', attendant);
    console.log(() => setAttendant)
    return (
        <>
          <AttendantListItem attendant={attendant}></AttendantListItem>
        </>
    );
};


