import React, { useRef, useEffect, useState } from 'react';
import BingAutoSuggest from '../../support/bing/modules/BingAutoSuggest'
import IlocationData from '../../support/interfaces/ILocationData';
import Extent from '../../support/map/Extent'

export default function TextInputWithAddRemoveButton({ addLocation, searchPanelOpen }) {
    // it's common to initialise refs with null
    const nameInputRef = useRef('');
    const addressInput = useRef('');
    const [nameInput, setNameInput] = useState('');
    const [locationSug, setLocationSug] = useState('')

    const setName = () => {
        const name = nameInputRef.current;
        setNameInput(name.value);
    }

    const setAddress = () => {
        const add = addressInput.current;
        setLocationSug(add.value);
    }

    const searchBoxOpenStyle = { transform: 'translateX(0)' }

    useEffect(() => {

        const createLocationData = (suggestionResult) => {
            const bounds = new Extent();
            const location = searchPanelOpen.location;
            bounds.setFromBingBounds(suggestionResult.bestView.bounds)

            const locationData: IlocationData = {
                suggestion: suggestionResult.formattedSuggestion,
                coords: [suggestionResult.location.latitude, suggestionResult.location.longitude],
                bounds: bounds,
                locationOwner: nameInputRef.current.value
            }
            addLocation(locationData)
            const oldDropDowns = Array.from(document.getElementsByClassName('MicrosoftMap'));

            oldDropDowns.forEach(el => el.parentNode.removeChild(el));
        }
        BingAutoSuggest.attach('#searchBox', '#searchBoxContainer', createLocationData)

        return () => {
            BingAutoSuggest.detach();
        }
    }, [addLocation, searchPanelOpen])


    useEffect(() => {
        console.log(searchPanelOpen)
        if (searchPanelOpen.location) {

            setNameInput(searchPanelOpen.location.locationOwner)
            setLocationSug(searchPanelOpen.location.suggestion)
        }
    }, [searchPanelOpen])


    return (

        <div className="searchContainer searchBox">
            <h4>Add Location</h4>
            <form autoComplete="off" style={searchPanelOpen.open === true ? searchBoxOpenStyle : null}>
                <div className="searchBox__container">
                    {/* <input autocomplete="false" name="hidden" type="text" style={{ display: 'none' }} /> */}
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name:">Name</label>
                        <input className="form-control" id='name' type="text" ref={nameInputRef} onChange={setName} value={nameInput ? nameInput : ''} />
                        <div id="nameHelp" className="form-text">Add Name</div>
                    </div>
                    <div className="mb-3">
                        <div>
                            <label className="form-label" htmlFor="searchBox">Location</label>
                            <input className="form-control" id="searchBox" ref={addressInput} onChange={setAddress} type="text" value={locationSug ? locationSug : ''} />
                        </div>
                    </div>
                </div>
                <div id="searchBoxContainer"></div>
            </form>
        </div>
    );
}