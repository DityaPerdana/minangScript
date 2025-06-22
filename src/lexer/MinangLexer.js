class MinangLexer {
    constructor() {
        // MinangScript keywords inspired by Minangkabau language and philosophy
        this.keywords = {
            // Basic keywords
            'buek': 'VAR',           // create variable (buek umur = 25)
            'ambiak': 'LET',         // let variable declaration 
            'tagak': 'CONST',        // const variable declaration
            'karojo': 'FUNCTION',    // function definition (karojo means "work/function")
            'jadi': 'RETURN',        // return statement (jadi means "become/result")
            'kalau': 'IF',           // if statement (kalau means "if")
            'lain': 'ELSE',          // else statement
            'kalauLain': 'ELSEIF',   // else if
            'selamo': 'WHILE',       // while loop (selamo means "continuously/always")
            'untuak': 'FOR',         // for loop (untuak means "for")
            'baronti': 'BREAK',      // break statement (baronti means "stop")
            'lanjuik': 'CONTINUE',   // continue statement
            'cetak': 'PRINT',        // print/console representation (cetak means "print")
            
            // Values
            'bana': 'TRUE',          // true (bana means "true/real")
            'salah': 'FALSE',        // false (salah means "wrong/false")
            'kosong': 'NULL',        // null/empty (kosong means "empty")
            
            // Cultural/Philosophical keywords
            'gotongRoyong': 'COLLABORATE',  // collaborative function
            'musyawarah': 'DISCUSS',        // consensus building
            'alamTakambang': 'LEARN',       // learning from nature
            'adatBasandi': 'ETHICAL'        // ethical practices
        };

        this.operators = {
            '+': 'PLUS',
            '-': 'MINUS',
            '*': 'MULTIPLY',
            '/': 'DIVIDE',
            '%': 'MODULO',
            '=': 'ASSIGN',
            '==': 'EQUAL',
            '!=': 'NOT_EQUAL',
            '<': 'LESS_THAN',
            '>': 'GREATER_THAN',
            '<=': 'LESS_EQUAL',
            '>=': 'GREATER_EQUAL',
            '&&': 'AND',
            '||': 'OR',
            '!': 'NOT'
        };

        this.delimiters = {
            '(': 'LPAREN',
            ')': 'RPAREN',
            '{': 'LBRACE',
            '}': 'RBRACE',
            '[': 'LBRACKET',
            ']': 'RBRACKET',
            ',': 'COMMA',
            ';': 'SEMICOLON',
            '.': 'DOT'
        };
    }

    tokenize(input) {
        const tokens = [];
        let current = 0;
        let line = 1;
        let column = 1;

        while (current < input.length) {
            let char = input[current];

            // Skip whitespace except newlines
            if (char === ' ' || char === '\t' || char === '\r') {
                current++;
                column++;
                continue;
            }

            // Handle newlines
            if (char === '\n') {
                tokens.push({
                    type: 'NEWLINE',
                    value: '\n',
                    line: line,
                    column: column
                });
                current++;
                line++;
                column = 1;
                continue;
            }

            // Skip comments (// style)
            if (char === '/' && input[current + 1] === '/') {
                while (current < input.length && input[current] !== '\n') {
                    current++;
                }
                continue;
            }

            // Skip block comments (/* */ style)
            if (char === '/' && input[current + 1] === '*') {
                current += 2;
                while (current < input.length - 1) {
                    if (input[current] === '*' && input[current + 1] === '/') {
                        current += 2;
                        break;
                    }
                    if (input[current] === '\n') {
                        line++;
                        column = 1;
                    }
                    current++;
                }
                continue;
            }

            // Handle string literals
            if (char === '"' || char === "'") {
                const quote = char;
                let value = '';
                current++; // Skip opening quote
                column++;

                while (current < input.length && input[current] !== quote) {
                    if (input[current] === '\\') {
                        current++; // Skip escape character
                        if (current < input.length) {
                            const escaped = input[current];
                            switch (escaped) {
                                case 'n': value += '\n'; break;
                                case 't': value += '\t'; break;
                                case 'r': value += '\r'; break;
                                case '\\': value += '\\'; break;
                                case '"': value += '"'; break;
                                case "'": value += "'"; break;
                                default: value += escaped; break;
                            }
                        }
                    } else {
                        value += input[current];
                    }
                    current++;
                    column++;
                }

                if (current < input.length) {
                    current++; // Skip closing quote
                    column++;
                }

                tokens.push({
                    type: 'STRING',
                    value: value,
                    line: line,
                    column: column - value.length - 2
                });
                continue;
            }

            // Handle numbers
            if (this.isDigit(char)) {
                let value = '';
                let hasDecimal = false;

                while (current < input.length && (this.isDigit(input[current]) || 
                       (input[current] === '.' && !hasDecimal))) {
                    if (input[current] === '.') {
                        hasDecimal = true;
                    }
                    value += input[current];
                    current++;
                    column++;
                }

                tokens.push({
                    type: 'NUMBER',
                    value: hasDecimal ? parseFloat(value) : parseInt(value),
                    line: line,
                    column: column - value.length
                });
                continue;
            }

            // Handle operators (check two-character operators first)
            const twoChar = input.substr(current, 2);
            if (this.operators[twoChar]) {
                tokens.push({
                    type: this.operators[twoChar],
                    value: twoChar,
                    line: line,
                    column: column
                });
                current += 2;
                column += 2;
                continue;
            }

            // Handle single-character operators and delimiters
            if (this.operators[char]) {
                tokens.push({
                    type: this.operators[char],
                    value: char,
                    line: line,
                    column: column
                });
                current++;
                column++;
                continue;
            }

            if (this.delimiters[char]) {
                tokens.push({
                    type: this.delimiters[char],
                    value: char,
                    line: line,
                    column: column
                });
                current++;
                column++;
                continue;
            }

            // Handle identifiers and keywords
            if (this.isLetter(char) || char === '_') {
                let value = '';
                const startColumn = column;

                while (current < input.length && 
                       (this.isLetter(input[current]) || 
                        this.isDigit(input[current]) || 
                        input[current] === '_')) {
                    value += input[current];
                    current++;
                    column++;
                }

                const tokenType = this.keywords[value] || 'IDENTIFIER';
                tokens.push({
                    type: tokenType,
                    value: value,
                    line: line,
                    column: startColumn
                });
                continue;
            }

            // Unknown character
            throw new Error(`Karakter tidak dikenal '${char}' pada baris ${line}, kolom ${column}`);
        }

        // Add EOF token
        tokens.push({
            type: 'EOF',
            value: null,
            line: line,
            column: column
        });

        return tokens;
    }

    isDigit(char) {
        return /[0-9]/.test(char);
    }

    isLetter(char) {
        return /[a-zA-Z]/.test(char);
    }

    // Utility method to print tokens (for debugging)
    printTokens(tokens) {
        console.log('MinangScript Tokens:');
        tokens.forEach((token, index) => {
            console.log(`${index}: ${token.type} - "${token.value}" (${token.line}:${token.column})`);
        });
    }
}

module.exports = { MinangLexer };
