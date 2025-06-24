#!/usr/bin/env node

const { MinangCompiler } = require('./src/compiler/MinangCompiler');
const { MinangRuntime } = require('./src/runtime/MinangRuntime');
const { MinangLexer } = require('./src/lexer/MinangLexer');
const { MinangUtils } = require('./src/utils/MinangUtils');
const { MinangI18n } = require('./src/utils/i18n');
const { MinangConfig } = require('./src/utils/config');
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
  gotongRoyong("kerja", "bersama")
  musyawarah("topik", "peserta")
  alamTakambang("pelajaran")
        `);
    }

    showExamples() {
        const lang = this.i18n.getCurrentLanguage();
        console.log(`
🌟 MinangScript Examples:

${lang === 'id' ? 'Deklarasi Variabel:' : 'Variable Declaration:'}
  buek nama = "Siti"           // var
  ambiak umur = 25             // let
  tagak PI = 3.14              // const

${lang === 'id' ? 'Fungsi:' : 'Functions:'}
  karojo salam(nama) {
      jadi "Salamat datang " + nama
  }

${lang === 'id' ? 'Kondisi:' : 'Conditionals:'}
  kalau umur >= 18 {
      cetak "${lang === 'id' ? 'Dewasa' : 'Adult'}"
  } lain {
      cetak "${lang === 'id' ? 'Muda' : 'Young'}"
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
            console.error(this.i18n.t('fileNotFound', filePath));
            process.exit(1);
        }

        console.log(`🔍 ${this.i18n.getCurrentLanguage() === 'id' ? 'Memvalidasi' : 'Validating'}: ${filePath}`);
        
        try {
            const code = fs.readFileSync(filePath, 'utf8');
            
            // Check syntax
            this.compiler.compile(code);
            console.log(this.i18n.getCurrentLanguage() === 'id' ? '✅ Sintaks valid' : '✅ Syntax valid');
            
            // Cultural validation
            const cultural = MinangUtils.validateCulturalPrinciples(code);
            if (cultural.length > 0) {
                console.log(this.i18n.getCurrentLanguage() === 'id' ? '🏔️ Saran budaya:' : '🏔️ Cultural suggestions:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log(this.i18n.getCurrentLanguage() === 'id' ? 
                    '✅ Prinsip budaya terintegrasi dengan baik' : 
                    '✅ Cultural principles well integrated');
            }
            
            // Test transpilation
            this.compiler.transpile(code);
            console.log(this.i18n.getCurrentLanguage() === 'id' ? 
                '✅ Transpilasi berhasil' : 
                '✅ Transpilation successful');
            
            console.log(this.i18n.getCurrentLanguage() === 'id' ? 
                '🎉 Validasi file selesai' : 
                '🎉 File validation complete');
            
        } catch (error) {
            console.error(this.i18n.t('validationFailed', error.message));
            process.exit(1);
        }
    }

    // Format MinangScript code
    format(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(this.i18n.t('fileNotFound', filePath));
            process.exit(1);
        }

        const code = fs.readFileSync(filePath, 'utf8');
        const formatted = MinangUtils.formatCode(code);
        
        console.log(this.i18n.getCurrentLanguage() === 'id' ? 
            '📝 Kode yang diformat:' : 
            '📝 Formatted code:');
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
  minang install minang-ui
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

${minang.i18n.t('examples')}
  minang new nagari-digital
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
