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

    // Validate Minangkabau cultural principles in code
    static validateCulturalPrinciples(ast) {
        const violations = [];
        
        // Check for collaborative patterns (gotongRoyong)
        if (!this.hasCollaborativePattern(ast)) {
            violations.push("Pertimbangkan menambahkan pola gotong royong untuk kerja sama");
        }
        
        // Check for ethical considerations (adatBasandi)
        if (!this.hasEthicalConsiderations(ast)) {
            violations.push("Pertimbangkan aspek adat basandi syarak dalam kode");
        }
        
        return violations;
    }

    static hasCollaborativePattern(ast) {
        // Simple check for function calls that suggest collaboration
        return JSON.stringify(ast).includes('gotongRoyong') || 
               JSON.stringify(ast).includes('musyawarah');
    }

    static hasEthicalConsiderations(ast) {
        // Simple check for ethical considerations
        return JSON.stringify(ast).includes('adatBasandi') ||
               JSON.stringify(ast).includes('ethical');
    }

    // Generate MinangScript code templates
    static generateTemplate(type) {
        switch (type) {
            case 'basic':
                return `// MinangScript - Program Dasar
// Filosofi: Alam Takambang Jadi Guru

cetak "${this.getGreeting()}"

// Variabel dengan makna budaya
buek namo = "MinangScript"
ambiak umur = 1
tagak filosofi = "Gotong Royong"

// Fungsi dengan nilai kearifan lokal
karojo sambutan(nama) {
    jadi "Salamat datang ka " + nama
}

cetak sambutan(namo)
cetak "Mari belajar dari alam dan budaya Minangkabau"
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
