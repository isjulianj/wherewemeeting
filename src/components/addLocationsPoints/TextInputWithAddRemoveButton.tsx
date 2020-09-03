import React, { useRef, useEffect, useState } from 'react';
import BingAutoSuggest from '../../support/bing/modules/BingAutoSuggest'
import IlocationData from '../../support/interfaces/ILocationData';
import Extent from '../../support/map/Extent'

export default function TextInputWithAddRemoveButton({ addLocation }) {
    // it's common to initialise refs with null
    const nameInputRef = useRef(null);
    const addressInput = useRef(null);
    const [nameInput, setNameInput] = useState('');


    const setName = () => {
        const name = nameInputRef.current;
        setNameInput(name.value);
        console.log(name, nameInput)
    }

    useEffect(() => {
        // const selectedSuggestion = (suggestionResult) => {

        //     addLocation(suggestionResult)
        // }

        const createLocationData = (suggestionResult) => {
            const bounds = new Extent();
            bounds.setFromBingBounds(suggestionResult.bestView.bounds)

            const locationData: IlocationData = {
                suggestion: suggestionResult.formattedSuggestion,
                coords: [suggestionResult.location.latitude, suggestionResult.location.longitude],
                bounds: bounds,
                locationOwner: nameInput
            }
            addLocation(locationData)
        }
        BingAutoSuggest.attach('#searchBox', '#searchBoxContainer', createLocationData)
    }, [addLocation, nameInput])


    return (
        <div id="searchBoxContainer" >
            <div className="mb-3">
                <label className="form-label" htmlFor="name:">Name</label>
                <input className="form-control" id='name' type="text" ref={nameInputRef} onChange={setName} />
                <div id="nameHelp" className="form-text">Add Name</div>
            </div>
            <div className="mb-3">
                <div>
                    <label className="form-label" htmlFor="searchBox">Location</label>
                    <input className="form-control" id="searchBox" ref={addressInput} type="text" />
                </div>
            </div>
        </div>
    );
}