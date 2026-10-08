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

