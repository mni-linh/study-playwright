/* TYPESCRIPT */

interface Sach {
  maSach: string;
  tenSach: string;
  tacGia: string;
  theLoai: string[];
  trangThai: "có sẵn" | "đang mượn" | "đang sửa chữa";
  viTri: string; // Vị trí trên kệ
}

interface DocGia {
  maDocGia: string;
  hoTen: string;
  email: string;
  sachDangMuon: PhieuMuon[];
  lichSuMuon: PhieuMuon[];
}

interface PhieuMuon {
  maSach: string;
  maDocGia: string;
  ngayMuon: Date;
  hanTra: Date;
  ngayTraThucTe?: Date;
  tinhTrang: "đang mượn" | "đã trả" | "quá hạn";
}

class ThuVien {
  danhSachSach: Sach[] = [];
  danhSachDocGia: DocGia[] = [];

  themSach(sach: Sach) {
    this.danhSachSach.push(sach);
  }

  muonSach(maDocGia: string, maSach: string): PhieuMuon | null {
    const docGia = this.danhSachDocGia.find((dg) => dg.maDocGia === maDocGia);
    const sach = this.danhSachSach.find(
      (s) => s.maSach === maSach && s.trangThai === "có sẵn"
    );

    if (docGia && sach) {
      const ngayMuon = new Date();
      const hanTra = new Date(ngayMuon);
      hanTra.setDate(ngayMuon.getDate() + 14); // 2 tuần hạn trả

      const phieuMuon: PhieuMuon = {
        maSach: sach.maSach,
        maDocGia: docGia.maDocGia,
        ngayMuon,
        hanTra,
        tinhTrang: "đang mượn",
      };

      docGia.sachDangMuon.push(phieuMuon);
      sach.trangThai = "đang mượn";

      return phieuMuon;
    }
    return null;
  }

  traSach(maPhieuMuon: string, tinhTrangSach: string): boolean {
    const docGia = this.danhSachDocGia.find((dg) =>
      dg.sachDangMuon.some((s) => s.maSach === maPhieuMuon)
    );
    if (docGia) {
      const phieuMuon = docGia.sachDangMuon.find(
        (pm) => pm.maSach === maPhieuMuon
      );
      if (phieuMuon) {
        phieuMuon.ngayTraThucTe = new Date();
        phieuMuon.tinhTrang = tinhTrangSach;

        const sach = this.danhSachSach.find((s) => s.maSach === maPhieuMuon);
        if (sach) {
          sach.trangThai = "có sẵn";
        }

        return true;
      }
    }
    return false;
  }

  kiemTraQuaHan(): PhieuMuon[] {
    const ngayHienTai = new Date();
    return this.danhSachDocGia.flatMap((dg) =>
      dg.sachDangMuon.filter(
        (pm) => pm.hanTra < ngayHienTai && pm.tinhTrang === "đang mượn"
      )
    );
  }

  timSach(tuKhoa: string): Sach[] {
    return this.danhSachSach.filter(
      (s) =>
        s.tenSach.toLowerCase().includes(tuKhoa.toLowerCase()) ||
        s.tacGia.toLowerCase().includes(tuKhoa.toLowerCase())
    );
  }

  thongKeDocGia(maDocGia: string): DocGia | undefined {
    return this.danhSachDocGia.find((dg) => dg.maDocGia === maDocGia);
  }

  guiThongBaoQuaHan() {
    const sachQuaHan = this.kiemTraQuaHan();
    sachQuaHan.forEach((phieuMuon) => {
      const docGia = this.danhSachDocGia.find(
        (dg) => dg.maDocGia === phieuMuon.maDocGia
      );
      if (docGia) {
        console.log(
          `Gửi email cho ${docGia.hoTen} về sách "${phieuMuon.maSach}" đã quá hạn.`
        );
      }
    });
  }
}
