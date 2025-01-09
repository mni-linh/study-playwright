/* TYPESCRIPT */

interface ToaDo {
  x: number;
  y: number;
}

interface Khoi {
  dang: "I" | "L" | "J" | "O" | "T"; // Các loại khối cơ bản
  viTri: ToaDo; // Vị trí góc trên bên trái của khối
  huong: 0 | 90 | 180 | 270; // Góc xoay
  mau: string; // Mã màu
}

interface TrangThaiGame {
  bangDiem: number;
  capDo: number;
  bangChoi: number[][]; // 0: ô trống, 1-5: các màu khối
}

class TetrisGame {
  chieuRong: number;
  chieuCao: number;
  bangChoi: number[][];
  khoiHienTai: Khoi | null = null;

  constructor({
    chieuRong,
    chieuCao,
  }: {
    chieuRong: number;
    chieuCao: number;
  }) {
    this.chieuRong = chieuRong;
    this.chieuCao = chieuCao;
    this.bangChoi = Array(chieuCao)
      .fill(0)
      .map(() => Array(chieuRong).fill(0));
    this.taoKhoiMoi();
  }

  taoKhoiMoi() {
    const khoiOptions: Khoi[] = [
      { dang: "I", viTri: { x: 4, y: 0 }, huong: 0, mau: "#00FFFF" },
      { dang: "L", viTri: { x: 4, y: 0 }, huong: 0, mau: "#FF0000" },
      { dang: "J", viTri: { x: 4, y: 0 }, huong: 0, mau: "#0000FF" },
      { dang: "O", viTri: { x: 4, y: 0 }, huong: 0, mau: "#FFFF00" },
      { dang: "T", viTri: { x: 4, y: 0 }, huong: 0, mau: "#800080" },
    ];
    this.khoiHienTai =
      khoiOptions[Math.floor(Math.random() * khoiOptions.length)];
  }

  diChuyenKhoi(huong: "trai" | "phai" | "xuong") {
    if (!this.khoiHienTai) return;

    switch (huong) {
      case "trai":
        if (this.khoiHienTai.viTri.x > 0) this.khoiHienTai.viTri.x--;
        break;
      case "phai":
        if (this.khoiHienTai.viTri.x < this.chieuRong - 1)
          this.khoiHienTai.viTri.x++;
        break;
      case "xuong":
        if (this.khoiHienTai.viTri.y < this.chieuCao - 1)
          this.khoiHienTai.viTri.y++;
        break;
    }
  }

  xoayKhoi() {
    if (!this.khoiHienTai) return;

    this.khoiHienTai.huong = (this.khoiHienTai.huong + 90) % 360;
  }

  kiemTraVaCham(): boolean {
    if (!this.khoiHienTai) return false;

    const { viTri, huong, dang } = this.khoiHienTai;
    // Kiểm tra va chạm với ranh giới hoặc các khối khác
    const khoiToaDo = this.tinhToaDoKhoi(viTri, huong, dang);

    for (let toaDo of khoiToaDo) {
      if (
        toaDo.x < 0 ||
        toaDo.x >= this.chieuRong ||
        toaDo.y >= this.chieuCao ||
        this.bangChoi[toaDo.y][toaDo.x] !== 0
      ) {
        return true;
      }
    }
    return false;
  }

  tinhToaDoKhoi(viTri: ToaDo, huong: number, dang: string): ToaDo[] {
    const toado = [];
    const phanLoai: Record<string, ToaDo[]> = {
      I: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      L: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      J: [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      O: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      T: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
      ],
    };

    for (let p of phanLoai[dang]) {
      toado.push({ x: viTri.x + p.x, y: viTri.y + p.y });
    }

    return toado;
  }

  kiemTraHangDay() {
    for (let y = 0; y < this.chieuCao; y++) {
      if (this.bangChoi[y].every((cell) => cell !== 0)) {
        this.xoaHang(y);
      }
    }
  }

  xoaHang(y: number) {
    for (let i = y; i > 0; i--) {
      this.bangChoi[i] = [...this.bangChoi[i - 1]];
    }
    this.bangChoi[0] = Array(this.chieuRong).fill(0);
  }

  layTrangThai(): TrangThaiGame {
    const bangDiem = this.khoiHienTai ? this.khoiHienTai.viTri.y : 0;
    return {
      bangDiem,
      capDo: 1,
      bangChoi: this.bangChoi,
    };
  }
}
