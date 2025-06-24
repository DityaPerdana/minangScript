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
            
            // Control flow
            'cubo': 'TRY',           // try (cubo means "attempt")
            'tangkok': 'CATCH',      // catch (tangkok means "catch/handle")
            'akhianyo': 'FINALLY',   // finally (akhianyo means "in the end")
            'lampaik': 'THROW',      // throw (lampaik means "throw")
            'piliah': 'SWITCH',      // switch (piliah means "choose")
            'kasus': 'CASE',         // case
            'default': 'DEFAULT',    // default case
            
            // Object-oriented
            'kelas': 'CLASS',        // class
            'warisan': 'EXTENDS',    // extends (warisan means "inheritance")
            'konstruktor': 'CONSTRUCTOR',
            'ini': 'THIS',           // this (ini means "this")
            'statik': 'STATIC',      // static
            'privat': 'PRIVATE',     // private
            'publik': 'PUBLIC',      // public
            'dilindungi': 'PROTECTED', // protected
            
            // Modern features
            'impor': 'IMPORT',       // import
            'ekspor': 'EXPORT',      // export
            'async': 'ASYNC',        // async
            'tunggu': 'AWAIT',       // await (tunggu means "wait")
            'yield': 'YIELD',        // yield
            'generator': 'GENERATOR',
            
            // Data types
            'array': 'ARRAY',        // array type hint
            'objek': 'OBJECT',       // object type hint
            'string': 'STRING_TYPE', // string type hint
            'angka': 'NUMBER_TYPE',  // number type hint
            'boolean': 'BOOLEAN_TYPE',
            
            // Data structures
            'kumpulan': 'ARRAY_LITERAL',  // array literal (kumpulan means "collection")
            'benda': 'OBJECT_LITERAL',    // object literal (benda means "object/thing")
            
            // Web Development Keywords
            'dokumen': 'DOCUMENT',   // document
            'elemen': 'ELEMENT',     // element
            'cari': 'SELECTOR',      // querySelector (cari means "search/find")
            'pilihSemua': 'SELECT_ALL', // querySelectorAll
            'buat': 'CREATE',        // createElement
            'tambah': 'APPEND',      // appendChild
            'hapus': 'REMOVE',       // remove
            'ganti': 'REPLACE',      // replace
            'dengar': 'LISTEN',      // addEventListener
            'kirim': 'FETCH',        // fetch API
            'muat': 'LOAD',          // onload
            'klik': 'CLICK',         // click event
            'ubah': 'CHANGE',        // change event
            'style': 'STYLE',        // style property
            'kelas': 'CLASS_NAME',   // className
            'id': 'ID',              // id property
            'konten': 'CONTENT',     // innerHTML/textContent
            'nilai': 'VALUE',        // value property
            
            // HTTP/API Keywords
            'get': 'HTTP_GET',       // HTTP GET
            'post': 'HTTP_POST',     // HTTP POST
            'put': 'HTTP_PUT',       // HTTP PUT
            'delete': 'HTTP_DELETE', // HTTP DELETE
            'json': 'JSON',          // JSON operations
            'form': 'FORM',          // form handling
            'input': 'INPUT',        // input elements
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
            '!': 'NOT',
            '++': 'INCREMENT',
            '--': 'DECREMENT',
            '+=': 'PLUS_ASSIGN',
            '-=': 'MINUS_ASSIGN',
            '*=': 'MULTIPLY_ASSIGN',
            '/=': 'DIVIDE_ASSIGN',
            '**': 'POWER',
            '?.': 'OPTIONAL_CHAIN',
            '??': 'NULLISH_COALESCING',
            '=>': 'ARROW'
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
            '.': 'DOT',
            ':': 'COLON',
            '?': 'QUESTION',
            '@': 'AT',
            '#': 'HASH',
            '`': 'BACKTICK'
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

            // Handle template literals (backticks)
            if (char === '`') {
                let value = '';
                current++; // Skip opening backtick
                column++;
                
                while (current < input.length && input[current] !== '`') {
                    if (input[current] === '\\') {
                        current++; // Skip escape character
                        if (current < input.length) {
                            const escaped = input[current];
                            switch (escaped) {
                                case 'n': value += '\n'; break;
                                case 't': value += '\t'; break;
                                case 'r': value += '\r'; break;
                                case '\\': value += '\\'; break;
                                case '`': value += '`'; break;
                                default: value += escaped; break;
                            }
                        }
                    } else if (input[current] === '$' && input[current + 1] === '{') {
                        // Handle template expression
                        if (value) {
                            tokens.push({
                                type: 'TEMPLATE_STRING',
                                value: value,
                                line: line,
                                column: column - value.length
                            });
                        }
                        
                        current += 2; // Skip ${
                        column += 2;
                        
                        tokens.push({
                            type: 'TEMPLATE_EXPR_START',
                            value: '${',
                            line: line,
                            column: column - 2
                        });
                        
                        let braceCount = 1;
                        let exprValue = '';
                        
                        while (current < input.length && braceCount > 0) {
                            if (input[current] === '{') braceCount++;
                            if (input[current] === '}') braceCount--;
                            
                            if (braceCount > 0) {
                                exprValue += input[current];
                            }
                            current++;
                            column++;
                        }
                        
                        // Recursively tokenize the expression
                        if (exprValue.trim()) {
                            const exprLexer = new MinangLexer();
                            const exprTokens = exprLexer.tokenize(exprValue);
                            tokens.push(...exprTokens.slice(0, -1)); // Remove EOF
                        }
                        
                        tokens.push({
                            type: 'TEMPLATE_EXPR_END',
                            value: '}',
                            line: line,
                            column: column - 1
                        });
                        
                        value = '';
                        continue;
                    } else {
                        value += input[current];
                    }
                    
                    if (input[current] === '\n') {
                        line++;
                        column = 1;
                    } else {
                        column++;
                    }
                    current++;
                }
                
                if (current < input.length) {
                    current++; // Skip closing backtick
                    column++;
                }
                
                // Push final template string part
                tokens.push({
                    type: 'TEMPLATE_STRING',
                    value: value,
                    line: line,
                    column: column - value.length - 1
                });
                continue;
            }

            // Handle hexadecimal numbers
            if (char === '0' && current + 1 < input.length && 
                (input[current + 1] === 'x' || input[current + 1] === 'X')) {
                let value = '0x';
                current += 2; // Skip 0x
                column += 2;
                
                while (current < input.length && /[0-9a-fA-F]/.test(input[current])) {
                    value += input[current];
                    current++;
                    column++;
                }
                
                tokens.push({
                    type: 'NUMBER',
                    value: parseInt(value, 16),
                    line: line,
                    column: column - value.length
                });
                continue;
            }

            // Handle binary numbers
            if (char === '0' && current + 1 < input.length && 
                (input[current + 1] === 'b' || input[current + 1] === 'B')) {
                let value = '';
                current += 2; // Skip 0b
                column += 2;
                
                while (current < input.length && /[01]/.test(input[current])) {
                    value += input[current];
                    current++;
                    column++;
                }
                
                tokens.push({
                    type: 'NUMBER',
                    value: parseInt(value, 2),
                    line: line,
                    column: column - value.length - 2
                });
                continue;
            }

            // Handle octal numbers
            if (char === '0' && current + 1 < input.length && 
                (input[current + 1] === 'o' || input[current + 1] === 'O')) {
                let value = '';
                current += 2; // Skip 0o
                column += 2;
                
                while (current < input.length && /[0-7]/.test(input[current])) {
                    value += input[current];
                    current++;
                    column++;
                }
                
                tokens.push({
                    type: 'NUMBER',
                    value: parseInt(value, 8),
                    line: line,
                    column: column - value.length - 2
                });
                continue;
            }

            // Handle scientific notation
            if (this.isDigit(char)) {
                let value = '';
                let hasDecimal = false;
                let hasExponent = false;

                while (current < input.length && 
                       (this.isDigit(input[current]) || 
                        (input[current] === '.' && !hasDecimal && !hasExponent) ||
                        ((input[current] === 'e' || input[current] === 'E') && !hasExponent))) {
                    
                    if (input[current] === '.') {
                        hasDecimal = true;
                    } else if (input[current] === 'e' || input[current] === 'E') {
                        hasExponent = true;
                        value += input[current];
                        current++;
                        column++;
                        
                        // Handle optional + or - after e/E
                        if (current < input.length && 
                            (input[current] === '+' || input[current] === '-')) {
                            value += input[current];
                            current++;
                            column++;
                        }
                        continue;
                    }
                    
                    value += input[current];
                    current++;
                    column++;
                }

                tokens.push({
                    type: 'NUMBER',
                    value: parseFloat(value),
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

            // Handle regex literals (before single-character operators)
            if (char === '/' && this.canBeRegex(tokens)) {
                let value = '';
                current++; // Skip opening /
                column++;
                
                while (current < input.length && input[current] !== '/') {
                    if (input[current] === '\\') {
                        value += input[current]; // Keep escape character
                        current++;
                        column++;
                        if (current < input.length) {
                            value += input[current];
                        }
                    } else {
                        value += input[current];
                    }
                    current++;
                    column++;
                }
                
                if (current < input.length) {
                    current++; // Skip closing /
                    column++;
                }
                
                // Handle regex flags
                let flags = '';
                while (current < input.length && /[gimuy]/.test(input[current])) {
                    flags += input[current];
                    current++;
                    column++;
                }
                
                tokens.push({
                    type: 'REGEX',
                    value: { pattern: value, flags: flags },
                    line: line,
                    column: column - value.length - flags.length - 2
                });
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

    canBeRegex(tokens) {
        if (tokens.length === 0) return true;
        const lastToken = tokens[tokens.length - 1];
        const regexContext = ['ASSIGN', 'LPAREN', 'COMMA', 'LBRACKET', 'RETURN', 'COLON', 'EQUAL', 'NOT_EQUAL'];
        return regexContext.includes(lastToken.type);
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
