import {LocationSearchAdapterInterface} from "../adapters/primary/LocationSearchAdapterInterface";
import tt from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";


export const useTomTomLocationService = (): LocationSearchAdapterInterface => {
    const API_KEY = 'enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa';

    const ttServices = tt.services;

    const searchOptions = {
        key: API_KEY,
        language: 'en-GB',
        limit: 5
    };

    // Options for the autocomplete service
    const autocompleteOptions = {
        key: API_KEY,
        language: 'en-GB',
        resultSet: 'location'
    };


    const searchBoxOptions = {
        minNumberOfCharacters: 0,
        searchOptions: searchOptions,
        autocompleteOptions: autocompleteOptions,
        distanceFromPoint: [15.4, 53.0]
    };

    const ttSearchBox = new SearchBox(ttServices, searchBoxOptions);
    return {
        appendSearch(element) {
            element.current.appendChild(ttSearchBox.getSearchBoxHTML());
        },
        registerOnSelectedCallback(callback) {
            ttSearchBox.on('tomtom.searchbox.resultselected', callback);
        },
        removeSearch() {
            ttSearchBox.onRemove()
        }
    }
}