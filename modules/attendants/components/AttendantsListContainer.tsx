import React, {ReactNode} from 'react';
import {
    useRecoilCallback,
    useRecoilValue,
} from "recoil";
import {AttendantsState, AttendantState} from "../../../core/state/AttendantsState";
import {Box, Button, CardActionArea, CardContent, CardMedia, Typography, Card} from "@mui/material";
import {Attendant} from "../../../domain/attendant";
import {useMapContext} from "../../../context/Map.context";



interface IAttendantListItemProps {
    attendantItem: Attendant;
}

export const AttendantListItem = ({attendantItem}: IAttendantListItemProps) => {


    const attendant = useRecoilValue(AttendantState(attendantItem.id))

    const attendants = useRecoilValue(AttendantsState)

    // TODO: best way to remove state?
    const removeAttendant = useRecoilCallback(
        ({set, reset}) => (attendant: Attendant) => {
            set(AttendantsState, (array) => {
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
                <Box marginBottom={2} marginRight={2}>
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://media.istockphoto.com/photos/eiffel-tower-aerial-view-paris-picture-id1145422105?s=612x612"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {attendantItem.location.locationName}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {attendantItem.name}
                                </Typography>


                            </CardContent>
                        </CardActionArea>
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


