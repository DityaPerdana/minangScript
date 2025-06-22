function gotongRoyongHitung(angka1, angka2, angka3) {
  console.log("🤝 Gotong royong menghitung bersama");
  var hasil = ((angka1 + angka2) + angka3);
  return hasil;
}
function gotongRoyongBagi(total, jumlahOrang) {
  console.log("📊 Membagi hasil secara adil");
  return (total / jumlahOrang);
}
var totalPekerjaan = gotongRoyongHitung(10, 20, 30);
var bagianPerOrang = gotongRoyongBagi(totalPekerjaan, 3);
console.log(("Total pekerjaan: " + totalPekerjaan));
console.log(("Bagian per orang: " + bagianPerOrang));