const { MinangLexer } = require('../lexer/MinangLexer');

class MinangParser {
    constructor() {
        this.lexer = new MinangLexer();
        this.tokens = [];
        this.current = 0;
    }

    parse(input) {
        this.tokens = this.lexer.tokenize(input);
        this.current = 0;
        return this.program();
    }

    // Get current token
    getCurrentToken() {
        return this.tokens[this.current] || { type: 'EOF', value: null };
    }

    // Move to next token
    advance() {
        if (this.current < this.tokens.length - 1) {
            this.current++;
        }
        return this.getCurrentToken();
    }

    // Check if current token matches expected type
    match(expectedType) {
        const token = this.getCurrentToken();
        return token.type === expectedType;
    }

    // Consume token if it matches, otherwise throw error
    consume(expectedType, errorMessage) {
        const token = this.getCurrentToken();
        if (token.type === expectedType) {
            this.advance();
            return token;
        }
        throw new Error(`${errorMessage}. Ditemukan ${token.type} pada baris ${token.line}`);
    }

    // Skip newlines
    skipNewlines() {
        while (this.match('NEWLINE')) {
            this.advance();
        }
    }

    // Parse program (top-level statements)
    program() {
        const statements = [];
        this.skipNewlines();

        while (!this.match('EOF')) {
            if (this.match('NEWLINE')) {
                this.advance();
                continue;
            }
            statements.push(this.statement());
            this.skipNewlines();
        }

        return {
            type: 'Program',
            body: statements
        };
    }

    // Parse statement
    statement() {
        if (this.match('VAR') || this.match('LET') || this.match('CONST')) {
            return this.variableDeclaration();
        }
        if (this.match('FUNCTION')) {
            return this.functionDeclaration();
        }
        if (this.match('IF')) {
            return this.ifStatement();
        }
        if (this.match('WHILE')) {
            return this.whileStatement();
        }
        if (this.match('FOR')) {
            return this.forStatement();
        }
        if (this.match('RETURN')) {
            return this.returnStatement();
        }
        if (this.match('PRINT')) {
            // Check if it's a simple print or member expression
            if (this.tokens[this.current + 1] && this.tokens[this.current + 1].type === 'DOT') {
                return this.printMemberStatement(); // Handle as print member expression
            }
            return this.printStatement();
        }
        if (this.match('LBRACE')) {
            return this.blockStatement();
        }
        
        // Expression statement
        return this.expressionStatement();
    }

    // Variable declaration: buek/ambiak/tagak nama = nilai
    variableDeclaration() {
        const declarationType = this.getCurrentToken().type; // VAR, LET, or CONST
        const keyword = this.getCurrentToken().value;
        this.advance(); // consume VAR/LET/CONST
        
        const name = this.consume('IDENTIFIER', 'Diharapkan nama variabel').value;
        
        let initializer = null;
        if (this.match('ASSIGN')) {
            this.advance();
            initializer = this.expression();
        } else if (declarationType === 'CONST') {
            throw new Error('Konstanta harus diinisialisasi dengan nilai');
        }

        return {
            type: 'VariableDeclaration',
            declarationType: declarationType,
            identifier: name,
            initializer: initializer
        };
    }

    // Function declaration: karojo nama(params) { body }
    functionDeclaration() {
        this.consume('FUNCTION', 'Diharapkan kata kunci "karojo"');
        const name = this.consume('IDENTIFIER', 'Diharapkan nama fungsi').value;
        
        this.consume('LPAREN', 'Diharapkan "(" setelah nama fungsi');
        
        const params = [];
        if (!this.match('RPAREN')) {
            do {
                const param = this.consume('IDENTIFIER', 'Diharapkan nama parameter').value;
                params.push(param);
                
                if (this.match('COMMA')) {
                    this.advance();
                } else {
                    break;
                }
            } while (!this.match('RPAREN'));
        }
        
        this.consume('RPAREN', 'Diharapkan ")" setelah parameter');
        
        const body = this.blockStatement();

        return {
            type: 'FunctionDeclaration',
            name: name,
            params: params,
            body: body
        };
    }

    // If statement: kalau (condition) { body } lain { elseBody }
    ifStatement() {
        this.consume('IF', 'Diharapkan kata kunci "kalau"');
        
        const condition = this.expression();
        const consequent = this.blockStatement();
        
        let alternate = null;
        if (this.match('ELSE')) {
            this.advance();
            if (this.match('IF')) {
                alternate = this.ifStatement(); // Handle else if
            } else {
                alternate = this.blockStatement();
            }
        }

        return {
            type: 'IfStatement',
            condition: condition,
            consequent: consequent,
            alternate: alternate
        };
    }

    // While statement: selamo (condition) { body }
    whileStatement() {
        this.consume('WHILE', 'Diharapkan kata kunci "selamo"');
        
        const condition = this.expression();
        const body = this.blockStatement();

        return {
            type: 'WhileStatement',
            condition: condition,
            body: body
        };
    }

    // For statement: untuak (init; condition; update) { body }
    forStatement() {
        this.consume('FOR', 'Diharapkan kata kunci "untuak"');
        this.consume('LPAREN', 'Diharapkan "(" setelah "untuak"');
        
        const init = this.match('SEMICOLON') ? null : this.statement();
        this.consume('SEMICOLON', 'Diharapkan ";" setelah inisialisasi for');
        
        const condition = this.match('SEMICOLON') ? null : this.expression();
        this.consume('SEMICOLON', 'Diharapkan ";" setelah kondisi for');
        
        const update = this.match('RPAREN') ? null : this.expression();
        this.consume('RPAREN', 'Diharapkan ")" setelah update for');
        
        const body = this.blockStatement();

        return {
            type: 'ForStatement',
            init: init,
            condition: condition,
            update: update,
            body: body
        };
    }

    // Return statement: jadi expression
    returnStatement() {
        this.consume('RETURN', 'Diharapkan kata kunci "jadi"');
        
        let value = null;
        if (!this.match('NEWLINE') && !this.match('EOF')) {
            value = this.expression();
        }

        return {
            type: 'ReturnStatement',
            argument: value
        };
    }

    // Print statement: cetak expression
    printStatement() {
        this.consume('PRINT', 'Diharapkan kata kunci "cetak"');
        const argument = this.expression();

        return {
            type: 'PrintStatement',
            argument: argument
        };
    }

    // Print member statement: cetak.rusak expression (without parentheses)
    printMemberStatement() {
        this.consume('PRINT', 'Diharapkan kata kunci "cetak"');
        this.consume('DOT', 'Diharapkan "." setelah "cetak"');
        const property = this.consume('IDENTIFIER', 'Diharapkan nama method setelah "."').value;
        
        const argument = this.expression();

        return {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'cetak'
                    },
                    property: property
                },
                arguments: [argument]
            }
        };
    }

    // Block statement: { statements }
    blockStatement() {
        this.consume('LBRACE', 'Diharapkan "{"');
        this.skipNewlines();
        
        const statements = [];
        while (!this.match('RBRACE') && !this.match('EOF')) {
            if (this.match('NEWLINE')) {
                this.advance();
                continue;
            }
            statements.push(this.statement());
            this.skipNewlines();
        }
        
        this.consume('RBRACE', 'Diharapkan "}"');

        return {
            type: 'BlockStatement',
            body: statements
        };
    }

    // Expression statement
    expressionStatement() {
        const expr = this.expression();
        return {
            type: 'ExpressionStatement',
            expression: expr
        };
    }

    // Parse expression (assignment level)
    expression() {
        return this.assignment();
    }

    // Assignment expression
    assignment() {
        let expr = this.logicalOr();

        if (this.match('ASSIGN')) {
            this.advance();
            const value = this.assignment();
            
            if (expr.type === 'Identifier') {
                return {
                    type: 'AssignmentExpression',
                    left: expr,
                    right: value
                };
            }
            throw new Error('Target assignment tidak valid');
        }

        return expr;
    }

    // Logical OR expression
    logicalOr() {
        let expr = this.logicalAnd();

        while (this.match('OR')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.logicalAnd();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Logical AND expression
    logicalAnd() {
        let expr = this.equality();

        while (this.match('AND')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.equality();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Equality expression
    equality() {
        let expr = this.comparison();

        while (this.match('EQUAL') || this.match('NOT_EQUAL')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.comparison();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Comparison expression
    comparison() {
        let expr = this.addition();

        while (this.match('GREATER_THAN') || this.match('GREATER_EQUAL') || 
               this.match('LESS_THAN') || this.match('LESS_EQUAL')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.addition();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Addition and subtraction
    addition() {
        let expr = this.multiplication();

        while (this.match('PLUS') || this.match('MINUS')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.multiplication();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Multiplication, division, modulo
    multiplication() {
        let expr = this.unary();

        while (this.match('MULTIPLY') || this.match('DIVIDE') || this.match('MODULO')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const right = this.unary();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator: operator,
                right: right
            };
        }

        return expr;
    }

    // Unary expression
    unary() {
        if (this.match('NOT') || this.match('MINUS')) {
            const operator = this.getCurrentToken().value;
            this.advance();
            const expr = this.unary();
            return {
                type: 'UnaryExpression',
                operator: operator,
                argument: expr
            };
        }

        return this.call();
    }

    // Function call expression
    call() {
        let expr = this.primary();

        while (true) {
            if (this.match('LPAREN')) {
                this.advance();
                const args = [];
                
                if (!this.match('RPAREN')) {
                    do {
                        args.push(this.expression());
                        if (this.match('COMMA')) {
                            this.advance();
                        } else {
                            break;
                        }
                    } while (!this.match('RPAREN'));
                }
                
                this.consume('RPAREN', 'Diharapkan ")" setelah argumen');
                
                expr = {
                    type: 'CallExpression',
                    callee: expr,
                    arguments: args
                };
            } else if (this.match('DOT')) {
                // Handle member access like cetak.rusak
                this.advance();
                const property = this.consume('IDENTIFIER', 'Diharapkan nama properti setelah "."').value;
                expr = {
                    type: 'MemberExpression',
                    object: expr,
                    property: property
                };
            } else {
                break;
            }
        }

        return expr;
    }

    // Primary expression
    primary() {
        if (this.match('TRUE')) {
            this.advance();
            return { type: 'Literal', value: true };
        }

        if (this.match('FALSE')) {
            this.advance();
            return { type: 'Literal', value: false };
        }

        if (this.match('NULL')) {
            this.advance();
            return { type: 'Literal', value: null };
        }

        if (this.match('NUMBER')) {
            const value = this.getCurrentToken().value;
            this.advance();
            return { type: 'Literal', value: value };
        }

        if (this.match('STRING')) {
            const value = this.getCurrentToken().value;
            this.advance();
            return { type: 'Literal', value: value };
        }

        if (this.match('IDENTIFIER')) {
            const name = this.getCurrentToken().value;
            this.advance();
            return { type: 'Identifier', name: name };
        }

        // Handle PRINT as identifier for member expressions
        if (this.match('PRINT')) {
            const name = this.getCurrentToken().value;
            this.advance();
            return { type: 'Identifier', name: name };
        }

        // Handle cultural keywords as identifiers in expressions
        if (this.match('COLLABORATE') || this.match('DISCUSS') || 
            this.match('LEARN') || this.match('ETHICAL')) {
            const name = this.getCurrentToken().value;
            this.advance();
            return { type: 'Identifier', name: name };
        }

        if (this.match('LPAREN')) {
            this.advance();
            const expr = this.expression();
            this.consume('RPAREN', 'Diharapkan ")" setelah ekspresi');
            return expr;
        }

        const token = this.getCurrentToken();
        throw new Error(`Token tidak terduga ${token.type} pada baris ${token.line}`);
    }
}

module.exports = { MinangParser };
