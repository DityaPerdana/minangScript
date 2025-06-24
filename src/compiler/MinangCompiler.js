const { MinangParser } = require('../parser/MinangParser');

class MinangCompiler {
    constructor() {
        this.parser = new MinangParser();
    }

    // Compile MinangScript source to AST
    compile(sourceCode) {
        try {
            const ast = this.parser.parse(sourceCode);
            return ast;
        } catch (error) {
            throw new Error(`Kesalahan kompilasi: ${error.message}`);
        }
    }

    // Transpile MinangScript to JavaScript
    transpile(sourceCode) {
        const ast = this.compile(sourceCode);
        return this.generateJavaScript(ast);
    }

    // Generate JavaScript code from AST
    generateJavaScript(node) {
        switch (node.type) {
            case 'Program':
                return node.body.map(stmt => this.generateJavaScript(stmt)).join('\n');

            case 'VariableDeclaration':
                const initValue = node.initializer ? ` = ${this.generateJavaScript(node.initializer)}` : '';
                const jsKeyword = this.mapDeclarationType(node.declarationType);
                return `${jsKeyword} ${node.identifier}${initValue};`;

            case 'FunctionDeclaration':
                const params = node.params.join(', ');
                const body = this.generateJavaScript(node.body);
                return `function ${node.name}(${params}) ${body}`;

            case 'IfStatement':
                let result = `if (${this.generateJavaScript(node.condition)}) ${this.generateJavaScript(node.consequent)}`;
                if (node.alternate) {
                    if (node.alternate.type === 'IfStatement') {
                        result += ` else ${this.generateJavaScript(node.alternate)}`;
                    } else {
                        result += ` else ${this.generateJavaScript(node.alternate)}`;
                    }
                }
                return result;

            case 'WhileStatement':
                return `while (${this.generateJavaScript(node.condition)}) ${this.generateJavaScript(node.body)}`;

            case 'ForStatement':
                const forInit = node.init ? this.generateJavaScript(node.init).replace(';', '') : '';
                const condition = node.condition ? this.generateJavaScript(node.condition) : '';
                const update = node.update ? this.generateJavaScript(node.update) : '';
                return `for (${forInit}; ${condition}; ${update}) ${this.generateJavaScript(node.body)}`;

            case 'ReturnStatement':
                const arg = node.argument ? ` ${this.generateJavaScript(node.argument)}` : '';
                return `return${arg};`;

            case 'PrintStatement':
                return `console.log(${this.generateJavaScript(node.argument)});`;

            case 'BlockStatement':
                const statements = node.body.map(stmt => this.generateJavaScript(stmt)).join('\n  ');
                return `{\n  ${statements}\n}`;

            case 'ExpressionStatement':
                return `${this.generateJavaScript(node.expression)};`;

            case 'MemberExpression':
                // Handle member expressions like cetak.rusak
                return `${this.generateJavaScript(node.object)}.${node.property}`;

            case 'AssignmentExpression':
                return `${this.generateJavaScript(node.left)} = ${this.generateJavaScript(node.right)}`;

            case 'BinaryExpression':
                const left = this.generateJavaScript(node.left);
                const right = this.generateJavaScript(node.right);
                return `(${left} ${this.mapOperator(node.operator)} ${right})`;

            case 'UnaryExpression':
                const operand = this.generateJavaScript(node.argument);
                return `(${this.mapOperator(node.operator)}${operand})`;

            case 'CallExpression':
                const callee = this.generateJavaScript(node.callee);
                const args = node.arguments.map(arg => this.generateJavaScript(arg)).join(', ');
                return `${callee}(${args})`;

            case 'Identifier':
                return node.name;

            case 'Literal':
                if (typeof node.value === 'string') {
                    return `"${node.value.replace(/"/g, '\\"')}"`;
                }
                return String(node.value);

            case 'ArrayExpression':
                const elements = node.elements.map(el => this.generateJavaScript(el)).join(', ');
                return `[${elements}]`;

            case 'ObjectExpression':
                const properties = node.properties.map(prop => {
                    const key = typeof prop.key === 'string' ? `"${prop.key}"` : prop.key;
                    const value = this.generateJavaScript(prop.value);
                    return `${key}: ${value}`;
                }).join(', ');
                return `{${properties}}`;

            default:
                throw new Error(`Tipe node tidak dikenal: ${node.type}`);
        }
    }

    // Map MinangScript operators to JavaScript operators
    mapOperator(operator) {
        const operatorMap = {
            '&&': '&&',
            '||': '||',
            '!': '!',
            '==': '===',
            '!=': '!==',
            '<': '<',
            '>': '>',
            '<=': '<=',
            '>=': '>=',
            '+': '+',
            '-': '-',
            '*': '*',
            '/': '/',
            '%': '%'
        };

        return operatorMap[operator] || operator;
    }

    // Map MinangScript declaration types to JavaScript
    mapDeclarationType(declarationType) {
        const typeMap = {
            'VAR': 'var',     // buek -> var
            'LET': 'let',     // ambiak -> let  
            'CONST': 'const'  // tagak -> const
        };
        return typeMap[declarationType] || 'let';
    }

    // Generate optimized JavaScript (basic optimizations)
    optimizeAndGenerate(ast) {
        // This is where we could add optimizations
        // For now, just generate standard JavaScript
        return this.generateJavaScript(ast);
    }

    // Create a complete JavaScript module
    generateModule(sourceCode, moduleName = 'MinangModule') {
        const jsCode = this.transpile(sourceCode);
        
        return `// Generated from MinangScript
// Module: ${moduleName}
// Generated at: ${new Date().toISOString()}

(function() {
    'use strict';
    
    ${jsCode}
    
})();`;
    }

    // Generate JavaScript with MinangScript runtime helpers
    generateWithRuntime(sourceCode) {
        const jsCode = this.transpile(sourceCode);
        
        return `// MinangScript Runtime Helpers
const MinangRuntime = {
    // Gotong Royong helper - collaborative processing
    gotongRoyong: function(tasks, callback) {
        return Promise.all(tasks.map(task => 
            typeof task === 'function' ? task() : task
        )).then(callback);
    },
    
    // Musyawarah helper - consensus building
    musyawarah: function(options, voters) {
        const votes = voters.map(voter => voter(options));
        const consensus = votes.reduce((acc, vote) => {
            acc[vote] = (acc[vote] || 0) + 1;
            return acc;
        }, {});
        
        return Object.keys(consensus).reduce((a, b) => 
            consensus[a] > consensus[b] ? a : b
        );
    },
    
    // Alam Takambang Jadi Guru - learning from patterns
    alamTakambang: function(data, pattern) {
        // Simple pattern matching for learning
        return data.filter(item => 
            typeof pattern === 'function' ? pattern(item) : item.includes(pattern)
        );
    }
};

// Generated MinangScript Code
${jsCode}`;
    }
}

module.exports = { MinangCompiler };
