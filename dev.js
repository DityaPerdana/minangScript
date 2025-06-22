#!/usr/bin/env node

// Development tools for MinangScript

const fs = require('fs');
const path = require('path');
const { MinangLexer } = require('./src/lexer/MinangLexer');
const { MinangParser } = require('./src/parser/MinangParser');
const { MinangCompiler } = require('./src/compiler/MinangCompiler');
const { MinangUtils } = require('./src/utils/MinangUtils');

class MinangDev {
    constructor() {
        this.lexer = new MinangLexer();
        this.parser = new MinangParser();
        this.compiler = new MinangCompiler();
    }

    // Interactive REPL for MinangScript
    repl() {
        console.log('🏔️ MinangScript REPL');
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
                console.log('Salamat tinggal! (Goodbye!)');
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
                const ast = this.compiler.compile(trimmed);
                const jsCode = this.compiler.generateJavaScript(ast);
                console.log('→', eval(jsCode));
            } catch (error) {
                console.error('❌', error.message);
            }

            rl.prompt();
        });

        rl.on('close', () => {
            process.exit(0);
        });
    }

    showReplHelp() {
        console.log(`
📖 MinangScript REPL Help:

Commands:
  .help      - Show this help
  .exit      - Exit REPL
  .examples  - Show code examples
  .analyze <code> - Analyze code structure

MinangScript Examples:
  buek nama = "Minang"
  cetak "Hello " + nama
  
  karojo tambah(a, b) {
      jadi a + b
  }
  
  kalau 5 > 3 {
      cetak "Lima lebih besar"
  }

Cultural Functions:
  gotongRoyong("kerja", "bersama")
  musyawarah("topik", "peserta")
  alamTakambang("pelajaran")
        `);
    }

    showExamples() {
        console.log(`
🌟 MinangScript Examples:

Basic Variables:
  buek nama = "Siti"
  ambiak umur = 25

Functions:
  karojo salam(nama) {
      jadi "Salamat datang " + nama
  }

Conditionals:
  kalau umur >= 17 {
      cetak "Dewasa"
  } lain {
      cetak "Muda"
  }

Cultural Programming:
  gotongRoyong("membangun", "bersama")
  musyawarah("rencana", "warga")
        `);
    }

    analyzeCode(code) {
        try {
            console.log('\n🔍 Code Analysis:');
            
            // Tokenize
            const tokens = this.lexer.tokenize(code);
            console.log(`📝 Tokens: ${tokens.length - 1} (excluding EOF)`);
            
            // Parse
            const ast = this.parser.parse(code);
            console.log(`🌳 AST Nodes: ${this.countASTNodes(ast)}`);
            
            // Cultural analysis
            const cultural = MinangUtils.validateCulturalPrinciples(ast);
            if (cultural.length > 0) {
                console.log('🏔️ Cultural Suggestions:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ Cultural principles well integrated');
            }
            
            // Generate JavaScript
            const jsCode = this.compiler.generateJavaScript(ast);
            console.log('🔄 Generated JavaScript:');
            console.log(`   ${jsCode.replace(/\n/g, '\n   ')}`);
            
        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
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

    // Format MinangScript code
    format(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            return;
        }

        const code = fs.readFileSync(filePath, 'utf8');
        const formatted = MinangUtils.formatCode(code);
        
        console.log('📝 Formatted code:');
        console.log(formatted);
        
        // Option to save formatted code
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Save formatted code? (y/N): ', (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                fs.writeFileSync(filePath, formatted);
                console.log('✅ File formatted and saved');
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
            console.error(`❌ Unknown template type: ${type}`);
            console.log('Available templates:', Object.keys(templates).join(', '));
            return;
        }

        const code = templates[type];
        
        if (outputPath) {
            fs.writeFileSync(outputPath, code);
            console.log(`✅ Template created: ${outputPath}`);
        } else {
            console.log(code);
        }
    }

    // Validate MinangScript file
    validate(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            return;
        }

        console.log(`🔍 Validating: ${filePath}`);
        
        try {
            const code = fs.readFileSync(filePath, 'utf8');
            
            // Compile to check syntax
            const ast = this.compiler.compile(code);
            console.log('✅ Syntax is valid');
            
            // Cultural validation
            const cultural = MinangUtils.validateCulturalPrinciples(ast);
            if (cultural.length > 0) {
                console.log('🏔️ Cultural suggestions:');
                cultural.forEach(suggestion => {
                    console.log(`  • ${suggestion}`);
                });
            } else {
                console.log('✅ Cultural principles well integrated');
            }
            
            // Generate JavaScript to test compilation
            const jsCode = this.compiler.transpile(code);
            console.log('✅ Transpilation successful');
            
            console.log('🎉 File validation complete');
            
        } catch (error) {
            console.error('❌ Validation failed:', error.message);
        }
    }

    // Show version and info
    version() {
        const packageJson = require('./package.json');
        console.log(`
🏔️ MinangScript v${packageJson.version}
${packageJson.description}

Author: ${packageJson.author}
License: ${packageJson.license}

Cultural Principles:
  • Gotong Royong - Mutual Assistance
  • Musyawarah Mufakat - Consensus Decision Making
  • Alam Takambang Jadi Guru - Nature as Teacher
  • Adat Basandi Syarak - Ethics-Based Customs

Node.js: ${process.version}
Platform: ${process.platform} ${process.arch}
        `);
    }
}

// CLI interface
if (require.main === module) {
    const dev = new MinangDev();
    const command = process.argv[2];
    const args = process.argv.slice(3);

    switch (command) {
        case 'repl':
            dev.repl();
            break;
            
        case 'format':
            if (args[0]) {
                dev.format(args[0]);
            } else {
                console.error('Usage: node dev.js format <file.minang>');
            }
            break;
            
        case 'template':
            if (args[0]) {
                dev.template(args[0], args[1]);
            } else {
                console.error('Usage: node dev.js template <type> [output-file]');
                console.log('Types: basic, gotong-royong, musyawarah, alam-takambang');
            }
            break;
            
        case 'validate':
            if (args[0]) {
                dev.validate(args[0]);
            } else {
                console.error('Usage: node dev.js validate <file.minang>');
            }
            break;
            
        case 'version':
            dev.version();
            break;
            
        default:
            console.log(`
🛠️ MinangScript Development Tools

Usage: node dev.js <command> [options]

Commands:
  repl                    - Start interactive REPL
  format <file>          - Format MinangScript file
  template <type> [file] - Generate template code
  validate <file>        - Validate MinangScript file
  version                - Show version information

Examples:
  node dev.js repl
  node dev.js format examples/hello.minang
  node dev.js template basic myproject.minang
  node dev.js validate examples/kalkulator.minang
            `);
    }
}

module.exports = { MinangDev };
