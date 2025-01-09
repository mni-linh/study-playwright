/* TYPESCRIPT */

function doiTien(soTien: number): Record<string, number> | null {
  const menhGia = [
    500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000,
  ];

  if (soTien < 1000) return null;

  const ketQua: Record<string, number> = {};

  for (const menhGiaHienTai of menhGia) {
    const soLuong = Math.floor(soTien / menhGiaHienTai);
    if (soLuong > 0) {
      ketQua[menhGiaHienTai] = soLuong;
      soTien %= menhGiaHienTai;
    }
  }

  return ketQua;
}

console.log(doiTien(123000));

console.log(doiTien(500));

console.log(doiTien(1000000));
