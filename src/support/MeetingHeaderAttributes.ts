

class MeetingHeaderAttributes {
    id: string;
    userID: string;

    constructor(data) {
        this.id = data.id || null
        this.userID = data.userID || null
    }


}

export default MeetingHeaderAttributes