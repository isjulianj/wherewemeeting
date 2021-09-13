import React, {ReactNode} from 'react';
import {Attendants} from "../domain/attendants";
import {Attendant} from "../domain/attendant";
import { AttendantListItem } from './AttendantsList';

interface IAttendantsProps {
    attendants: Attendants;
    children?: ReactNode
}

export const AttendantsContainer = ({attendants}: IAttendantsProps) => {
    return (
        <div>
            {attendants.map((attendant: Attendant) => <AttendantListItem attendant={attendant} key={attendant.id}></AttendantListItem>)}

        </div>
    );
};
