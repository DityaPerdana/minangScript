#!/usr/bin/env node

const { MinangCompiler } = require('./src/compiler/MinangCompiler');
const { MinangRuntime } = require('./src/runtime/MinangRuntime');
const { MinangLexer } = require('./src/lexer/MinangLexer');
const { MinangUtils } = require('./src/utils/MinangUtils');
const { MinangI18n } = require('./src/utils/i18n');
const { MinangConfig } = require('./src/utils/config');
const { MinangPaketCLI } = require('./src/package-manager/MinangPaketCLI');
const fs = require('fs');
const path = require('path');

class MinangScript {
    constructor() {
        this.compiler = new MinangCompiler();
        this.runtime = new MinangRuntime();
        this.lexer = new MinangLexer();
        this.i18n = new MinangI18n();
    }

    // Main entry point for MinangScript CLI
    run(filePath) {
        try {
            console.log(this.i18n.t('welcome'));
            
            if (!fs.existsSync(filePath)) {
                console.error(this.i18n.t('fileNotFound', filePath));
                process.exit(1);
            }

            const sourceCode = fs.readFileSync(filePath, 'utf8');
            const compiled = this.compiler.compile(sourceCode);
            this.runtime.execute(compiled);
            
        } catch (error) {
            console.error(this.i18n.t('error', error.message));
            process.exit(1);
        }
    }

    // Build MinangScript to JavaScript
    build(inputPath, outputPath) {
        try {
            console.log(this.i18n.t('building'));
            
            const sourceCode = fs.readFileSync(inputPath, 'utf8');
            const jsCode = this.compiler.transpile(sourceCode);
            
            fs.writeFileSync(outputPath, jsCode);
            console.log(this.i18n.t('buildSuccess', outputPath));
            
        } catch (error) {
            console.error(this.i18n.t('buildFailed', error.message));
            process.exit(1);
        }
    }

    // Create new MinangScript project
    createProject(projectName) {
        const projectDir = path.join(process.cwd(), projectName);
        
        if (fs.existsSync(projectDir)) {
            console.error(this.i18n.t('projectExists', projectName));
            process.exit(1);
        }

        fs.mkdirSync(projectDir, { recursive: true });

        // Create main.minang
        const mainContent = `// ${projectName} - MinangScript Project
// Dibuat dengan filosofi Minangkabau

cetak "Salamat datang ka ${projectName}!"

buek namo = "MinangScript"
ambiak versi = "1.0.1"
tagak filosofi = "Gotong Royong"

// Contoh fungsi dengan filosofi Minangkabau
karojo sambutan(nama) {
    jadi "Salamat datang, " + nama + "! Mari bergotong royong."
}

cetak sambutan(namo)
cetak "🏔️ Alam takambang jadi guru!"

// Implementasi gotong royong
// Mari belajar MinangScript - Bahasa pemrograman dengan nuansa Minangkabau

cetak "Salamat datang ka MinangScript!"
cetak "Program sederhana untuk demonstrasi"

buek nama = "Dunia" 
cetak "Hello " + nama
`;

        fs.writeFileSync(path.join(projectDir, 'main.minang'), mainContent);

        // Create package.json
        const packageJson = {
            name: projectName,
            version: "1.0.0",
            description: `MinangScript project: ${projectName}`,
            main: "main.minang",
            scripts: {
                start: "minang run main.minang",
                build: "minang build main.minang main.js"
            },
            keywords: ["minangscript", "minangkabau"],
            author: "MinangScript Developer",
            license: "MIT"
        };

        fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));

        console.log(this.i18n.t('projectCreated', projectName));
        console.log(this.i18n.t('enterDirectory', projectName));
        console.log(this.i18n.t('runProject'));
    }

    // Interactive REPL
    repl() {
        console.log(this.i18n.t('replWelcome'));
        console.log(this.i18n.t('replInstructions'));
        console.log(this.i18n.t('replHelp'));

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
                console.log(this.i18n.t('goodbye'));
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
            console.log('\n' + this.i18n.t('goodbye'));
            process.exit(0);
        });
    }

    showReplHelp() {
        const lang = this.i18n.getCurrentLanguage();
        console.log(`
${this.i18n.t('replHelpTitle')}

${this.i18n.t('replCommands')}
  .help      - ${this.i18n.t('helpCommand')}
  .exit      - ${this.i18n.t('exitCommand')}
  .examples  - ${this.i18n.t('examplesCommand')}
  .analyze <code> - ${this.i18n.t('analyzeCommand')}

${this.i18n.t('replExamples')}
  buek nama = "Minang"
  cetak "Hello " + nama
  
  karojo tambah(a, b) {
      jadi a + b
  }
  
  kalau 5 > 3 {
      cetak "${lang === 'id' ? 'Lima lebih besar' : 'Five is greater'}"
  }

${this.i18n.t('replCulturalFunctions')}
  cetak "Program MinangScript sederhana"
  
  buek hasil = 10 + 20
  cetak "Hasil perhitungan: " + hasil
        `);
    }

    showExamples() {
        console.log(`
🌟 MinangScript Examples:

1. Basic Variables:
   buek nama = "Minang"
   ambiak umur = 25
   tagak PI = 3.14159

2. Functions:
   karojo tambah(a, b) {
       jadi a + b
   }

3. Conditionals:
   kalau umur >= 18 {
       cetak "Dewasa"
   } lain {
       cetak "Remaja"
   }

4. Cultural Functions:
   gotongRoyong("task1", "task2", "task3")
   cetak "Program dasar MinangScript"
   buek x = 5
   buek y = 10
   cetak "Jumlah: " + (x + y)
        `);
    }

    // Analyze code structure
    analyzeCode(code) {
        try {
            console.log('\n🔍 Code Analysis:');
            
            // Tokenize
            const tokens = this.lexer.tokenize(code);
            console.log(`📝 Tokens: ${tokens.length - 1} (excluding EOF)`);
            
            // Parse
            const ast = this.compiler.compile(code);
            console.log(`🌳 AST generated successfully`);
            
            // Cultural analysis
            const cultural = MinangUtils.validateCulturalPrinciples(code);
            if (cultural.length > 0) {
                console.log('🏔️ Cultural Suggestions:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ Cultural principles well integrated');
            }
            
        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
        }
    }

    // Validate MinangScript file
    validate(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                console.error(this.i18n.t('fileNotFound', filePath));
                process.exit(1);
            }

            console.log(this.i18n.t('validating', filePath));
            
            const sourceCode = fs.readFileSync(filePath, 'utf8');
            
            // Syntax validation
            try {
                this.compiler.compile(sourceCode);
                console.log('✅ ' + this.i18n.t('syntaxValid'));
            } catch (error) {
                console.error('❌ ' + this.i18n.t('syntaxError', error.message));
                return;
            }

            // Cultural validation
            const culturalSuggestions = MinangUtils.validateCulturalPrinciples(sourceCode);
            if (culturalSuggestions.length > 0) {
                console.log('🏔️ ' + this.i18n.t('culturalSuggestions'));
                culturalSuggestions.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ ' + this.i18n.t('culturalValid'));
            }

        } catch (error) {
            console.error(this.i18n.t('validationFailed', error.message));
            process.exit(1);
        }
    }

    // Format MinangScript code
    format(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                console.error(this.i18n.t('fileNotFound', filePath));
                process.exit(1);
            }

            console.log(this.i18n.t('formatting', filePath));
            
            const sourceCode = fs.readFileSync(filePath, 'utf8');
            const formatted = MinangUtils.formatCode(sourceCode);
            
            console.log('📝 Formatted code:');
            console.log(formatted);
            
            // Ask if user wants to save
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(this.i18n.t('saveFormatted'), (answer) => {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                    fs.writeFileSync(filePath, formatted);
                    console.log('✅ ' + this.i18n.t('formattedSaved'));
                }
                rl.close();
            });

        } catch (error) {
            console.error(this.i18n.t('formattingFailed', error.message));
            process.exit(1);
        }
    }

    // Generate template code
    template(type, outputPath) {
        const templates = {
            basic: `// Basic MinangScript Template
cetak "Hello, MinangScript!"

buek nama = "Programmer"
karojo salam(nama) {
    jadi "Salamat datang, " + nama
}

cetak salam(nama)`,

            'gotong-royong': `// Gotong Royong Template
cetak "🤝 Gotong Royong - Mari Bekerja Sama"

karojo projectKolaborasi() {
    buek tugas = ["analisis", "desain", "implementasi", "testing"]
    buek tim = ["Alice", "Bob", "Charlie"]
    
    untuak i = 0; i < tugas.length; i++ {
        buek tugasSekarang = tugas[i]
        buek penanggungJawab = tim[i % tim.length]
        
        cetak penanggungJawab + " mengerjakan " + tugasSekarang
        gotongRoyong(tugasSekarang, penanggungJawab)
    }
    
    cetak "✅ Project selesai dengan gotong royong!"
}

projectKolaborasi()`,

            musyawarah: `// Musyawarah Mufakat Template
cetak "🗣️ Musyawarah untuk Mufakat"

karojo rapatTim(topik, peserta) {
    cetak "Memulai musyawarah tentang: " + topik
    
    ambiak hasil = musyawarah(topik, peserta)
    cetak "Hasil mufakat: " + hasil
    
    jadi hasil
}

buek anggotaTim = ["Kepala Nagari", "Datuk", "Penghulu", "Masyarakat"]
rapatTim("Pembangunan Infrastruktur", anggotaTim)`,

            'alam-takambang': `// Alam Takambang Jadi Guru Template
cetak "🌿 Alam Takambang Jadi Guru - Belajar dari Alam"

karojo belajarDariAlam() {
    cetak "Belajar kesabaran dari aliran sungai..."
    alamTakambang("air mengalir dengan sabar")
    
    cetak "Belajar ketahanan dari gunung..."
    alamTakambang("gunung berdiri teguh")
    
    cetak "Belajar kerjasama dari semut..."
    alamTakambang("semut bekerja bersama")
    
    cetak "🏔️ Alam mengajarkan wisdom of life"
}

belajarDariAlam()`
        };

        if (!templates[type]) {
            console.error(`❌ Template tidak ditemukan: ${type}`);
            console.log('Available templates: basic, gotong-royong, musyawarah, alam-takambang');
            process.exit(1);
        }

        const templateCode = templates[type];
        const fileName = outputPath || `template-${type}.minang`;

        fs.writeFileSync(fileName, templateCode);
        console.log(`✅ Template ${type} berhasil dibuat: ${fileName}`);
        console.log('🏔️ Siap untuk dikembangkan dengan filosofi Minangkabau!');
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

    // Async CLI handler
    async function runCLI() {
        if (args.length === 0) {
            console.log(`
🏔️  MinangScript v1.1.1
Bahasa pemrograman dengan filosofi Minangkabau

Penggunaan:
  minang run <file.minang>        - Jalankan file MinangScript
  minang build <input> <output>   - Bangun ke JavaScript
  minang new <project>            - Buat proyek baru
  minang paket <command>          - Package manager MinangScript
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
  minang paket pasang minang-ui
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
                    console.error(minang.i18n.t('provideFile'));
                    console.log(minang.i18n.t('example', 'minang build app.minang app.js'));
                    process.exit(1);
                }
                break;

            case 'new':
                if (args[1]) {
                    minang.createProject(args[1]);
                } else {
                    console.error(minang.i18n.t('provideFile'));
                    console.log(minang.i18n.t('example', 'minang new myproject'));
                    process.exit(1);
                }
                break;

            case 'paket':
            case 'package':
            case 'pkg':
                // Package manager commands
                const paketCLI = new MinangPaketCLI();
                const paketCommand = args[1];
                const paketArgs = args.slice(2);
                
                if (!paketCommand) {
                    console.log(`
🏔️ MinangPaket - Package Manager MinangScript

Usage: minang paket <command> [options]

Commands:
  init, inisialkan        - Inisialisasi proyek baru
  pasang, install         - Install paket
  lepas, uninstall        - Uninstall paket  
  daftar, list           - List paket terpasang
  cari, search           - Cari paket
  perbarui, update       - Update paket
  terbitkan, publish     - Publish paket
  bantuan, help          - Bantuan package manager

Examples:
  minang paket init myproject
  minang paket pasang minang-ui
  minang paket cari math
  
🤝 Gotong royong dalam pengelolaan paket MinangScript
                    `);
                } else {
                    await paketCLI.execute(paketCommand, paketArgs);
                }
                break;

            case 'repl':
                minang.repl();
                break;

            case 'validate':
                if (args[1]) {
                    minang.validate(args[1]);
                } else {
                    console.error(minang.i18n.t('provideFile'));
                    console.log(minang.i18n.t('example', 'minang validate main.minang'));
                    process.exit(1);
                }
                break;

            case 'format':
                if (args[1]) {
                    minang.format(args[1]);
                } else {
                    console.error(minang.i18n.t('provideFile'));
                    console.log(minang.i18n.t('example', 'minang format main.minang'));
                    process.exit(1);
                }
                break;

            case 'template':
                if (args[1]) {
                    minang.template(args[1], args[2]);
                } else {
                    console.error(minang.i18n.t('provideFile'));
                    console.log(minang.i18n.t('example', 'minang template basic hello.minang'));
                    console.log('Template: basic, gotong-royong, musyawarah, alam-takambang');
                    process.exit(1);
                }
                break;

            case 'version':
                minang.version();
                break;

            case 'lang':
            case 'language':
                if (args[1]) {
                    if (minang.i18n.setLanguage(args[1])) {
                        console.log(minang.i18n.t('languageChanged'));
                        if (args[1] === 'en') {
                            console.log(minang.i18n.t('switchToIndonesian'));
                        } else if (args[1] === 'id') {
                            console.log(minang.i18n.t('switchToEnglish'));
                        } else if (args[1] === 'auto') {
                            console.log('🔄 Auto-detection enabled. Language will be detected automatically.');
                        }
                    } else {
                        console.error('❌ Language not supported. Available: en, id, auto');
                    }
                } else {
                    minang.i18n.showLanguageHelp();
                }
                break;

            case 'help':
                console.log(`
${minang.i18n.t('helpTitle')}

${minang.i18n.t('helpAvailable')}

${minang.i18n.t('projectManagement')}
  new <project>       - ${minang.i18n.t('newProject')}
  paket <command>     - Package manager MinangScript
  template <type>     - ${minang.i18n.t('template')}

${minang.i18n.t('execution')}
  run <file>          - ${minang.i18n.t('runFile')}
  build <in> <out>    - ${minang.i18n.t('buildFile')}
  repl                - ${minang.i18n.t('repl')}

${minang.i18n.t('devTools')}
  validate <file>     - ${minang.i18n.t('validate')}
  format <file>       - ${minang.i18n.t('format')}
  version             - ${minang.i18n.t('version')}
  lang <en|id>        - Change language / Ganti bahasa

${minang.i18n.t('templates')}
  basic               - ${minang.i18n.t('templateBasic')}
  gotong-royong       - ${minang.i18n.t('templateGotongRoyong')}
  musyawarah          - ${minang.i18n.t('templateMusyawarah')}
  alam-takambang      - ${minang.i18n.t('templateAlamTakambang')}

Package Manager:
  minang paket init           - Initialize new package
  minang paket pasang <pkg>   - Install package
  minang paket cari <query>   - Search packages
  minang paket daftar         - List installed packages

${minang.i18n.t('examples')}
  minang new nagari-digital
  minang paket pasang minang-ui
  minang template gotong-royong team.minang
  minang run team.minang
  minang repl
  minang lang en

${minang.i18n.t('philosophy')}
  ${minang.i18n.t('philosophyQuote')}
  ${minang.i18n.t('philosophyDesc')}

📦 Installation: npm install -g minangscript
🏔️ Repository: https://github.com/DityaPerdana/minangScript
                `);
                break;

            default:
                console.error(minang.i18n.t('unknownCommand', command));
                console.log(minang.i18n.t('useHelp'));
                console.log(minang.i18n.t('useHelpShort'));
                process.exit(1);
        }
    }

    // Execute CLI with error handling
    runCLI().catch(error => {
        console.error('❌ CLI Error:', error.message);
        process.exit(1);
    });
}
