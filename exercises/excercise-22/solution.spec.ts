/* JAVASCRIPT */
function tinhNgayDenTet() {
  const tetDate = new Date("2025-01-29T00:00:00");
  const now = new Date();

  const diff = tetDate - now;

  if (diff <= 0) {
    console.log("Tết Nguyên Đán 2025 đã đến!");
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  console.log(
    `Chỉ còn ${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây nữa là đến Tết Nguyên Đán 2025`
  );

  setInterval(() => {
    tinhNgayDenTet();
  }, 1000);
}

tinhNgayDenTet();
