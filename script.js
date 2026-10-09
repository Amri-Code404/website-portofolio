console.log("Test....., selamat datang")


// Mengubah tahun footer secara otomatis
const tahun = document.getElementById("tahun");

tahun.textContent = new Date().getFullYear();


// Animasi ketika elemen masuk ke layar
const elemenReveal = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aktif");

                // Animasi hanya dijalankan sekali
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

elemenReveal.forEach((elemen) => {
    observer.observe(elemen);
});

//-------------------------------------


const formKontak = document.querySelector('#kontak form');
const statusKontak = document.querySelector('#status-kontak');
const tombolKirim = formKontak.querySelector('[type="submit"]');

formKontak.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Periksa CAPTCHA sebelum mengirim
    const captcha = formKontak.querySelector(
        '[name="g-recaptcha-response"]'
    );

    if (!captcha || !captcha.value.trim()) {
        statusKontak.textContent =
            'Silakan selesaikan CAPTCHA terlebih dahulu.';
        statusKontak.style.color = '#b42318';
        return;
    }

    tombolKirim.disabled = true;
    tombolKirim.textContent = 'Mengirim...';
    statusKontak.textContent = '';

    try {
        const data = new FormData(formKontak);

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        });

       
        if (!response.ok || response.redirected) {
            throw new Error('Pengiriman ditolak atau gagal.');
        }

        statusKontak.textContent =
            'Pesan berhasil dikirim. Terima kasih!';
        statusKontak.style.color = 'green';

        formKontak.reset();

    } catch (error) {
        statusKontak.textContent =
            'Pesan belum dapat dikirim. Periksa CAPTCHA dan coba lagi.';
        statusKontak.style.color = '#b42318';

    } finally {
        tombolKirim.disabled = false;
        tombolKirim.textContent = 'Kirim Saran ↗';
    }
});