import Extent from '../map/Extent'

export default interface IlocationData {
    bounds: Extent;
    coords: number[];
    suggestion: string;
    locationOwner?: string;
    ownerID?: string;
}
