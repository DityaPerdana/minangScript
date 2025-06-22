const { MinangLexer } = require('../src/lexer/MinangLexer');
const { MinangParser } = require('../src/parser/MinangParser');
const { MinangCompiler } = require('../src/compiler/MinangCompiler');
const { MinangRuntime } = require('../src/runtime/MinangRuntime');

// Simple test framework
class MinangTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFn) {
        this.tests.push({ name, testFn });
    }

    async run() {
        console.log('🧪 Menjalankan tes MinangScript...\n');

        for (const { name, testFn } of this.tests) {
            try {
                await testFn();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}: ${error.message}`);
                this.failed++;
            }
        }

        console.log(`\n📊 Hasil Tes:`);
        console.log(`✅ Berhasil: ${this.passed}`);
        console.log(`❌ Gagal: ${this.failed}`);
        console.log(`📈 Total: ${this.tests.length}`);
        
        if (this.failed === 0) {
            console.log('\n🎉 Semua tes berhasil! MinangScript siap digunakan!');
        }
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion gagal');
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Diharapkan ${expected}, mendapat ${actual}`);
        }
    }
}

// Inisialisasi test runner
const testRunner = new MinangTest();

// Test Lexer
testRunner.test('Lexer - Tokenisasi kata kunci dasar', () => {
    const lexer = new MinangLexer();
    const tokens = lexer.tokenize('buek nama = "MinangScript"');
    
    testRunner.assert(tokens.length >= 4, 'Harus ada minimal 4 token');
    testRunner.assertEqual(tokens[0].type, 'VAR', 'Token pertama harus VAR');
    testRunner.assertEqual(tokens[1].type, 'IDENTIFIER', 'Token kedua harus IDENTIFIER');
    testRunner.assertEqual(tokens[2].type, 'ASSIGN', 'Token ketiga harus ASSIGN');
    testRunner.assertEqual(tokens[3].type, 'STRING', 'Token keempat harus STRING');
});

testRunner.test('Lexer - Tokenisasi angka', () => {
    const lexer = new MinangLexer();
    const tokens = lexer.tokenize('ambiak umur = 25');
    
    testRunner.assertEqual(tokens[3].type, 'NUMBER', 'Harus mengenali angka');
    testRunner.assertEqual(tokens[3].value, 25, 'Nilai angka harus benar');
});

testRunner.test('Lexer - Kata kunci budaya Minang', () => {
    const lexer = new MinangLexer();
    const tokens = lexer.tokenize('gotongRoyong musyawarah alamTakambang');
    
    testRunner.assertEqual(tokens[0].type, 'COLLABORATE', 'Harus mengenali gotongRoyong');
    testRunner.assertEqual(tokens[1].type, 'DISCUSS', 'Harus mengenali musyawarah');
    testRunner.assertEqual(tokens[2].type, 'LEARN', 'Harus mengenali alamTakambang');
});

// Test Parser
testRunner.test('Parser - Deklarasi variabel', () => {
    const parser = new MinangParser();
    const ast = parser.parse('buek nama = "Test"');
    
    testRunner.assertEqual(ast.type, 'Program', 'Root harus Program');
    testRunner.assertEqual(ast.body[0].type, 'VariableDeclaration', 'Harus ada deklarasi variabel');
    testRunner.assertEqual(ast.body[0].identifier, 'nama', 'Nama variabel harus benar');
});

testRunner.test('Parser - Deklarasi fungsi', () => {
    const parser = new MinangParser();
    const ast = parser.parse(`
        karojo tambah(a, b) {
            jadi a + b
        }
    `);
    
    const funcDecl = ast.body[0];
    testRunner.assertEqual(funcDecl.type, 'FunctionDeclaration', 'Harus ada deklarasi fungsi');
    testRunner.assertEqual(funcDecl.name, 'tambah', 'Nama fungsi harus benar');
    testRunner.assertEqual(funcDecl.params.length, 2, 'Harus ada 2 parameter');
});

testRunner.test('Parser - Statement if', () => {
    const parser = new MinangParser();
    const ast = parser.parse(`
        kalau umur >= 17 {
            cetak "Dewasa"
        }
    `);
    
    const ifStmt = ast.body[0];
    testRunner.assertEqual(ifStmt.type, 'IfStatement', 'Harus ada if statement');
    testRunner.assert(ifStmt.condition, 'Harus ada kondisi');
    testRunner.assert(ifStmt.consequent, 'Harus ada konsekuen');
});

// Test Compiler
testRunner.test('Compiler - Kompilasi sederhana', () => {
    const compiler = new MinangCompiler();
    const ast = compiler.compile('buek nama = "Test"');
    
    testRunner.assertEqual(ast.type, 'Program', 'Hasil kompilasi harus AST Program');
});

testRunner.test('Compiler - Transpilasi ke JavaScript', () => {
    const compiler = new MinangCompiler();
    const jsCode = compiler.transpile('buek nama = "MinangScript"');
    
    testRunner.assert(jsCode.includes('var nama'), 'Harus menghasilkan deklarasi var');
    testRunner.assert(jsCode.includes('"MinangScript"'), 'Harus mempertahankan string literal');
});

testRunner.test('Compiler - Transpilasi fungsi', () => {
    const compiler = new MinangCompiler();
    const jsCode = compiler.transpile(`
        karojo sambutan(nama) {
            jadi "Halo " + nama
        }
    `);
    
    testRunner.assert(jsCode.includes('function sambutan'), 'Harus menghasilkan function declaration');
    testRunner.assert(jsCode.includes('return'), 'Harus menghasilkan return statement');
});

// Test Runtime
testRunner.test('Runtime - Eksekusi variabel', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const ast = compiler.compile('buek nama = "MinangScript"');
    runtime.execute(ast);
    
    testRunner.assertEqual(runtime.environment.get('nama'), 'MinangScript', 'Variabel harus tersimpan');
});

testRunner.test('Runtime - Eksekusi fungsi built-in', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    // Mock console.log untuk testing
    const originalLog = console.log;
    let output = '';
    console.log = (...args) => { output += args.join(' ') + '\n'; };
    
    try {
        const ast = compiler.compile('cetak "Hello MinangScript"');
        runtime.execute(ast);
        
        testRunner.assert(output.includes('Hello MinangScript'), 'Output harus benar');
    } finally {
        console.log = originalLog;
    }
});

testRunner.test('Runtime - Eksekusi fungsi user-defined', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const code = `
        karojo tambah(a, b) {
            jadi a + b
        }
        ambiak hasil = tambah(5, 3)
    `;
    
    const ast = compiler.compile(code);
    runtime.execute(ast);
    
    testRunner.assertEqual(runtime.environment.get('hasil'), 8, 'Hasil fungsi harus benar');
});

testRunner.test('Runtime - Operasi matematika', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const code = `
        ambiak a = 10
        ambiak b = 5
        ambiak tambah = a + b
        ambiak kurang = a - b
        ambiak kali = a * b
        ambiak bagi = a / b
    `;
    
    const ast = compiler.compile(code);
    runtime.execute(ast);
    
    testRunner.assertEqual(runtime.environment.get('tambah'), 15, 'Operasi tambah harus benar');
    testRunner.assertEqual(runtime.environment.get('kurang'), 5, 'Operasi kurang harus benar');
    testRunner.assertEqual(runtime.environment.get('kali'), 50, 'Operasi kali harus benar');
    testRunner.assertEqual(runtime.environment.get('bagi'), 2, 'Operasi bagi harus benar');
});

testRunner.test('Runtime - Conditional statement', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const code = `
        ambiak umur = 20
        ambiak status = kosong
        
        kalau umur >= 18 {
            status = "dewasa"
        } lain {
            status = "anak"
        }
    `;
    
    const ast = compiler.compile(code);
    runtime.execute(ast);
    
    testRunner.assertEqual(runtime.environment.get('status'), 'dewasa', 'Kondisi harus benar');
});

testRunner.test('Runtime - Fungsi budaya gotongRoyong', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    // Mock console.log untuk testing
    const originalLog = console.log;
    let output = '';
    console.log = (...args) => { output += args.join(' ') + '\n'; };
    
    try {
        const ast = compiler.compile('gotongRoyong("kerja", "bersama")');
        runtime.execute(ast);
        
        testRunner.assert(output.includes('Gotong Royong'), 'Harus ada output gotong royong');
    } finally {
        console.log = originalLog;
    }
});

testRunner.test('Runtime - Cetak methods enhanced', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    // Mock console methods untuk testing
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;
    
    let outputs = { log: '', error: '', warn: '', info: '' };
    console.log = (...args) => { outputs.log += args.join(' ') + ' '; };
    console.error = (...args) => { outputs.error += args.join(' ') + ' '; };
    console.warn = (...args) => { outputs.warn += args.join(' ') + ' '; };
    console.info = (...args) => { outputs.info += args.join(' ') + ' '; };
    
    try {
        // Test basic cetak
        const ast1 = compiler.compile('cetak "normal"');
        runtime.execute(ast1);
        
        // Test cetak.rusak
        const ast2 = compiler.compile('cetak.rusak "error test"');
        runtime.execute(ast2);
        
        testRunner.assert(outputs.log.includes('normal'), 'Normal cetak harus bekerja');
        testRunner.assert(outputs.error.includes('error test'), 'cetak.rusak harus bekerja');
        
    } finally {
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        console.info = originalInfo;
    }
});

// Test data type constructors
testRunner.test('Runtime - Data type constructors', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const code = `
        buek angkaDariString = angko("123.45")
        buek kataDariAngka = kato(456)
        buek kebenaranDariAngka = kabanaran(1)
        buek kebenaranDariNol = kabanaran(0)
    `;
    
    const ast = compiler.compile(code);
    runtime.execute(ast);
    
    testRunner.assertEqual(runtime.environment.get('angkaDariString'), 123.45, 'angko() harus mengkonversi string ke number');
    testRunner.assertEqual(runtime.environment.get('kataDariAngka'), '456', 'kato() harus mengkonversi number ke string');
    testRunner.assertEqual(runtime.environment.get('kebenaranDariAngka'), true, 'kabanaran(1) harus menghasilkan true');
    testRunner.assertEqual(runtime.environment.get('kebenaranDariNol'), false, 'kabanaran(0) harus menghasilkan false');
});

// Test console methods baru
testRunner.test('Runtime - Console methods baru', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    // Mock console methods untuk testing
    const originalWarn = console.warn;
    const originalTable = console.table;
    
    let outputs = { warn: '', table: false };
    console.warn = (...args) => { outputs.warn += args.join(' ') + ' '; };
    console.table = (...args) => { outputs.table = true; };
    
    try {
        // Test cetak.peringatan
        const ast1 = compiler.compile('cetak.peringatan "test warning"');
        runtime.execute(ast1);
        
        testRunner.assert(outputs.warn.includes('test warning'), 'cetak.peringatan harus bekerja');
        
    } finally {
        console.warn = originalWarn;
        console.table = originalTable;
    }
});

// Test integrasi lengkap
testRunner.test('Integrasi - Program hello world', () => {
    const compiler = new MinangCompiler();
    const runtime = new MinangRuntime();
    
    const code = `
        ambiak nama = "MinangScript"
        
        karojo sambutan(nama) {
            jadi "Salamat datang ka " + nama
        }
        
        ambiak pesan = sambutan(nama)
        cetak pesan
    `;
    
    // Mock console.log untuk testing
    const originalLog = console.log;
    let output = '';
    console.log = (...args) => { output += args.join(' ') + '\n'; };
    
    try {
        const ast = compiler.compile(code);
        runtime.execute(ast);
        
        testRunner.assert(output.includes('Salamat datang ka MinangScript'), 'Program harus berjalan lengkap');
    } finally {
        console.log = originalLog;
    }
});

// Jalankan semua tes
if (require.main === module) {
    testRunner.run().catch(console.error);
}

module.exports = { MinangTest, testRunner };
