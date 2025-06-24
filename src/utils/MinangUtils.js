// Utility functions for MinangScript

class MinangUtils {
    // Format error messages with cultural context
    static formatError(error, line, column) {
        return `❌ Kesalahan pada baris ${line}, kolom ${column}: ${error}`;
    }

    // Cultural greetings based on time
    static getGreeting() {
        const hour = new Date().getHours();
        
        if (hour < 10) {
            return "Salamat pagi! (Selamat pagi!)";
        } else if (hour < 15) {
            return "Salamat siang! (Selamat siang!)";
        } else if (hour < 18) {
            return "Salamat sore! (Selamat sore!)";
        } else {
            return "Salamat malam! (Selamat malam!)";
        }
    }

    // Validate code structure (removed cultural validation)
    static validateCodeStructure(ast) {
        const violations = [];
        
        // Basic code quality checks
        if (!this.hasProperStructure(ast)) {
            violations.push("Pertimbangkan untuk memperbaiki struktur kode");
        }
        
        return violations;
    }

    static hasProperStructure(ast) {
        // Basic structure validation
        return ast && typeof ast === 'object';
    }

    // Generate MinangScript code templates
    static generateTemplate(type) {
        switch (type) {
            case 'basic':
                return `// MinangScript - Program Dasar

cetak "${this.getGreeting()}"

// Variabel dengan makna budaya
buek namo = "MinangScript"
ambiak umur = 1
tagak filosofi = "Sederhana dan Efektif"

// Fungsi dasar
karojo sambutan(nama) {
    jadi "Salamat datang ka " + nama
}

cetak sambutan(namo)
cetak "Mari belajar pemrograman dengan MinangScript"
`;

            case 'web-app':
                return `// MinangScript - Web Application Template
// Modern web app dengan DOM manipulation

// Ambil elemen dari halaman
buek tombol = piliah("#myButton")
buek output = piliah("#output")
buek input = piliah("#userInput")

// Fungsi untuk menangani klik
karojo handleKlik() {
    buek nilai = input.nilai
    kalau nilai {
        output.konten = "Hello, " + nilai + "!"
    } lain {
        output.konten = "Masukkan nama terlebih dahulu!"
    }
}

// Tambah event listener
dengar(tombol, "klik", handleKlik)

// Tampilkan pesan awal
cetak "Web app MinangScript siap digunakan!"
`;

            case 'api-client':
                return `// MinangScript - API Client Template
// Aplikasi yang berkomunikasi dengan REST API

async karojo ambilData() {
    cubo {
        // Fetch data dari API
        buek response = tunggu kirim("https://api.example.com/users")
        buek users = tunggu response.json()
        
        // Tampilkan di halaman
        buek container = piliah("#userList")
        container.konten = ""
        
        untuak (buek user dalam users) {
            buek div = buat("div")
            div.konten = user.name + " - " + user.email
            container.tambah(div)
        }
        
    } tangkok (error) {
        cetak "Error mengambil data: " + error.message
    }
}

// Fungsi untuk kirim data baru
async karojo kirimUser(userData) {
    cubo {
        buek response = tunggu kirimPost("https://api.example.com/users", userData)
        cetak "User berhasil dibuat: " + response.id
        ambilData() // Refresh data
    } tangkok (error) {
        cetak "Error mengirim data: " + error.message
    }
}

// Inisialisasi
ambilData()
`;

            case 'interactive':
                return `// MinangScript - Interactive Web Components
// Komponen web interaktif dengan animasi

// Setup elemen utama
buek app = piliah("#app")
buek counter = 0

// Buat komponen counter
karojo buatCounter() {
    buek container = buat("div")
    container.kelas = "counter-container"
    
    buek display = buat("h2")
    display.konten = counter
    
    buek btnPlus = buat("button")
    btnPlus.konten = "+"
    dengar(btnPlus, "klik", () => {
        counter++
        display.konten = counter
        simpan("counter", counter)
    })
    
    buek btnMinus = buat("button") 
    btnMinus.konten = "-"
    dengar(btnMinus, "klik", () => {
        counter--
        display.konten = counter
        simpan("counter", counter)
    })
    
    container.tambah(display)
    container.tambah(btnMinus)
    container.tambah(btnPlus)
    
    jadi container
}

// Load saved counter value
buek savedCounter = ambil("counter")
kalau savedCounter {
    counter = parseInt(savedCounter)
}

// Render komponen
buek counterComponent = buatCounter()
app.tambah(counterComponent)

cetak "Interactive counter ready!"
`;

            case 'form-handler':
                return `// MinangScript - Form Handling Template
// Aplikasi untuk menangani form dan validasi

// Ambil elemen form
buek form = piliah("#userForm")
buek nameInput = piliah("#name")
buek emailInput = piliah("#email")
buek errorDiv = piliah("#errors")

// Fungsi validasi
karojo validasiEmail(email) {
    buek pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    jadi pattern.test(email)
}

karojo validasiForm() {
    buek errors = []
    
    kalau !nameInput.nilai.trim() {
        errors.push("Nama wajib diisi")
    }
    
    kalau !emailInput.nilai.trim() {
        errors.push("Email wajib diisi")
    } lainKalau !validasiEmail(emailInput.nilai) {
        errors.push("Format email tidak valid")
    }
    
    jadi errors
}

// Handle form submission
dengar(form, "submit", async (event) => {
    event.preventDefault()
    
    buek errors = validasiForm()
    
    kalau errors.length > 0 {
        errorDiv.konten = errors.join("<br>")
        errorDiv.style.display = "block"
        jadi
    }
    
    errorDiv.style.display = "none"
    
    // Kirim data ke server
    buek formData = {
        name: nameInput.nilai,
        email: emailInput.nilai
    }
    
    cubo {
        buek response = tunggu kirimPost("/api/users", formData)
        cetak "Data berhasil disimpan!"
        form.reset()
    } tangkok (error) {
        errorDiv.konten = "Error: " + error.message
        errorDiv.style.display = "block"
    }
})

cetak "Form handler siap digunakan!"
`;
            case 'gotong-royong':
                return `// Template Gotong Royong - Kerja Sama
// Filosofi: Berat sama dipikul, ringan sama dijinjing

karojo gotongRoyongHitung(angka1, angka2, angka3) {
    cetak "🤝 Gotong royong menghitung bersama"
    buek hasil = angka1 + angka2 + angka3
    jadi hasil
}

karojo gotongRoyongBagi(total, jumlahOrang) {
    cetak "📊 Membagi hasil secara adil"
    jadi total / jumlahOrang
}

// Contoh penggunaan
buek totalPekerjaan = gotongRoyongHitung(10, 20, 30)
buek bagianPerOrang = gotongRoyongBagi(totalPekerjaan, 3)

cetak "Total pekerjaan: " + totalPekerjaan
cetak "Bagian per orang: " + bagianPerOrang
`;

            case 'musyawarah':
                return `// Template Musyawarah - Pengambilan Keputusan
// Filosofi: Bulek aie dek pambuluah, bulek kato dek mufakat

karojo musyawarahKeputusan(topik, pilihan) {
    cetak "🗣️ Memulai musyawarah tentang: " + topik
    cetak "📋 Pilihan yang tersedia: " + pilihan
    
    // Simulasi proses musyawarah
    cetak "💭 Bertukar pikiran..."
    cetak "🤔 Mencari mufakat..."
    
    jadi "Mufakat tercapai untuk " + topik
}

// Contoh penggunaan
buek topik = "Rencana Pembangunan Nagari"
buek pilihan = "A: Jalan, B: Jembatan, C: Sekolah"

buek keputusan = musyawarahKeputusan(topik, pilihan)
cetak keputusan
`;

            case 'alam-takambang':
                return `// Template Alam Takambang Jadi Guru
// Filosofi: Belajar dari alam sebagai guru

karojo alamTakambangPelajaran(fenomena) {
    cetak "🌿 Mengamati alam: " + fenomena
    
    kalau fenomena == "air" {
        jadi "Air mengalir ke tempat rendah - jadilah rendah hati"
    } lain kalau fenomena == "bambu" {
        jadi "Bambu lentur namun kuat - jadilah fleksibel"
    } lain kalau fenomena == "gunung" {
        jadi "Gunung tinggi namun kokoh - jadilah teguh"
    } lain {
        jadi "Setiap makhluk alam punya pelajaran"
    }
}

// Contoh penggunaan
buek pelajaranAir = alamTakambangPelajaran("air")
buek pelajaranBambu = alamTakambangPelajaran("bambu")
buek pelajaranGunung = alamTakambangPelajaran("gunung")

cetak pelajaranAir
cetak pelajaranBambu
cetak pelajaranGunung
`;

            default:
                return this.generateTemplate('basic');
        }
    }

    // Convert MinangScript keywords to explanations
    static explainKeyword(keyword) {
        const explanations = {
            'buek': 'Membuat variabel baru dengan var (seperti "var" dalam JavaScript)',
            'ambiak': 'Membuat variabel dengan let (seperti "let" dalam JavaScript)',
            'tagak': 'Membuat konstanta (seperti "const" dalam JavaScript)',
            'karojo': 'Mendefinisikan fungsi (seperti "function" dalam JavaScript)',
            'jadi': 'Mengembalikan nilai dari fungsi (seperti "return")',
            'kalau': 'Kondisi if - "jika" dalam bahasa Minang',
            'lain': 'Kondisi else - "lainnya"',
            'kalauLain': 'Kondisi else if - "jika lain"',
            'selamo': 'Perulangan while - "selama/terus-menerus"',
            'untuak': 'Perulangan for - "untuk" dalam bahasa Minang',
            'baronti': 'Menghentikan perulangan (seperti "break")',
            'cetak': 'Representasi console JavaScript - untuk output',
            'cetak.pesan': 'Menampilkan pesan informasi (seperti console.info)',
            'cetak.rusak': 'Menampilkan pesan error (seperti console.error)',
            'cetak.peringatan': 'Menampilkan pesan peringatan (seperti console.warn)',
            'cetak.tabel': 'Menampilkan data dalam bentuk tabel (seperti console.table)',
            'cetak.urai': 'Menampilkan pesan debug (seperti console.debug)',
            'cetak.ingek': 'Menampilkan pesan peringatan (seperti console.warn)',
            'angko': 'Tipe data Number - untuk angka',
            'kato': 'Tipe data String - untuk kata/teks',
            'kabanaran': 'Tipe data Boolean - untuk nilai benar/salah',
            'bana': 'Nilai true - "benar" dalam bahasa Minang',
            'salah': 'Nilai false - "salah"',
            'kosong': 'Nilai null/undefined - "kosong"',
            'gotongRoyong': 'Fungsi kerja sama - filosofi Minangkabau',
            'musyawarah': 'Fungsi berunding - mencapai mufakat',
            'alamTakambang': 'Belajar dari alam - filosofi Minangkabau',
            'adatBasandi': 'Etika dan nilai - adat basandi syarak'
        };

        return explanations[keyword] || `Kata kunci ${keyword} belum ada penjelasan`;
    }

    // Generate documentation
    static generateDocs(functions, variables) {
        let docs = `# Dokumentasi MinangScript

## Filosofi Minangkabau dalam Kode

MinangScript mengintegrasikan nilai-nilai budaya Minangkabau:

1. **Gotong Royong**: Kerja sama dan saling membantu
2. **Musyawarah Mufakat**: Pengambilan keputusan bersama
3. **Alam Takambang Jadi Guru**: Belajar dari alam
4. **Adat Basandi Syarak**: Nilai etika dan moral

## Fungsi yang Tersedia

`;

        functions.forEach(func => {
            docs += `### ${func.name}\n`;
            docs += `- **Deskripsi**: ${func.description || 'Tidak ada deskripsi'}\n`;
            docs += `- **Parameter**: ${func.params ? func.params.join(', ') : 'Tidak ada'}\n`;
            docs += `- **Contoh**: \`${func.example || 'Belum ada contoh'}\`\n\n`;
        });

        docs += `## Variabel Global

`;

        variables.forEach(variable => {
            docs += `- **${variable.name}**: ${variable.description || 'Tidak ada deskripsi'}\n`;
        });

        return docs;
    }

    // Performance profiler
    static profileCode(ast, runtime) {
        const startTime = performance.now();
        const result = runtime.execute(ast);
        const endTime = performance.now();
        
        return {
            result: result,
            executionTime: endTime - startTime,
            memoryUsage: process.memoryUsage ? process.memoryUsage() : null
        };
    }

    // Code formatter
    static formatCode(code) {
        // Simple code formatting
        return code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => {
                // Add indentation for block content
                if (line.includes('{') && !line.includes('}')) {
                    return line;
                }
                if (line.includes('}')) {
                    return line;
                }
                if (line.startsWith('fungsi') || line.startsWith('kalau') || 
                    line.startsWith('ulang') || line.startsWith('untuak')) {
                    return line;
                }
                return '    ' + line;
            })
            .join('\n');
    }

    // Version info
    static getVersionInfo() {
        return {
            version: '1.0.0',
            name: 'MinangScript',
            description: 'Bahasa pemrograman dengan filosofi Minangkabau',
            author: 'Komunitas MinangScript',
            license: 'MIT',
            culturalPrinciples: [
                'Gotong Royong',
                'Musyawarah Mufakat', 
                'Alam Takambang Jadi Guru',
                'Adat Basandi Syarak'
            ]
        };
    }
}

module.exports = { MinangUtils };
