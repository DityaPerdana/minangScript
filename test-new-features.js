const { MinangLexer } = require('./src/lexer/MinangLexer');

// Test new features
const lexer = new MinangLexer();

console.log('Testing new MinangScript lexer features:\n');

// Test 1: Extended operators
console.log('1. Extended Operators:');
const operatorTest = 'a += 5; b++; c **= 2; d?.prop; e ?? null; f => g';
const operatorTokens = lexer.tokenize(operatorTest);
console.log('Input:', operatorTest);
operatorTokens.slice(0, -1).forEach(token => {
    if (['IDENTIFIER', 'PLUS_ASSIGN', 'NUMBER', 'SEMICOLON', 'INCREMENT', 'POWER', 'ASSIGN', 'OPTIONAL_CHAIN', 'NULLISH_COALESCING', 'NULL', 'ARROW'].includes(token.type)) {
        console.log(`  ${token.type}: "${token.value}"`);
    }
});

console.log('\n2. New Keywords:');
const keywordTest = 'cubo { } tangkok (e) { } akhianyo { } kelas MyClass warisan BaseClass';
const keywordTokens = lexer.tokenize(keywordTest);
console.log('Input:', keywordTest);
keywordTokens.slice(0, -1).forEach(token => {
    if (['TRY', 'CATCH', 'FINALLY', 'CLASS', 'EXTENDS'].includes(token.type)) {
        console.log(`  ${token.type}: "${token.value}"`);
    }
});

console.log('\n3. Template Literals:');
const templateTest = '`Hello ${name}, welcome to ${place}!`';
const templateTokens = lexer.tokenize(templateTest);
console.log('Input:', templateTest);
templateTokens.slice(0, -1).forEach(token => {
    if (token.type.includes('TEMPLATE') || token.type === 'IDENTIFIER') {
        console.log(`  ${token.type}: "${token.value}"`);
    }
});

console.log('\n4. Regular Expressions:');
const regexTest = 'pattern = /[a-z]+/gi';
const regexTokens = lexer.tokenize(regexTest);
console.log('Input:', regexTest);
regexTokens.slice(0, -1).forEach(token => {
    if (['IDENTIFIER', 'ASSIGN', 'REGEX'].includes(token.type)) {
        console.log(`  ${token.type}:`, token.value);
    }
});

console.log('\n5. Cultural Keywords:');
const culturalTest = 'bajapuik myFunc() { salingBantu(data); rundiang { cetak("meeting"); } }';
const culturalTokens = lexer.tokenize(culturalTest);
console.log('Input:', culturalTest);
culturalTokens.slice(0, -1).forEach(token => {
    if (['COLLABORATE_FUNC', 'MUTUAL_AID', 'MEETING', 'PRINT'].includes(token.type)) {
        console.log(`  ${token.type}: "${token.value}"`);
    }
});

console.log('\nAll tests completed!');
