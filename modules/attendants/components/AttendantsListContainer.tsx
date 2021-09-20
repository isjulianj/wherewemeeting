import React, {ReactNode} from 'react';
import {
    useGetRecoilValueInfo_UNSTABLE,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState
} from "recoil";
import {AttendantsState, AttendantState} from "../../../core/state/AttendantsState";
import {Box, Button, CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {Attendant} from "../domain/attendant";
import {useMapContext} from "../../../context/Map.context";


interface IAttendantListItemProps {
    attendantItem: Attendant;
}

export const AttendantListItem = ({attendantItem}: IAttendantListItemProps) => {


    const attendant= useRecoilValue(AttendantState(attendantItem.id))

    const attendants = useRecoilValue(AttendantsState)

    // TODO: best way to remove state?
    const removeAttendant = useRecoilCallback(
        ({set, reset}) => (attendant: Attendant) => {
            set(AttendantsState, (e) => {
                    const updatedAttendants = attendants.filter(item => item.id !== attendant.id);
                    return [...updatedAttendants]
                }
            )
            reset(AttendantState(attendant.id))

        },
        [attendants.length],
    )


    const {vectorImageLayer} = useMapContext();
    // const resetAttendant = useResetRecoilState(AttendantState(attendant.id))

    // const removeAttendant = () => {
    //     console.log('attendants beofre', attendants)
    //     resetAttendant();
    //     console.log('attendants after', attendants)
    //
    // }


    return (
        <>
            {attendant.id !== null && (
                <Box marginBottom={2}>
                    <Card>
                        <div>
                            <CardContent>
                                <Typography component="h5" variant="h5">
                                    {attendantItem.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {attendantItem.location.locationName}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {attendantItem.id}
                                </Typography>
                            </CardContent>
                        </div>
                        {/*<CardMedia*/}
                        {/*    image="/static/images/cards/live-from-space.jpg"*/}
                        {/*    title="Live from space album cover"*/}
                        {/*/>*/}
                    </Card>
                    <Button onClick={() => removeAttendant(attendant)}>remove</Button>
                </Box>
            )}
        </>
    );
};


interface IAttendantsContainerProps {
    children: ReactNode;
}

export const AttendantsListContainer = ({children}: IAttendantsContainerProps) => {

    return (
        <div className='container'>
            {children}
        </div>
    );
};


