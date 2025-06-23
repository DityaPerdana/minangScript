const { MinangLexer } = require('./src/lexer/MinangLexer');

// Test enhanced number features
const lexer = new MinangLexer();

console.log('Testing enhanced number handling:\n');

// Test different number formats
const numberTests = [
    '42',           // integer
    '3.14',         // decimal
    '0xff',         // hexadecimal
    '0b1010',       // binary
    '0o777',        // octal
    '1.23e-4',      // scientific notation
    '5E+10'         // scientific notation with plus
];

numberTests.forEach(test => {
    console.log(`Input: ${test}`);
    const tokens = lexer.tokenize(test);
    const numberToken = tokens.find(t => t.type === 'NUMBER');
    if (numberToken) {
        console.log(`  Result: ${numberToken.value} (type: ${typeof numberToken.value})\n`);
    }
});

// Test complex expression with various number types
const complexTest = 'buek a = 0xff + 0b1010 - 3.14e-2';
console.log(`Complex test: ${complexTest}`);
const complexTokens = lexer.tokenize(complexTest);
complexTokens.slice(0, -1).forEach(token => {
    if (['VAR', 'IDENTIFIER', 'ASSIGN', 'NUMBER', 'PLUS', 'MINUS'].includes(token.type)) {
        console.log(`  ${token.type}: ${token.value}`);
    }
});
