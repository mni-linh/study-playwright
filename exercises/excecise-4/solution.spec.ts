/* JAVASCRIPT */
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();

  if (birthYear > currentYear) {
    console.log("Năm sinh không hợp lệ");
  } else {
    const age = currentYear - birthYear;
    console.log(`Tuổi của bạn là: ${age}`);
  }
}

calculateAge(1990);
calculateAge(2025);

/* PLAYWRIGHT*/
