/* TYPESCRIPT */

function convertNumberToWords(number: number): string {
  if (number === 0) return "không đồng";

  const donVi = ["đồng", "nghìn", "triệu", "tỷ"];
  const donViSo = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const docHang = ["", "mười", "trăm"];

  const docHangDonVi = (so: number): string => {
    let doc = "";
    const tram = Math.floor(so / 100);
    const chuc = Math.floor((so % 100) / 10);
    const donVi = so % 10;

    if (tram > 0) doc += donViSo[tram] + " trăm";
    if (chuc > 1) doc += (doc ? " " : "") + donViSo[chuc] + " mươi";
    if (chuc === 1) doc += " mười";
    if (donVi > 0 && chuc !== 0)
      doc += (chuc !== 0 ? " " : "") + donViSo[donVi];
    else if (donVi > 0 && chuc === 0) doc += (doc ? " " : "") + donViSo[donVi];

    return doc || donViSo[0];
  };

  const docPhanNho = (phan: number, index: number): string => {
    if (phan === 0) return "";
    const doc = docHangDonVi(phan);
    return `${doc} ${donVi[index]}`.trim();
  };

  let result = "";
  let index = 0;

  while (number > 0) {
    const phan = number % 1000;
    if (phan > 0) {
      result = docPhanNho(phan, index) + (result ? " " : "") + result;
    }
    number = Math.floor(number / 1000);
    index++;
  }

  return result.trim() + " đồng";
}

// Testcase
console.log(convertNumberToWords(1234));

console.log(convertNumberToWords(1001));

console.log(convertNumberToWords(500000));

console.log(convertNumberToWords(0));
