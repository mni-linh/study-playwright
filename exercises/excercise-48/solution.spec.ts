/* TYPESCRIPT */

type DoVat = {
  ten: string;
  chieuCao: number;
  chieuRong: number;
  chieuSau: number;
  coTheXoay: boolean;
};

type KichThuocTu = {
  chieuCao: number;
  chieuRong: number;
  chieuSau: number;
};

type ViTri = {
  x: number;
  y: number;
  z: number;
  huong: "dung" | "ngang";
};

function xepTu(
  doVat: DoVat[],
  kichThuocTu: KichThuocTu
): (ViTri & { ten: string })[] | null {
  let danhSachXep: (ViTri & { ten: string })[] = [];
  let remainingSpace = { ...kichThuocTu };

  for (let item of doVat) {
    let fit = false;
    let rotation: "dung" | "ngang" = "dung";

    if (item.coTheXoay) {
      // Check all orientations
      const orientations = [
        { cao: item.chieuCao, rong: item.chieuRong, sau: item.chieuSau },
        { cao: item.chieuRong, rong: item.chieuCao, sau: item.chieuSau },
        { cao: item.chieuSau, rong: item.chieuRong, sau: item.chieuCao },
      ];

      for (let orientation of orientations) {
        if (
          orientation.cao <= remainingSpace.chieuCao &&
          orientation.rong <= remainingSpace.chieuRong &&
          orientation.sau <= remainingSpace.chieuSau
        ) {
          remainingSpace = {
            chieuCao: remainingSpace.chieuCao - orientation.cao,
            chieuRong: remainingSpace.chieuRong,
            chieuSau: remainingSpace.chieuSau,
          };
          fit = true;
          rotation = orientation === orientations[0] ? "dung" : "ngang";
          break;
        }
      }
    } else {
      if (
        item.chieuCao <= remainingSpace.chieuCao &&
        item.chieuRong <= remainingSpace.chieuRong &&
        item.chieuSau <= remainingSpace.chieuSau
      ) {
        remainingSpace = {
          chieuCao: remainingSpace.chieuCao - item.chieuCao,
          chieuRong: remainingSpace.chieuRong,
          chieuSau: remainingSpace.chieuSau,
        };
        fit = true;
        rotation = "dung";
      }
    }

    if (fit) {
      danhSachXep.push({
        ten: item.ten,
        viTri: {
          x: 0,
          y: item.chieuRong,
          z: 0,
        },
        huong: rotation,
      });
    } else {
      return null;
    }
  }

  return danhSachXep;
}

const tu = { chieuCao: 100, chieuRong: 80, chieuSau: 60 };
const doDac = [
  { ten: "Hộp A", chieuCao: 30, chieuRong: 40, chieuSau: 50, coTheXoay: true },
  { ten: "Hộp B", chieuCao: 20, chieuRong: 30, chieuSau: 40, coTheXoay: false },
  { ten: "Hộp C", chieuCao: 40, chieuRong: 20, chieuSau: 30, coTheXoay: true },
];
console.log(xepTu(doDac, tu));

const doDacKhongXepDuoc = [
  { ten: "Hộp D", chieuCao: 90, chieuRong: 70, chieuSau: 50, coTheXoay: false },
  { ten: "Hộp E", chieuCao: 40, chieuRong: 30, chieuSau: 20, coTheXoay: true },
];
console.log(xepTu(doDacKhongXepDuoc, tu)); 
