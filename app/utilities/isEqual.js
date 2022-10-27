function isEqual(obj1, obj2, parents1, parents2) {
  "use strict";
  var i;
  // compare null and undefined
  if (obj1 === undefined || obj2 === undefined || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  // compare primitives
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1.valueOf() === obj2.valueOf();
  }

  // if objects are of different types or lengths they can't be equal
  if (obj1.constructor !== obj2.constructor || (obj1.length !== undefined && obj1.length !== obj2.length)) {
    return false;
  }

  // iterate the objects
  for (i in obj1) {
    // build the parents list for object on the left (obj1)
    if (parents1 === undefined) parents1 = [];
    if (obj1.constructor === Object) parents1.push(obj1);
    // build the parents list for object on the right (obj2)
    if (parents2 === undefined) parents2 = [];
    if (obj2.constructor === Object) parents2.push(obj2);
    // walk through object properties
    if (obj1.propertyIsEnumerable(i)) {
      if (obj2.propertyIsEnumerable(i)) {
        // if object at i was met while going down here
        // it's a self reference
        if (
          (obj1[i].constructor === Object && parents1.indexOf(obj1[i]) >= 0) ||
          (obj2[i].constructor === Object && parents2.indexOf(obj2[i]) >= 0)
        ) {
          if (obj1[i] !== obj2[i]) {
            return false;
          }
          continue;
        }
        // it's not a self reference so we are here
        if (!isEqual(obj1[i], obj2[i], parents1, parents2)) {
          return false;
        }
      } else {
        // obj2[i] does not exist
        return false;
      }
    }
  }
  return true;
}

export default isEqual;
