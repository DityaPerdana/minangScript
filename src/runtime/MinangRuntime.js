class MinangRuntime {
    constructor() {
        this.environment = new Map();
        this.functions = new Map();
        this.callStack = [];
        
        // Initialize built-in functions and variables
        this.initializeBuiltins();
    }

    // Initialize built-in functions inspired by Minangkabau culture
    initializeBuiltins() {
        // Enhanced print function with methods
        this.functions.set('cetak', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.log(...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print error method
        this.functions.set('cetak.rusak', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.error('❌ RUSAK:', ...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print warning method
        this.functions.set('cetak.ingek', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.warn('⚠️ INGEK:', ...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print debug method
        this.functions.set('cetak.urai', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.debug('🔍 URAI:', ...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print log method
        this.functions.set('cetak.pesan', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.info('📝 PESAN:', ...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print warning method (alternative name)
        this.functions.set('cetak.peringatan', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.warn('⚠️ PERINGATAN:', ...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Print table method
        this.functions.set('cetak.tabel', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                if (args.length === 1 && (Array.isArray(args[0]) || typeof args[0] === 'object')) {
                    console.table(args[0]);
                } else {
                    console.table(args);
                }
                return null;
            }
        });

        // Legacy print function for backward compatibility
        this.functions.set('tampilkan', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                console.log(...args.map(arg => this.toString(arg)));
                return null;
            }
        });

        // Built-in constants
        this.environment.set('PI', Math.PI);
        this.environment.set('EULER', Math.E);

        // Web Development Functions
        this.initializeWebFunctions();
    }

    // Execute AST
    execute(ast) {
        try {
            return this.evaluate(ast);
        } catch (error) {
            console.error('❌ Kesalahan runtime:', error.message);
            throw error;
        }
    }

    // Evaluate AST node
    evaluate(node) {
        switch (node.type) {
            case 'Program':
                let result = null;
                for (const statement of node.body) {
                    result = this.evaluate(statement);
                    
                    // Handle return statements
                    if (result && result.type === 'return') {
                        return result.value;
                    }
                }
                return result;

            case 'VariableDeclaration':
                const value = node.initializer ? this.evaluate(node.initializer) : null;
                this.environment.set(node.identifier, value);
                return value;

            case 'FunctionDeclaration':
                this.functions.set(node.name, {
                    type: 'user',
                    params: node.params,
                    body: node.body,
                    arity: node.params.length
                });
                return null;

            case 'IfStatement':
                const condition = this.evaluate(node.condition);
                if (this.isTruthy(condition)) {
                    return this.evaluate(node.consequent);
                } else if (node.alternate) {
                    return this.evaluate(node.alternate);
                }
                return null;

            case 'WhileStatement':
                let whileResult = null;
                while (this.isTruthy(this.evaluate(node.condition))) {
                    whileResult = this.evaluate(node.body);
                    
                    // Handle break/continue (would need to be implemented)
                    if (whileResult && whileResult.type === 'break') {
                        break;
                    }
                    if (whileResult && whileResult.type === 'continue') {
                        continue;
                    }
                    if (whileResult && whileResult.type === 'return') {
                        return whileResult;
                    }
                }
                return whileResult;

            case 'ForStatement':
                // Execute initialization
                if (node.init) {
                    this.evaluate(node.init);
                }
                
                let forResult = null;
                while (true) {
                    // Check condition
                    if (node.condition && !this.isTruthy(this.evaluate(node.condition))) {
                        break;
                    }
                    
                    // Execute body
                    forResult = this.evaluate(node.body);
                    
                    // Handle control flow
                    if (forResult && forResult.type === 'break') {
                        break;
                    }
                    if (forResult && forResult.type === 'continue') {
                        // Execute update before continuing
                        if (node.update) {
                            this.evaluate(node.update);
                        }
                        continue;
                    }
                    if (forResult && forResult.type === 'return') {
                        return forResult;
                    }
                    
                    // Execute update
                    if (node.update) {
                        this.evaluate(node.update);
                    }
                }
                return forResult;

            case 'ReturnStatement':
                const returnValue = node.argument ? this.evaluate(node.argument) : null;
                return { type: 'return', value: returnValue };

            case 'PrintStatement':
                const printValue = this.evaluate(node.argument);
                console.log(this.toString(printValue));
                return printValue;

            case 'BlockStatement':
                // Create new scope
                let blockResult = null;
                
                for (const statement of node.body) {
                    blockResult = this.evaluate(statement);
                    
                    // Handle control flow
                    if (blockResult && ['return', 'break', 'continue'].includes(blockResult.type)) {
                        break;
                    }
                }
                
                return blockResult;

            case 'ExpressionStatement':
                return this.evaluate(node.expression);

            case 'AssignmentExpression':
                const assignValue = this.evaluate(node.right);
                if (node.left.type === 'Identifier') {
                    this.environment.set(node.left.name, assignValue);
                    return assignValue;
                }
                throw new Error('Target assignment tidak valid');

            case 'BinaryExpression':
                const left = this.evaluate(node.left);
                const right = this.evaluate(node.right);
                return this.evaluateBinaryExpression(node.operator, left, right);

            case 'UnaryExpression':
                const operand = this.evaluate(node.argument);
                return this.evaluateUnaryExpression(node.operator, operand);

            case 'CallExpression':
                const args = node.arguments.map(arg => this.evaluate(arg));
                
                if (node.callee.type === 'Identifier') {
                    const funcName = node.callee.name;
                    
                    // Check built-in functions first
                    if (this.functions.has(funcName)) {
                        const func = this.functions.get(funcName);
                        return this.callFunction(func, args, funcName);
                    }
                    
                    // Check if it's a variable containing a function (for future extension)
                    if (this.environment.has(funcName)) {
                        const value = this.environment.get(funcName);
                        if (typeof value === 'function') {
                            return value(...args);
                        }
                    }
                    
                    throw new Error(`Fungsi '${funcName}' tidak ditemukan`);
                } else if (node.callee.type === 'MemberFunction') {
                    // Handle member function calls like cetak.rusak()
                    const memberName = node.callee.name;
                    if (this.functions.has(memberName)) {
                        const func = this.functions.get(memberName);
                        return this.callFunction(func, args, memberName);
                    }
                    throw new Error(`Fungsi '${memberName}' tidak ditemukan`);
                } else if (node.callee.type === 'MemberExpression') {
                    // Handle direct member expression calls
                    const memberResult = this.evaluate(node.callee);
                    if (memberResult.type === 'MemberFunction') {
                        const func = this.functions.get(memberResult.name);
                        return this.callFunction(func, args, memberResult.name);
                    }
                }
                
                throw new Error('Hanya identifier dan member expression yang dapat dipanggil sebagai fungsi');

            case 'Identifier':
                if (this.environment.has(node.name)) {
                    return this.environment.get(node.name);
                }
                throw new Error(`Variabel '${node.name}' tidak ditemukan`);

            case 'Literal':
                return node.value;

            case 'MemberExpression':
                // Handle member access like cetak.rusak
                if (node.object.type === 'Identifier') {
                    const objectName = node.object.name;
                    const property = node.property;
                    const memberName = `${objectName}.${property}`;
                    
                    // Check if the member function exists
                    if (this.functions.has(memberName)) {
                        return { type: 'MemberFunction', name: memberName };
                    }
                    
                    // If object is a known function name, allow member access
                    if (this.functions.has(objectName)) {
                        return { type: 'MemberFunction', name: memberName };
                    }
                }
                
                throw new Error(`Properti '${node.property}' tidak ditemukan pada '${node.object.name}'`);

            // FIRST EVALUATE METHOD - Handle new expressions
            case 'ArrayExpression':
                return node.elements.map(element => this.evaluate(element));

            case 'ObjectExpression':
                const obj = {};
                for (const prop of node.properties) {
                    const key = prop.key;
                    const value = this.evaluate(prop.value);
                    obj[key] = value;
                }
                return obj;

            default:
                throw new Error(`Tipe node tidak didukung: ${node.type}`);
        }
    }

    // Call function
    callFunction(func, args, funcName) {
        if (func.type === 'builtin') {
            if (func.arity !== -1 && args.length !== func.arity) {
                throw new Error(`Fungsi '${funcName}' membutuhkan ${func.arity} argumen, diberikan ${args.length}`);
            }
            return func.body(args);
        }
        
        if (func.type === 'user') {
            if (args.length !== func.arity) {
                throw new Error(`Fungsi '${funcName}' membutuhkan ${func.arity} argumen, diberikan ${args.length}`);
            }
            
            // Create new environment for function scope (simple approach)
            const savedVars = new Map();
            
            // Save existing parameter values
            for (const param of func.params) {
                if (this.environment.has(param)) {
                    savedVars.set(param, this.environment.get(param));
                }
            }
            
            // Bind parameters
            for (let i = 0; i < func.params.length; i++) {
                this.environment.set(func.params[i], args[i]);
            }
            
            try {
                const result = this.evaluate(func.body);
                return result && result.type === 'return' ? result.value : null;
            } finally {
                // Restore previous parameter values
                for (const param of func.params) {
                    if (savedVars.has(param)) {
                        this.environment.set(param, savedVars.get(param));
                    } else {
                        this.environment.delete(param);
                    }
                }
            }
        }
        
        throw new Error(`Tipe fungsi tidak dikenal: ${func.type}`);
    }

    // Evaluate binary expressions
    evaluateBinaryExpression(operator, left, right) {
        switch (operator) {
            case '+':
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                return this.toString(left) + this.toString(right);
            case '-':
                return this.toNumber(left) - this.toNumber(right);
            case '*':
                return this.toNumber(left) * this.toNumber(right);
            case '/':
                const rightNum = this.toNumber(right);
                if (rightNum === 0) {
                    throw new Error('Pembagian dengan nol');
                }
                return this.toNumber(left) / rightNum;
            case '%':
                return this.toNumber(left) % this.toNumber(right);
            case '==':
                return this.isEqual(left, right);
            case '!=':
                return !this.isEqual(left, right);
            case '<':
                return this.toNumber(left) < this.toNumber(right);
            case '>':
                return this.toNumber(left) > this.toNumber(right);
            case '<=':
                return this.toNumber(left) <= this.toNumber(right);
            case '>=':
                return this.toNumber(left) >= this.toNumber(right);
            case '&&':
                return this.isTruthy(left) && this.isTruthy(right);
            case '||':
                return this.isTruthy(left) || this.isTruthy(right);
            default:
                throw new Error(`Operator biner tidak dikenal: ${operator}`);
        }
    }

    // Evaluate unary expressions
    evaluateUnaryExpression(operator, operand) {
        switch (operator) {
            case '-':
                return -this.toNumber(operand);
            case '!':
                return !this.isTruthy(operand);
            default:
                throw new Error(`Operator unary tidak dikenal: ${operator}`);
        }
    }

    // Utility method to print tokens (for debugging)
    printTokens(tokens) {
        console.log('MinangScript Tokens:');
        tokens.forEach((token, index) => {
            console.log(`${index}: ${token.type} - "${token.value}" (${token.line}:${token.column})`);
        });
    }

    // Initialize web development built-in functions
    initializeWebFunctions() {
        // DOM Manipulation Functions
        this.functions.set('dokumen', {
            type: 'builtin',
            arity: 0,
            body: () => {
                if (typeof document !== 'undefined') {
                    return document;
                } else {
                    console.warn('⚠️ Document object not available (not running in browser)');
                    return null;
                }
            }
        });

        this.functions.set('piliah', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                if (typeof document !== 'undefined') {
                    return document.querySelector(this.toString(args[0]));
                } else {
                    console.warn('⚠️ DOM not available');
                    return null;
                }
            }
        });

        this.functions.set('pilihSemua', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                if (typeof document !== 'undefined') {
                    return Array.from(document.querySelectorAll(this.toString(args[0])));
                } else {
                    console.warn('⚠️ DOM not available');
                    return [];
                }
            }
        });

        this.functions.set('buat', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                if (typeof document !== 'undefined') {
                    return document.createElement(this.toString(args[0]));
                } else {
                    console.warn('⚠️ DOM not available');
                    return null;
                }
            }
        });

        // Event Handling
        this.functions.set('dengar', {
            type: 'builtin',
            arity: 3,
            body: (args) => {
                const [element, event, callback] = args;
                if (element && typeof element.addEventListener === 'function') {
                    element.addEventListener(this.toString(event), callback);
                    return true;
                } else {
                    console.warn('⚠️ Invalid element for event listener');
                    return false;
                }
            }
        });

        // HTTP/Fetch Functions
        this.functions.set('kirim', {
            type: 'builtin',
            arity: 1,
            body: async (args) => {
                const url = this.toString(args[0]);
                if (typeof fetch !== 'undefined') {
                    try {
                        const response = await fetch(url);
                        return await response.json();
                    } catch (error) {
                        console.error('❌ Fetch error:', error.message);
                        return null;
                    }
                } else {
                    console.warn('⚠️ Fetch API not available');
                    return null;
                }
            }
        });

        this.functions.set('kirimPost', {
            type: 'builtin',
            arity: 2,
            body: async (args) => {
                const [url, data] = args;
                if (typeof fetch !== 'undefined') {
                    try {
                        const response = await fetch(this.toString(url), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        });
                        return await response.json();
                    } catch (error) {
                        console.error('❌ POST error:', error.message);
                        return null;
                    }
                } else {
                    console.warn('⚠️ Fetch API not available');
                    return null;
                }
            }
        });

        // JSON Functions
        this.functions.set('jsonKe', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                try {
                    return JSON.stringify(args[0]);
                } catch (error) {
                    console.error('❌ JSON stringify error:', error.message);
                    return null;
                }
            }
        });

        this.functions.set('jsonDari', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                try {
                    return JSON.parse(this.toString(args[0]));
                } catch (error) {
                    console.error('❌ JSON parse error:', error.message);
                    return null;
                }
            }
        });

        // Local Storage Functions
        this.functions.set('simpan', {
            type: 'builtin',
            arity: 2,
            body: (args) => {
                const [key, value] = args;
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(this.toString(key), this.toString(value));
                    return true;
                } else {
                    console.warn('⚠️ LocalStorage not available');
                    return false;
                }
            }
        });

        this.functions.set('ambil', {
            type: 'builtin',
            arity: 1,
            body: (args) => {
                const key = this.toString(args[0]);
                if (typeof localStorage !== 'undefined') {
                    return localStorage.getItem(key);
                } else {
                    console.warn('⚠️ LocalStorage not available');
                    return null;
                }
            }
        });

        // Timer Functions
        this.functions.set('tungguDetik', {
            type: 'builtin',
            arity: 2,
            body: (args) => {
                const [callback, delay] = args;
                if (typeof setTimeout !== 'undefined') {
                    return setTimeout(callback, delay * 1000);
                } else {
                    console.warn('⚠️ Timer functions not available');
                    return null;
                }
            }
        });

        this.functions.set('ulangi', {
            type: 'builtin',
            arity: 2,
            body: (args) => {
                const [callback, interval] = args;
                if (typeof setInterval !== 'undefined') {
                    return setInterval(callback, interval * 1000);
                } else {
                    console.warn('⚠️ Timer functions not available');
                    return null;
                }
            }
        });
    }

    // Execute AST
    execute(ast) {
        try {
            return this.evaluate(ast);
        } catch (error) {
            console.error('❌ Kesalahan runtime:', error.message);
            throw error;
        }
    }

    // Evaluate AST node
    evaluate(node) {
        switch (node.type) {
            case 'Program':
                let result = null;
                for (const statement of node.body) {
                    result = this.evaluate(statement);
                    
                    // Handle return statements
                    if (result && result.type === 'return') {
                        return result.value;
                    }
                }
                return result;

            case 'VariableDeclaration':
                const value = node.initializer ? this.evaluate(node.initializer) : null;
                this.environment.set(node.identifier, value);
                return value;

            case 'FunctionDeclaration':
                this.functions.set(node.name, {
                    type: 'user',
                    params: node.params,
                    body: node.body,
                    arity: node.params.length
                });
                return null;

            case 'IfStatement':
                const condition = this.evaluate(node.condition);
                if (this.isTruthy(condition)) {
                    return this.evaluate(node.consequent);
                } else if (node.alternate) {
                    return this.evaluate(node.alternate);
                }
                return null;

            case 'WhileStatement':
                let whileResult = null;
                while (this.isTruthy(this.evaluate(node.condition))) {
                    whileResult = this.evaluate(node.body);
                    
                    // Handle break/continue (would need to be implemented)
                    if (whileResult && whileResult.type === 'break') {
                        break;
                    }
                    if (whileResult && whileResult.type === 'continue') {
                        continue;
                    }
                    if (whileResult && whileResult.type === 'return') {
                        return whileResult;
                    }
                }
                return whileResult;

            case 'ForStatement':
                // Execute initialization
                if (node.init) {
                    this.evaluate(node.init);
                }
                
                let forResult = null;
                while (true) {
                    // Check condition
                    if (node.condition && !this.isTruthy(this.evaluate(node.condition))) {
                        break;
                    }
                    
                    // Execute body
                    forResult = this.evaluate(node.body);
                    
                    // Handle control flow
                    if (forResult && forResult.type === 'break') {
                        break;
                    }
                    if (forResult && forResult.type === 'continue') {
                        // Execute update before continuing
                        if (node.update) {
                            this.evaluate(node.update);
                        }
                        continue;
                    }
                    if (forResult && forResult.type === 'return') {
                        return forResult;
                    }
                    
                    // Execute update
                    if (node.update) {
                        this.evaluate(node.update);
                    }
                }
                return forResult;

            case 'ReturnStatement':
                const returnValue = node.argument ? this.evaluate(node.argument) : null;
                return { type: 'return', value: returnValue };

            case 'PrintStatement':
                const printValue = this.evaluate(node.argument);
                console.log(this.toString(printValue));
                return printValue;

            case 'BlockStatement':
                // Create new scope
                let blockResult = null;
                
                for (const statement of node.body) {
                    blockResult = this.evaluate(statement);
                    
                    // Handle control flow
                    if (blockResult && ['return', 'break', 'continue'].includes(blockResult.type)) {
                        break;
                    }
                }
                
                return blockResult;

            case 'ExpressionStatement':
                return this.evaluate(node.expression);

            case 'AssignmentExpression':
                const assignValue = this.evaluate(node.right);
                if (node.left.type === 'Identifier') {
                    this.environment.set(node.left.name, assignValue);
                    return assignValue;
                }
                throw new Error('Target assignment tidak valid');

            case 'BinaryExpression':
                const left = this.evaluate(node.left);
                const right = this.evaluate(node.right);
                return this.evaluateBinaryExpression(node.operator, left, right);

            case 'UnaryExpression':
                const operand = this.evaluate(node.argument);
                return this.evaluateUnaryExpression(node.operator, operand);

            case 'CallExpression':
                const args = node.arguments.map(arg => this.evaluate(arg));
                
                if (node.callee.type === 'Identifier') {
                    const funcName = node.callee.name;
                    
                    // Check built-in functions first
                    if (this.functions.has(funcName)) {
                        const func = this.functions.get(funcName);
                        return this.callFunction(func, args, funcName);
                    }
                    
                    // Check if it's a variable containing a function (for future extension)
                    if (this.environment.has(funcName)) {
                        const value = this.environment.get(funcName);
                        if (typeof value === 'function') {
                            return value(...args);
                        }
                    }
                    
                    throw new Error(`Fungsi '${funcName}' tidak ditemukan`);
                } else if (node.callee.type === 'MemberFunction') {
                    // Handle member function calls like cetak.rusak()
                    const memberName = node.callee.name;
                    if (this.functions.has(memberName)) {
                        const func = this.functions.get(memberName);
                        return this.callFunction(func, args, memberName);
                    }
                    throw new Error(`Fungsi '${memberName}' tidak ditemukan`);
                } else if (node.callee.type === 'MemberExpression') {
                    // Handle direct member expression calls
                    const memberResult = this.evaluate(node.callee);
                    if (memberResult.type === 'MemberFunction') {
                        const func = this.functions.get(memberResult.name);
                        return this.callFunction(func, args, memberResult.name);
                    }
                }
                
                throw new Error('Hanya identifier dan member expression yang dapat dipanggil sebagai fungsi');

            case 'Identifier':
                if (this.environment.has(node.name)) {
                    return this.environment.get(node.name);
                }
                throw new Error(`Variabel '${node.name}' tidak ditemukan`);

            case 'Literal':
                return node.value;

            case 'MemberExpression':
                // Handle member access like cetak.rusak
                if (node.object.type === 'Identifier') {
                    const objectName = node.object.name;
                    const property = node.property;
                    const memberName = `${objectName}.${property}`;
                    
                    // Check if the member function exists
                    if (this.functions.has(memberName)) {
                        return { type: 'MemberFunction', name: memberName };
                    }
                    
                    // If object is a known function name, allow member access
                    if (this.functions.has(objectName)) {
                        return { type: 'MemberFunction', name: memberName };
                    }
                }
                
                throw new Error(`Properti '${node.property}' tidak ditemukan pada '${node.object.name}'`);

            // FIRST EVALUATE METHOD - Handle new expressions
            case 'ArrayExpression':
                return node.elements.map(element => this.evaluate(element));

            case 'ObjectExpression':
                const obj = {};
                for (const prop of node.properties) {
                    const key = prop.key;
                    const value = this.evaluate(prop.value);
                    obj[key] = value;
                }
                return obj;

            default:
                throw new Error(`Tipe node tidak didukung: ${node.type}`);
        }
    }

    // Call function
    callFunction(func, args, funcName) {
        if (func.type === 'builtin') {
            if (func.arity !== -1 && args.length !== func.arity) {
                throw new Error(`Fungsi '${funcName}' membutuhkan ${func.arity} argumen, diberikan ${args.length}`);
            }
            return func.body(args);
        }
        
        if (func.type === 'user') {
            if (args.length !== func.arity) {
                throw new Error(`Fungsi '${funcName}' membutuhkan ${func.arity} argumen, diberikan ${args.length}`);
            }
            
            // Create new environment for function scope (simple approach)
            const savedVars = new Map();
            
            // Save existing parameter values
            for (const param of func.params) {
                if (this.environment.has(param)) {
                    savedVars.set(param, this.environment.get(param));
                }
            }
            
            // Bind parameters
            for (let i = 0; i < func.params.length; i++) {
                this.environment.set(func.params[i], args[i]);
            }
            
            try {
                const result = this.evaluate(func.body);
                return result && result.type === 'return' ? result.value : null;
            } finally {
                // Restore previous parameter values
                for (const param of func.params) {
                    if (savedVars.has(param)) {
                        this.environment.set(param, savedVars.get(param));
                    } else {
                        this.environment.delete(param);
                    }
                }
            }
        }
        
        throw new Error(`Tipe fungsi tidak dikenal: ${func.type}`);
    }

    // Evaluate binary expressions
    evaluateBinaryExpression(operator, left, right) {
        switch (operator) {
            case '+':
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                return this.toString(left) + this.toString(right);
            case '-':
                return this.toNumber(left) - this.toNumber(right);
            case '*':
                return this.toNumber(left) * this.toNumber(right);
            case '/':
                const rightNum = this.toNumber(right);
                if (rightNum === 0) {
                    throw new Error('Pembagian dengan nol');
                }
                return this.toNumber(left) / rightNum;
            case '%':
                return this.toNumber(left) % this.toNumber(right);
            case '==':
                return this.isEqual(left, right);
            case '!=':
                return !this.isEqual(left, right);
            case '<':
                return this.toNumber(left) < this.toNumber(right);
            case '>':
                return this.toNumber(left) > this.toNumber(right);
            case '<=':
                return this.toNumber(left) <= this.toNumber(right);
            case '>=':
                return this.toNumber(left) >= this.toNumber(right);
            case '&&':
                return this.isTruthy(left) && this.isTruthy(right);
            case '||':
                return this.isTruthy(left) || this.isTruthy(right);
            default:
                throw new Error(`Operator biner tidak dikenal: ${operator}`);
        }
    }

    // Evaluate unary expressions
    evaluateUnaryExpression(operator, operand) {
        switch (operator) {
            case '-':
                return -this.toNumber(operand);
            case '!':
                return !this.isTruthy(operand);
            default:
                throw new Error(`Operator unary tidak dikenal: ${operator}`);
        }
    }

    // Helper methods
    isTruthy(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        if (typeof value === 'string') return value.length > 0;
        return true;
    }

    isEqual(left, right) {
        if (typeof left === typeof right) {
            return left === right;
        }
        return false;
    }

    toNumber(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            const num = parseFloat(value);
            if (isNaN(num)) {
                throw new Error(`Tidak dapat mengkonversi '${value}' ke angka`);
            }
            return num;
        }
        if (typeof value === 'boolean') return value ? 1 : 0;
        if (value === null) return 0;
        throw new Error(`Tidak dapat mengkonversi ${typeof value} ke angka`);
    }

    toString(value) {
        if (value === null) return 'kosong';
        if (value === undefined) return 'tidak terdefinisi';
        if (typeof value === 'boolean') return value ? 'bana' : 'salah';
        return String(value);
    }

    // Get current environment state (for debugging)
    getEnvironment() {
        return Object.fromEntries(this.environment);
    }

    // Get available functions (for debugging)
    getFunctions() {
        return Array.from(this.functions.keys());
    }
}

module.exports = { MinangRuntime };
