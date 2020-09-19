


class PublishSubscribe {

    topics: { [topic: string]: any[] };
    subUid: number;

    constructor() {
        //Topics can be broadcast or listened to 
        this.topics = {};

        // a topic Identifier

        this.subUid = -1;
    }


    // Publish or broadcast events of interest
    // with a topic name and arguments
    // arguments could be data to pass along
    publish(topic: string, args: any) {
        if (!this.topics[topic]) {
            return false
        }

        const subscribers = this.topics[topic];
        let length = subscribers ? subscribers.length : 0;

        while (length--) {
            subscribers[length].callback(topic, args)
        }

        return this

    }


    // subscribe evetns of interest
    // with a specific topic name and a 
    // calback function, to be executed
    // when the topic/event is observed
    subscribe(topic: string, callback: any): string {


        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        let token = (++this.subUid).toString();

        this.topics[topic].push({
            token: token, callback: callback
        })

        return token
    }


    //unSubscribe from a specific 
    // topic, based on a tokenised reference
    // to the subscription
    unsubscribe(token) {
        for (const message in this.topics) {
            if (this.topics[message]) {
                for (let i = 0, j = this.topics[message].length; i < j; i++) {
                    if (this.topics[message][i].token === token) {
                        this.topics[message].splice(i, 1);
                        return token
                    }
                }
            }
        }
    }

}

export default PublishSubscribe