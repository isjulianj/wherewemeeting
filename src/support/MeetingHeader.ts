import MeetingHeaderAttributes from "./MeetingHeaderAttributes";
import Location from "./Location";
import IlocationData from "./interfaces/ILocationData";
import PublishSubscribe from "./messaging/PublishSubscribe";

class MeetingHeader {
  attributes: MeetingHeaderAttributes;
  lang: string;
  authenticated: boolean;
  theme: string;
  locations: Location[];
  pubSub: PublishSubscribe;

  constructor() {
    this.lang = "en";
    this.theme = "light";
    this.locations = [];

    this.pubSub = new PublishSubscribe();
  }

  addLocation(locationData: IlocationData): void {
    console.log(this);
    this.locations.push(new Location(this, locationData));
    this.pubSub.publish("LOCATION_ADDED", {});
  }

  getLocations(): Location[] {
    return this.locations;
  }
}

export default MeetingHeader;
