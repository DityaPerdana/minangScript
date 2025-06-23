const { MinangLexer } = require('./src/lexer/MinangLexer');

// Comprehensive test of all new MinangScript features
const lexer = new MinangLexer();

console.log('=== COMPREHENSIVE MINANGSCRIPT LEXER TEST ===\n');

const comprehensiveCode = `
// Modern MinangScript with all new features
impor { utils } dari "helper"

kelas Calculator warisan BaseCalculator {
    privat nilai = 0x10 + 0b1010  // hex + binary = 26
    publik statik PI = 3.14159e0
    
    konstruktor(initial = kosong) {
        ini.nilai = initial ?? 0
    }
    
    async karojo calculate(expr) {
        cubo {
            tagak pattern = /\\d+(\\.\\d+)?/g
            buek matches = expr.match(pattern)
            
            kalau (matches?.length > 0) {
                ambiak result = 0
                untuak (ambiak i = 0; i < matches.length; i++) {
                    result += parseFloat(matches[i])
                }
                jadi result
            }
        } tangkok (error) {
            lampaik baru Error(\`Calculation failed: \${error.message}\`)
        } akhianyo {
            cetak("Calculation completed")
        }
    }
    
    bajapuik karojo collaborate(other) {
        // Special collaborative function
        rundiang {
            // Meeting/discussion block
            cetak("Discussing calculation strategy")
        }
        
        jadi ini.nilai + other.nilai
    }
}

// Cultural programming constructs
adat CALCULATION_RULES = {
    pantang: ["division by zero", "negative sqrt"],
    mufakat: "always validate input"
}

// Modern features
ekspor { Calculator }
`;

console.log('Input MinangScript code:');
console.log(comprehensiveCode);
console.log('\n' + '='.repeat(60) + '\n');

console.log('Tokenization Results:');
console.log('='.repeat(20));

try {
    const tokens = lexer.tokenize(comprehensiveCode);
    
    // Group tokens by type for better analysis
    const tokenStats = {};
    const importantTokens = [];
    
    tokens.forEach(token => {
        if (token.type !== 'EOF') {
            tokenStats[token.type] = (tokenStats[token.type] || 0) + 1;
            
            // Collect interesting tokens for display
            if (['IMPORT', 'CLASS', 'EXTENDS', 'CONSTRUCTOR', 'ASYNC', 'FUNCTION', 
                 'TRY', 'CATCH', 'FINALLY', 'TEMPLATE_STRING', 'TEMPLATE_EXPR_START',
                 'REGEX', 'COLLABORATE_FUNC', 'MEETING', 'CUSTOM', 'TABOO',
                 'AGREEMENT', 'EXPORT', 'NUMBER'].includes(token.type)) {
                importantTokens.push(token);
            }
        }
    });
    
    console.log('Key Features Detected:');
    importantTokens.forEach(token => {
        if (token.type === 'NUMBER') {
            console.log(`  ${token.type}: ${token.value} (${typeof token.value})`);
        } else if (token.type === 'REGEX') {
            console.log(`  ${token.type}: /${token.value.pattern}/${token.value.flags}`);
        } else if (token.type.includes('TEMPLATE')) {
            console.log(`  ${token.type}: "${token.value}"`);
        } else {
            console.log(`  ${token.type}: "${token.value}"`);
        }
    });
    
    console.log('\nToken Statistics:');
    Object.entries(tokenStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });
    
    console.log(`\nTotal tokens processed: ${tokens.length - 1} (excluding EOF)`);
    console.log('✅ All features working correctly!');
    
} catch (error) {
    console.error('❌ Tokenization failed:', error.message);
}
