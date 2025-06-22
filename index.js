#!/usr/bin/env node

const { MinangCompiler } = require('./src/compiler/MinangCompiler');
const { MinangRuntime } = require('./src/runtime/MinangRuntime');
const fs = require('fs');
const path = require('path');

class MinangScript {
    constructor() {
        this.compiler = new MinangCompiler();
        this.runtime = new MinangRuntime();
    }

    // Main entry point for MinangScript CLI
    run(filePath) {
        try {
            console.log('🏔️  MinangScript - Alam Takambang Jadi Guru');
            
            if (!fs.existsSync(filePath)) {
                console.error(`❌ File tidak ditemukan: ${filePath}`);
                process.exit(1);
            }

            const sourceCode = fs.readFileSync(filePath, 'utf8');
            const compiled = this.compiler.compile(sourceCode);
            this.runtime.execute(compiled);
            
        } catch (error) {
            console.error('❌ Kesalahan:', error.message);
            process.exit(1);
        }
    }

    // Build MinangScript to JavaScript
    build(inputPath, outputPath) {
        try {
            console.log('🔨 Membangun MinangScript...');
            
            const sourceCode = fs.readFileSync(inputPath, 'utf8');
            const jsCode = this.compiler.transpile(sourceCode);
            
            fs.writeFileSync(outputPath, jsCode);
            console.log(`✅ Berhasil dibangun ke: ${outputPath}`);
            
        } catch (error) {
            console.error('❌ Gagal membangun:', error.message);
            process.exit(1);
        }
    }

    // Create new MinangScript project
    createProject(projectName) {
        const projectDir = path.join(process.cwd(), projectName);
        
        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        }

        // Create sample MinangScript file
        const sampleCode = `// Selamat datang di MinangScript!
// File ini menggunakan filosofi Minangkabau

tampilkan "Salamat datang ka " + "${projectName}"

// Contoh variabel
buat namo = "MinangScript"
buat versi = "1.0.0"

// Contoh fungsi dengan nilai gotong royong
fungsi sambutan(nama) {
    baliak "Salamat datang, " + nama + "! Mari bergotong royong."
}

tampilkan sambutan(namo)
`;

        fs.writeFileSync(path.join(projectDir, 'main.minang'), sampleCode);
        console.log(`✅ Proyek ${projectName} telah dibuat!`);
        console.log(`📁 Masuk ke direktori: cd ${projectName}`);
        console.log(`🚀 Jalankan: minang run main.minang`);
    }
}

// Export for use as a module
module.exports = { MinangScript };

// CLI usage when run directly
if (require.main === module) {
    const args = process.argv.slice(2);
    const minang = new MinangScript();

    if (args.length === 0) {
        console.log(`
🏔️  MinangScript v1.0.0
Bahasa pemrograman dengan filosofi Minangkabau

Penggunaan:
  minang run <file.minang>     - Jalankan file MinangScript
  minang build <input> <output> - Bangun ke JavaScript
  minang new <project>         - Buat proyek baru
  minang help                  - Tampilkan bantuan
        `);
        process.exit(0);
    }

    const command = args[0];

    switch (command) {
        case 'run':
            if (args[1]) {
                minang.run(args[1]);
            } else {
                console.error('❌ Harap berikan nama file untuk dijalankan');
                process.exit(1);
            }
            break;

        case 'build':
            if (args[1] && args[2]) {
                minang.build(args[1], args[2]);
            } else {
                console.error('❌ Harap berikan file input dan output');
                process.exit(1);
            }
            break;

        case 'new':
            if (args[1]) {
                minang.createProject(args[1]);
            } else {
                console.error('❌ Harap berikan nama proyek');
                process.exit(1);
            }
            break;

        case 'help':
            console.log(`
🏔️  MinangScript - Panduan Penggunaan

Perintah yang tersedia:
  run <file>       - Jalankan file .minang
  build <in> <out> - Transpile ke JavaScript
  new <project>    - Buat proyek baru
  help             - Tampilkan bantuan ini

Contoh penggunaan:
  minang new myproject
  minang run main.minang
  minang build app.minang app.js

Filosofi Minangkabau dalam kode:
  - gotongRoyong() : Bekerja sama
  - musyawarah()   : Berunding
  - tampilkan()    : Menampilkan output
  - buat           : Membuat variabel
            `);
            break;

        default:
            console.error(`❌ Perintah tidak dikenal: ${command}`);
            console.log('Gunakan "minang help" untuk melihat bantuan');
            process.exit(1);
    }
}
