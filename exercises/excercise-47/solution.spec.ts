/* TYPESCRIPT */

class CayTrong {
  private ten: string;
  private thoiGianTrong: number;
  private sanLuong: number;
  private trangThai: "đang trồng" | "sẵn sàng thu hoạch" | "đã thu hoạch";
  private thoiGianBatDau: Date | null;

  constructor(ten: string, thoiGianTrong: number, sanLuong: number) {
    this.ten = ten;
    this.thoiGianTrong = thoiGianTrong;
    this.sanLuong = sanLuong;
    this.trangThai = "đang trồng";
    this.thoiGianBatDau = null;
  }

  public trong(): void {
    this.thoiGianBatDau = new Date();
    this.trangThai = "đang trồng";
  }

  public kiemTraTrangThai(): string {
    if (!this.thoiGianBatDau) {
      return "Chưa trồng cây";
    }

    const currentTime = new Date();
    const diffHours =
      (currentTime.getTime() - this.thoiGianBatDau.getTime()) /
      (1000 * 60 * 60);

    if (diffHours >= this.thoiGianTrong) {
      this.trangThai = "sẵn sàng thu hoạch";
    }

    return this.trangThai;
  }

  public thuHoach(): number {
    if (this.trangThai !== "sẵn sàng thu hoạch") {
      throw new Error("Cây chưa sẵn sàng thu hoạch");
    }
    this.trangThai = "đã thu hoạch";
    return this.sanLuong;
  }
}

const lua = new CayTrong("Lúa", 2, 10);
lua.trong();
console.log(lua.kiemTraTrangThai());

setTimeout(() => {
  console.log(lua.kiemTraTrangThai());
  console.log(lua.thuHoach());
}, 7200000);
