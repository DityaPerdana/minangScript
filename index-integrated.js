#!/usr/bin/env node

const { MinangCompiler } = require('./src/compiler/MinangCompiler');
const { MinangRuntime } = require('./src/runtime/MinangRuntime');
const { MinangLexer } = require('./src/lexer/MinangLexer');
const { MinangUtils } = require('./src/utils/MinangUtils');
const fs = require('fs');
const path = require('path');

class MinangScript {
    constructor() {
        this.compiler = new MinangCompiler();
        this.runtime = new MinangRuntime();
        this.lexer = new MinangLexer();
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

        // Create sample MinangScript file with updated keywords
        const sampleCode = `// Selamat datang di MinangScript!
// File ini menggunakan filosofi Minangkabau

cetak "Salamat datang ka " + "${projectName}"

// Contoh variabel
buek namo = "MinangScript"
ambiak versi = "1.0.1"
tagak filosofi = "Gotong Royong"

// Contoh fungsi dengan nilai gotong royong
karojo sambutan(nama) {
    jadi "Salamat datang, " + nama + "! Mari bergotong royong."
}

cetak sambutan(namo)
`;

        fs.writeFileSync(path.join(projectDir, 'main.minang'), sampleCode);
        console.log(`✅ Proyek ${projectName} telah dibuat!`);
        console.log(`📁 Masuk ke direktori: cd ${projectName}`);
        console.log(`🚀 Jalankan: minang run main.minang`);
    }

    // Interactive REPL
    repl() {
        console.log('🏔️ MinangScript REPL - Mode Interaktif');
        console.log('Ketik kode MinangScript dan tekan Enter');
        console.log('Ketik .help untuk bantuan, .exit untuk keluar\n');

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'minang> '
        });

        rl.prompt();

        rl.on('line', (input) => {
            const trimmed = input.trim();

            if (trimmed === '.exit') {
                console.log('🏔️ Salamat tinggal! (Goodbye!)');
                rl.close();
                return;
            }

            if (trimmed === '.help') {
                this.showReplHelp();
                rl.prompt();
                return;
            }

            if (trimmed === '.examples') {
                this.showExamples();
                rl.prompt();
                return;
            }

            if (trimmed.startsWith('.analyze ')) {
                const code = trimmed.substring(9);
                this.analyzeCode(code);
                rl.prompt();
                return;
            }

            if (trimmed === '') {
                rl.prompt();
                return;
            }

            try {
                const compiled = this.compiler.compile(trimmed);
                this.runtime.execute(compiled);
            } catch (error) {
                console.error('❌', error.message);
            }

            rl.prompt();
        });

        rl.on('close', () => {
            console.log('\n🏔️ Salamat tinggal!');
            process.exit(0);
        });
    }

    showReplHelp() {
        console.log(`
📖 MinangScript REPL Help:

Commands:
  .help      - Tampilkan bantuan ini
  .exit      - Keluar dari REPL
  .examples  - Tampilkan contoh kode
  .analyze <code> - Analisis struktur kode

Contoh MinangScript:
  buek nama = "Minang"
  cetak "Hello " + nama
  
  karojo tambah(a, b) {
      jadi a + b
  }
  
  kalau 5 > 3 {
      cetak "Lima lebih besar"
  }

Fungsi Budaya:
  gotongRoyong("kerja", "bersama")
  musyawarah("topik", "peserta")
  alamTakambang("pelajaran")
        `);
    }

    showExamples() {
        console.log(`
🌟 MinangScript Examples:

Deklarasi Variabel:
  buek nama = "Siti"           // var
  ambiak umur = 25             // let
  tagak PI = 3.14              // const

Fungsi:
  karojo salam(nama) {
      jadi "Salamat datang " + nama
  }

Kondisi:
  kalau umur >= 18 {
      cetak "Dewasa"
  } lain {
      cetak "Muda"
  }

Loop:
  selamo i < 5 {
      cetak "Iterasi ke-" + i
      i = i + 1
  }

Console Methods:
  cetak "Output normal"
  cetak.pesan "Info message"
  cetak.peringatan "Warning"
  cetak.rusak "Error message"

Cultural Programming:
  gotongRoyong("membangun", "bersama")
  musyawarah("rencana", "warga")
  alamTakambang("pelajaran dari alam")
        `);
    }

    // Analyze code structure
    analyzeCode(code) {
        try {
            console.log('\n🔍 Analisis Kode:');
            
            // Tokenize
            const tokens = this.lexer.tokenize(code);
            console.log(`📝 Tokens: ${tokens.length - 1} (excluding EOF)`);
            
            // Parse
            const ast = this.compiler.compile(code);
            console.log(`🌳 AST Nodes: ${this.countASTNodes(ast)}`);
            
            // Cultural analysis
            const cultural = MinangUtils.validateCulturalPrinciples(ast);
            if (cultural.length > 0) {
                console.log('🏔️ Saran Budaya:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ Prinsip budaya terintegrasi dengan baik');
            }
            
        } catch (error) {
            console.error('❌ Analisis gagal:', error.message);
        }
    }

    countASTNodes(node) {
        if (!node || typeof node !== 'object') return 0;
        
        let count = 1;
        for (const key in node) {
            const value = node[key];
            if (Array.isArray(value)) {
                count += value.reduce((sum, item) => sum + this.countASTNodes(item), 0);
            } else if (typeof value === 'object') {
                count += this.countASTNodes(value);
            }
        }
        return count;
    }

    // Validate MinangScript file
    validate(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File tidak ditemukan: ${filePath}`);
            process.exit(1);
        }

        console.log(`🔍 Memvalidasi: ${filePath}`);
        
        try {
            const code = fs.readFileSync(filePath, 'utf8');
            
            // Check syntax
            this.compiler.compile(code);
            console.log('✅ Sintaks valid');
            
            // Cultural validation
            const cultural = MinangUtils.validateCulturalPrinciples(code);
            if (cultural.length > 0) {
                console.log('🏔️ Saran budaya:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ Prinsip budaya terintegrasi dengan baik');
            }
            
            // Test transpilation
            this.compiler.transpile(code);
            console.log('✅ Transpilasi berhasil');
            
            console.log('🎉 Validasi file selesai');
            
        } catch (error) {
            console.error('❌ Validasi gagal:', error.message);
            process.exit(1);
        }
    }

    // Format MinangScript code
    format(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File tidak ditemukan: ${filePath}`);
            process.exit(1);
        }

        const code = fs.readFileSync(filePath, 'utf8');
        const formatted = MinangUtils.formatCode(code);
        
        console.log('📝 Kode yang diformat:');
        console.log(formatted);
        
        // Option to save formatted code
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Simpan kode yang diformat? (y/N): ', (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                fs.writeFileSync(filePath, formatted);
                console.log('✅ File diformat dan disimpan');
            }
            rl.close();
        });
    }

    // Generate template code
    template(type, outputPath) {
        const templates = {
            'basic': MinangUtils.generateTemplate('basic'),
            'gotong-royong': MinangUtils.generateTemplate('gotong-royong'),
            'musyawarah': MinangUtils.generateTemplate('musyawarah'),
            'alam-takambang': MinangUtils.generateTemplate('alam-takambang')
        };

        if (!templates[type]) {
            console.error(`❌ Tipe template tidak dikenal: ${type}`);
            console.log('Template yang tersedia:', Object.keys(templates).join(', '));
            process.exit(1);
        }

        const code = templates[type];
        
        if (outputPath) {
            fs.writeFileSync(outputPath, code);
            console.log(`✅ Template dibuat: ${outputPath}`);
        } else {
            console.log(code);
        }
    }

    // Show version information
    version() {
        const packageJson = require('./package.json');
        console.log(`
🏔️ MinangScript v${packageJson.version}
${packageJson.description}

Pengarang: ${packageJson.author}
Lisensi: ${packageJson.license}

Prinsip Budaya Minangkabau:
  🤝 Gotong Royong - Kerja sama dan tolong-menolong
  🗣️ Musyawarah Mufakat - Pengambilan keputusan bersama  
  🌿 Alam Takambang Jadi Guru - Alam sebagai guru
  ⚖️ Adat Basandi Syarak - Adat berdasarkan syariat

Runtime: Node.js ${process.version}
Platform: ${process.platform} ${process.arch}

GitHub: https://github.com/DityaPerdana/minangScript
NPM: https://www.npmjs.com/package/minangscript
        `);
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
🏔️  MinangScript v1.0.1
Bahasa pemrograman dengan filosofi Minangkabau

Penggunaan:
  minang run <file.minang>        - Jalankan file MinangScript
  minang build <input> <output>   - Bangun ke JavaScript
  minang new <project>            - Buat proyek baru
  minang repl                     - Mode interaktif REPL
  minang validate <file.minang>   - Validasi file MinangScript  
  minang format <file.minang>     - Format kode MinangScript
  minang template <type> [file]   - Generate template kode
  minang version                  - Informasi versi
  minang help                     - Tampilkan bantuan

Template yang tersedia:
  basic, gotong-royong, musyawarah, alam-takambang

Contoh:
  minang new myproject
  minang run main.minang
  minang repl
  minang template basic hello.minang

📦 NPM: npm install -g minangscript
🏔️ "Alam Takambang Jadi Guru" - Belajar dari alam
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
                console.log('Contoh: minang run main.minang');
                process.exit(1);
            }
            break;

        case 'build':
            if (args[1] && args[2]) {
                minang.build(args[1], args[2]);
            } else {
                console.error('❌ Harap berikan file input dan output');
                console.log('Contoh: minang build app.minang app.js');
                process.exit(1);
            }
            break;

        case 'new':
            if (args[1]) {
                minang.createProject(args[1]);
            } else {
                console.error('❌ Harap berikan nama proyek');
                console.log('Contoh: minang new myproject');
                process.exit(1);
            }
            break;

        case 'repl':
            minang.repl();
            break;

        case 'validate':
            if (args[1]) {
                minang.validate(args[1]);
            } else {
                console.error('❌ Harap berikan nama file untuk divalidasi');
                console.log('Contoh: minang validate main.minang');
                process.exit(1);
            }
            break;

        case 'format':
            if (args[1]) {
                minang.format(args[1]);
            } else {
                console.error('❌ Harap berikan nama file untuk diformat');
                console.log('Contoh: minang format main.minang');
                process.exit(1);
            }
            break;

        case 'template':
            if (args[1]) {
                minang.template(args[1], args[2]);
            } else {
                console.error('❌ Harap berikan tipe template');
                console.log('Contoh: minang template basic hello.minang');
                console.log('Template: basic, gotong-royong, musyawarah, alam-takambang');
                process.exit(1);
            }
            break;

        case 'version':
            minang.version();
            break;

        case 'help':
            console.log(`
🏔️  MinangScript - Panduan Penggunaan Lengkap

Perintah yang tersedia:

📂 Project Management:
  new <project>       - Buat proyek baru MinangScript
  template <type>     - Generate template kode budaya

🚀 Execution:
  run <file>          - Jalankan file .minang
  build <in> <out>    - Transpile ke JavaScript
  repl                - Mode interaktif untuk testing

🔧 Development Tools:
  validate <file>     - Validasi sintaks dan budaya
  format <file>       - Format kode MinangScript
  version             - Info versi dan platform

📖 Template Types:
  basic               - Template dasar MinangScript
  gotong-royong       - Template kerja sama
  musyawarah          - Template pengambilan keputusan
  alam-takambang      - Template belajar dari alam

💡 Contoh penggunaan:
  minang new nagari-digital
  minang template gotong-royong team.minang
  minang run team.minang
  minang repl

🌟 Filosofi MinangScript:
  "Alam Takambang Jadi Guru"
  Belajar dari alam dan budaya Minangkabau

📦 Installation: npm install -g minangscript
🏔️ Repository: https://github.com/DityaPerdana/minangScript
            `);
            break;

        default:
            console.error(`❌ Perintah tidak dikenal: ${command}`);
            console.log('Gunakan "minang help" untuk melihat bantuan lengkap');
            console.log('Atau "minang" tanpa argumen untuk bantuan singkat');
            process.exit(1);
    }
}
