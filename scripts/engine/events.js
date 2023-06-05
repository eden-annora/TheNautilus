

class EventHandler {
  constructor() {
    this.eventlist = []; //list of events raised since the last processCallbacks funct
    this.callbacklist = new Object({}); // dict with structure resembling 'type:[listener1,listener2]'
  }
  raiseEvent(type, inputdata) {
    if (this.callbacklist.hasOwnProperty(type)) {// check if event type already has 'type' catagory and if it doesnt log the attempt and dont do anything.
      this.eventlist.push(new Event(type, inputdata));
    } else { console.log("creation of event " + type + " with data " + inputdata + " was attempted, there are no listeners by this name, thus no event was raised.") }
  }

  bindListener(target, type, callback) {// check if event type already has 'type' catagory and if it doesnt log the attempt, create the catagory, and apply the listener.
    let object = new EventListener(target, type, callback)
    if (this.callbacklist.hasOwnProperty(type)) {
      this.callbacklist[type].push(object);
    } else {
      this.callbacklist[type] = []
      this.callbacklist[type].push(object);
      console.log("new event catagory was created with key: " + type + " by " + target)
    }
  }

  processCallbacks() {// iterate through eventlist and run callback functions for all the listeners that match the event type
    let len = this.eventlist.length;
    for (let i = 0; i < len; i++) {
      let event = this.eventlist[i];
      if (event) {// if the event isnt a null object, go find the matching entry in the callbacklist dict and run all the callbacks.
        let callbacklen = this.callbacklist[event.type].length;
        for (let i = 0; i < callbacklen; i++) { this.callbacklist[event.type][i].triggerCallback(event.data) }
      }
      this.eventlist.splice(i, 1);//remove event from list once all callbacks have been notified.
    }
  }
}

class Event {// event class, type is the name of the catagory its sorted into and data is a dynamic object that changes in structure for each event type.
  constructor(type, data) {
    this.type = type;
    this.data = data;
    this.age = 1;
  }
}

class EventListener {// stores the object that added the listener, the callback function, and the catagory/type.
  constructor(target, type, callback) {
    this.type = type;
    this.callback = callback;
    this.target = target;
  }
  triggerCallback(eventdata) { this.callback(this.target, eventdata) }
}