/* TYPESCRIPT */

interface NguyenLieu {
  ten: string;
  donVi: "ml" | "g" | "muong";
  soLuong: number;
}

interface CongThuc {
  ten: string;
  nguyenLieu: NguyenLieu[];
  cachLam: string[];
  doKho: 1 | 2 | 3; // độ khó pha chế
}

class QuanLyDoUong {
  nguyenLieu: NguyenLieu[];

  constructor({ nguyenLieu }: { nguyenLieu: NguyenLieu[] }) {
    this.nguyenLieu = nguyenLieu;
  }

  kiemTraKhaNangPhaChe(congThuc: CongThuc): boolean {
    for (let nguyenLieu of congThuc.nguyenLieu) {
      const tonKho = this.nguyenLieu.find((nl) => nl.ten === nguyenLieu.ten);
      if (!tonKho || tonKho.soLuong < nguyenLieu.soLuong) {
        return false;
      }
    }
    return true;
  }

  thongKeNguyenLieuThieu(congThuc: CongThuc): NguyenLieu[] {
    return congThuc.nguyenLieu.filter((nguyenLieu) => {
      const tonKho = this.nguyenLieu.find((nl) => nl.ten === nguyenLieu.ten);
      return !tonKho || tonKho.soLuong < nguyenLieu.soLuong;
    });
  }

  phaChe(congThuc: CongThuc): void {
    if (this.kiemTraKhaNangPhaChe(congThuc)) {
      congThuc.nguyenLieu.forEach((nguyenLieu) => {
        const tonKho = this.nguyenLieu.find((nl) => nl.ten === nguyenLieu.ten);
        if (tonKho) {
          tonKho.soLuong -= nguyenLieu.soLuong;
        }
      });
    } else {
      throw new Error("Không đủ nguyên liệu để pha chế");
    }
  }

  themNguyenLieu(nguyenLieu: NguyenLieu): void {
    const tonKho = this.nguyenLieu.find((nl) => nl.ten === nguyenLieu.ten);
    if (tonKho) {
      tonKho.soLuong += nguyenLieu.soLuong;
    } else {
      this.nguyenLieu.push(nguyenLieu);
    }
  }

  layDanhSachNguyenLieu(): NguyenLieu[] {
    return this.nguyenLieu;
  }

  layDanhSachCoThePha(): CongThuc[] {
    return this.nguyenLieu.reduce((danhSach, nl) => {
      const congThuc = danhSach.find((ct) => ct.ten === nl.ten);
      if (congThuc) {
        congThuc.nguyenLieu.push(nl);
      } else {
        danhSach.push({ ten: nl.ten, nguyenLieu: [nl], cachLam: [], doKho: 1 });
      }
      return danhSach;
    }, [] as CongThuc[]);
  }
}

// Testcase 1: Kiểm tra khả năng pha chế và thực hiện pha chế.
const kho = new QuanLyDoUong({
  nguyenLieu: [
    { ten: "Cà phê", donVi: "g", soLuong: 100 },
    { ten: "Sữa", donVi: "ml", soLuong: 500 },
    { ten: "Đường", donVi: "g", soLuong: 200 },
  ],
});

const latteCongThuc: CongThuc = {
  ten: "Latte",
  nguyenLieu: [
    { ten: "Cà phê", donVi: "g", soLuong: 18 },
    { ten: "Sữa", donVi: "ml", soLuong: 200 },
    { ten: "Đường", donVi: "g", soLuong: 10 },
  ],
  cachLam: ["Pha cà phê espresso", "Đánh sữa nóng", "Rót sữa từ từ vào cà phê"],
  doKho: 2,
};

console.log(kho.kiemTraKhaNangPhaChe(latteCongThuc));

kho.phaChe(latteCongThuc);
console.log(kho.layDanhSachNguyenLieu());

// Testcase 2: Thêm nguyên liệu vào kho.
kho.themNguyenLieu({ ten: "Siro", donVi: "ml", soLuong: 100 });
console.log(kho.layDanhSachNguyenLieu());
