/* JAVASCRIPT */
function findDuplicateIDs(citizenIDs) {
  const idCount = {};

  citizenIDs.forEach((id) => {
    if (idCount[id]) {
      idCount[id]++;
    } else {
      idCount[id] = 1;
    }
  });

  const duplicates = Object.keys(idCount).filter((id) => idCount[id] > 1);

  return duplicates;
}

const citizenIDs = [
  "123456789012",
  "098765432109",
  "123456789012",
  "111111111111",
  "098765432109",
  "222222222222",
];
const duplicates = findDuplicateIDs(citizenIDs);

console.log(duplicates);
