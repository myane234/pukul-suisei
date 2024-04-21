const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
    tampilkanUcapanSelamat();
  }, 10000);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

function tampilkanUcapanSelamat() {
  const ucapanSelamatDiv = document.getElementById("ucapanSelamat");
  const skorUcapanSelamatSpan = document.getElementById("skorUcapanSelamat");
  skorUcapanSelamatSpan.textContent = skor;
  ucapanSelamatDiv.style.display = "block"; // Menampilkan pesan ucapan selamat
}

function sembunyikanPesan() {
  const ucapanSelamatDiv = document.getElementById("ucapanSelamat");
  ucapanSelamatDiv.style.display = "none"; // Menyembunyikan pesan ucapan selamat

  papanSkor.style.display = "none"; // Menyembunyikan pesan skor
}

function mulaiKembali() {
  const ucapanSelamatDiv = document.getElementById("ucapanSelamat");
  ucapanSelamatDiv.style.display = "none"; // Menyembunyikan pesan ucapan selamat

  papanSkor.style.display = "block"; // Menampilkan kembali pesan skor
  mulai(); // Memulai permainan kembali
}
