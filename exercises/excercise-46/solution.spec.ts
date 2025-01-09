/* TYPESCRIPT */

function tinhThoiGianCho(
  danhSachKhach: Array<{
    ten: string;
    thoiGianDen: string | null;
    thoiGianXuLy: number;
  }>
) {
  const convertToMinutes = (time: string | null): number => {
    if (!time || time.length !== 5 || time.indexOf(":") !== 2) {
      throw new Error("Invalid time input");
    }
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const addMinutes = (time: string, minutes: number): string => {
    const totalMinutes = convertToMinutes(time) + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const danhSachKetQua = danhSachKhach.map((khach, index) => {
    const thoiGianDenPhut = convertToMinutes(khach.thoiGianDen);
    const thoiGianXuLy = khach.thoiGianXuLy;
    const thoiGianCho =
      index === 0
        ? 0
        : thoiGianDenPhut -
          convertToMinutes(danhSachKhach[index - 1].thoiGianRoiDi);
    const thoiGianRoiDi = addMinutes(khach.thoiGianDen, thoiGianXuLy);

    return {
      ten: khach.ten,
      thoiGianCho,
      thoiGianRoiDi,
    };
  });

  return danhSachKetQua;
}

const khach = [
  { ten: "An", thoiGianDen: "10:00", thoiGianXuLy: 5 },
  { ten: "Bình", thoiGianDen: "10:02", thoiGianXuLy: 3 },
  { ten: "Cường", thoiGianDen: "10:03", thoiGianXuLy: 4 },
];

console.log(tinhThoiGianCho(khach));
// Output: [
//   {ten: "An", thoiGianCho: 0, thoiGianRoiDi: "10:05"},
//   {ten: "Bình", thoiGianCho: 3, thoiGianRoiDi: "10:08"},
//   {ten: "Cường", thoiGianCho: 5, thoiGianRoiDi: "10:12"}
// ]
