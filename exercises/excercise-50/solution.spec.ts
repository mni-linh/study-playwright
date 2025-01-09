/* TYPESCRIPT */

class XeDua {
  tocDo: number; // km/h
  nhienLieu: number; // lít
  tieuHao: number; // lít/100km
  viTri: number; // km
  thoiGianChay: number; // giây
  trangThai: "dung" | "chay" | "hetXang" | "vaCham";

  constructor({
    tocDo,
    nhienLieu,
    tieuHao,
  }: {
    tocDo: number;
    nhienLieu: number;
    tieuHao: number;
  }) {
    this.tocDo = tocDo;
    this.nhienLieu = nhienLieu;
    this.tieuHao = tieuHao;
    this.viTri = 0;
    this.thoiGianChay = 0;
    this.trangThai = "dung";
  }

  tangToc(delta: number): void {
    this.tocDo += delta;
  }

  giamToc(delta: number): void {
    this.tocDo = Math.max(0, this.tocDo - delta);
  }

  chay(thoiGian: number): void {
    if (this.trangThai === "hetXang" || this.trangThai === "vaCham") return;

    const vanToc = this.tocDo / 3600;
    const tieuHao = (vanToc * this.tieuHao) / 100;

    if (this.nhienLieu < tieuHao) {
      this.trangThai = "hetXang";
      return;
    }

    this.viTri += vanToc * thoiGian;
    this.thoiGianChay += thoiGian;

    this.nhienLieu -= tieuHao;
    this.trangThai = "chay";
  }

  layThongTin() {
    return {
      tocDo: this.tocDo,
      nhienLieu: this.nhienLieu,
      viTri: this.viTri,
      thoiGianChay: this.thoiGianChay,
      trangThai: this.trangThai,
    };
  }
}

class DuongDua {
  doDai: number;
  vatCan: Array<{ viTri: number; doKho: number }>;

  constructor({
    doDai,
    vatCan,
  }: {
    doDai: number;
    vatCan: Array<{ viTri: number; doKho: number }>;
  }) {
    this.doDai = doDai;
    this.vatCan = vatCan;
  }

  kiemTraVatCan(viTri: number): "chay" | "vaCham" {
    for (let vat of this.vatCan) {
      if (viTri >= vat.viTri) {
        return "vaCham";
      }
    }
    return "chay";
  }
}

// Testcase 1: Chạy trên đường không có vật cản.
const duongDua = new DuongDua({
  doDai: 10,
  vatCan: [
    { viTri: 2, doKho: 3 },
    { viTri: 5, doKho: 4 },
    { viTri: 8, doKho: 2 },
  ],
});

const xe = new XeDua({
  tocDo: 0,
  nhienLieu: 5,
  tieuHao: 6,
});

xe.tangToc(60);
xe.chay(120);

console.log(xe.layThongTin());

// Testcase 2: Khi gặp vật cản, xe phải giảm tốc.

xe.chay(60);
console.log(xe.layThongTin());
