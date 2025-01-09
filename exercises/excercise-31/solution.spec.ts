/* TYPESCRIPT */

function convertNotes(notes: string[]): string[] {
  const noteMapping: { [key: string]: string } = {
    đô: "C",
    rê: "D",
    mi: "E",
    fa: "F",
    sol: "G",
    la: "A",
    si: "B",
  };

  return notes.map((note) => noteMapping[note] || note);
}

// **Test case**:
const vietnameseNotes = ["đô", "rê", "mi", "fa", "sol", "la", "si"];
const englishNotes = convertNotes(vietnameseNotes);
console.log(englishNotes); 

const notes1 = ["đô", "fa", "la", "si"];
console.log(convertNotes(notes1)); 

const notes2 = ["rê", "sol", "mi"];
console.log(convertNotes(notes2));

const notes3 = ["si", "la", "đô"];
console.log(convertNotes(notes3));
