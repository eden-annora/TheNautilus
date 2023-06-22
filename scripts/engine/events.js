/* 
sit down and buckle up. this is a crash course on how to use the eventhandler.

so to use the event handler you need to initalize the script.

create a new instance of the singleton object (there are no protections against making more than one, so please just dont).

then create an event catagory and listener by using the "bindListener()" funct

bindListener(target, type, callback)
target  : reference to the parent object
type  : a string of the event type to be listened for
callback  : a function which takes the inputs (target,data) 
(target is the aformentioned reference to the parent object.)
(data is an object that has dynamic data based on the type of event, which is created when an event occurs.)

you can raise an event using the "raiseEvent()" funct

raiseEvent(type, inputdata)
type  : a string of the event type to be created
inputdata: new Object({
  key1:value1,
  key2:value2,
  key3:value3,
  key4:value4
  etc... for as many or few datapoints as you need.
})

processCallbacks() is the function that triggers the processing of all events that have been raised since the last time it has run.
think of it as the "go button".

*/

class EventHandler {
  constructor() {
    this.eventlist = []; //list of events raised since the last processCallbacks funct
    this.callbacklist = new Object({}); // dict with structure resembling 'type:[listener1,listener2]'
  }
  raiseEvent(type, inputdata) {
    if (this.callbacklist.hasOwnProperty(type)) {// check if event type already has 'type' catagory and if it doesn't log the attempt and don't do anything.
      this.eventlist.push(new Event(type, inputdata));
    } else { console.log("creation of event " + type + " with data " + inputdata + " was attempted, there are no listeners by this name, thus no event was raised.") }
  }

  bindListener(target, type, callback) {// check if event type already has 'type' catagory and if it doesn't log the attempt, create the catagory, and apply the listener.
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
      if (event) {// if the event isn't a null object, go find the matching entry in the callbacklist dict and run all the callbacks.
        let callbacklen = this.callbacklist[event.type].length;
        for (let i = 0; i < callbacklen; i++) {
          if (this.callbacklist[event.type][i].dead) {
            console.log("removed event listener with type " + event.type + " at index " + i)
            this.callbacklist[event.type].splice(i, 1);
            callbacklen --
          } else {
            this.callbacklist[event.type][i].triggerCallback(event.data)
          }
        }
      }
      this.eventlist.splice(i, 1);//remove event from list once all callbacks have been notified.
    }
  }
}

class Event {// event class, type is the name of the catagory it's sorted into and data is a dynamic object that changes in structure for each event type.
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
    this.dead = false
  }
  triggerCallback(eventdata) {
  
    if (this.callback) { this.callback(this.target, eventdata) }
    else {console.log("non-existent callback called, there should be a deletion message shortly after this one. if there isnt. start worrying")}

    if (this.target.dead) {
      this.dead = true
      this.target = null
      this.callback = null
    }
  }
}
