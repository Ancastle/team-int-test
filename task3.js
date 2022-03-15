function extractValuesForKey(object, searchKey) {
  const objectEntries = Object.entries(object);
  const map = new Map();

  // iterates each lvl 1
  while (objectEntries.length > 0) {
    let instance = objectEntries[0];
    let instanceKey = instance[0];
    let instanceValue = instance[1];
    let isObjectInstanceValue = typeof instanceValue === "object";
    let searchKeyLength = searchKey.length;
    let lastCharacters = instanceKey.slice(
      instanceKey.length - searchKeyLength
    );
    let isAMatch = lastCharacters === searchKey;
    // Case 1 : Instance value is not an object
    if (!isObjectInstanceValue) {
      // Case 1.1 : Instance key matches
      if (isAMatch) {
        // Create new directory name
        const newMapDir = instanceKey.substring(
          0,
          instanceKey.length - (searchKeyLength + 1)
        );
        map.set(newMapDir, instanceValue);
        objectEntries.shift();
        // Case 1.2 : Instance key doesn't match
      } else {
        objectEntries.shift();
      }
    }
    // Case 2 : Instance value is an object, add all sub instances to the array
    if (isObjectInstanceValue) {
      // Adding case for if searchKey instance's value is an object
      if (isAMatch) {
        const newMapDir = instanceKey.substring(
          0,
          instanceKey.length - (searchKeyLength + 1)
        );
        map.set(newMapDir, instanceValue);
      }
      const levelName = objectEntries[0][0];
      const newEntries = Object.entries(objectEntries[0][1]);
      objectEntries.shift();
      // Add every new sub instance to the array
      newEntries.reverse().forEach((entry) => {
        const newEntry = [`${levelName}/${entry[0]}`, entry[1]];
        objectEntries.unshift(newEntry);
      });
    }
  }
  return map;
}
module.exports = extractValuesForKey;
