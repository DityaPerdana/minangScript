// Web-compatible MinangScript Compiler
// Simplified version for browser usage

class MinangWebLexer {
  constructor() {
    this.keywords = {
      // Basic keywords
      'buek': 'VAR',           // create variable
      'ambiak': 'LET',         // let variable declaration 
      'tagak': 'CONST',        // const variable declaration
      'karojo': 'FUNCTION',    // function definition
      'jadi': 'RETURN',        // return statement
      'kalau': 'IF',           // if statement
      'lainnya': 'ELSE',       // else statement
      'tapi': 'ELSEIF',        // else if (tapi kalau)
      'selamo': 'WHILE',       // while loop
      'ulang': 'FOR',          // for loop
      'baronti': 'BREAK',      // break statement
      'lanjuik': 'CONTINUE',   // continue statement
      'cetak': 'PRINT',        // print statement
      
      // Values
      'bana': 'TRUE',          // true
      'salah': 'FALSE',        // false
      'kosong': 'NULL',        // null/empty
    }
    
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
    }
  }

  tokenize(input) {
    const tokens = []
    const lines = input.split('\n')
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum]
      let i = 0
      
      while (i < line.length) {
        const char = line[i]
        
        // Skip whitespace
        if (/\s/.test(char)) {
          i++
          continue
        }
        
        // Skip comments
        if (char === '/' && line[i + 1] === '/') {
          break
        }
        
        // String literals
        if (char === '"' || char === "'") {
          const quote = char
          let value = ''
          i++
          
          while (i < line.length && line[i] !== quote) {
            if (line[i] === '\\' && i + 1 < line.length) {
              i++
              const escaped = line[i]
              switch (escaped) {
                case 'n': value += '\n'; break
                case 't': value += '\t'; break
                case 'r': value += '\r'; break
                case '\\': value += '\\'; break
                case '"': value += '"'; break
                case "'": value += "'"; break
                default: value += escaped
              }
            } else {
              value += line[i]
            }
            i++
          }
          
          if (i < line.length) i++ // Skip closing quote
          
          tokens.push({
            type: 'STRING',
            value: value,
            line: lineNum + 1
          })
          continue
        }
        
        // Numbers
        if (/\d/.test(char)) {
          let value = ''
          while (i < line.length && /[\d.]/.test(line[i])) {
            value += line[i]
            i++
          }
          
          tokens.push({
            type: 'NUMBER',
            value: parseFloat(value),
            line: lineNum + 1
          })
          continue
        }
        
        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(char)) {
          let value = ''
          while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
            value += line[i]
            i++
          }
          
          const tokenType = this.keywords[value] || 'IDENTIFIER'
          tokens.push({
            type: tokenType,
            value: value,
            line: lineNum + 1
          })
          continue
        }
        
        // Two-character operators
        if (i + 1 < line.length) {
          const twoChar = line.substr(i, 2)
          if (this.operators[twoChar]) {
            tokens.push({
              type: this.operators[twoChar],
              value: twoChar,
              line: lineNum + 1
            })
            i += 2
            continue
          }
        }
        
        // Single-character operators and punctuation
        const singleChar = char
        if (this.operators[singleChar]) {
          tokens.push({
            type: this.operators[singleChar],
            value: singleChar,
            line: lineNum + 1
          })
          i++
          continue
        }
        
        // Punctuation
        switch (char) {
          case '(':
            tokens.push({ type: 'LPAREN', value: '(', line: lineNum + 1 })
            break
          case ')':
            tokens.push({ type: 'RPAREN', value: ')', line: lineNum + 1 })
            break
          case '{':
            tokens.push({ type: 'LBRACE', value: '{', line: lineNum + 1 })
            break
          case '}':
            tokens.push({ type: 'RBRACE', value: '}', line: lineNum + 1 })
            break
          case '[':
            tokens.push({ type: 'LBRACKET', value: '[', line: lineNum + 1 })
            break
          case ']':
            tokens.push({ type: 'RBRACKET', value: ']', line: lineNum + 1 })
            break
          case ',':
            tokens.push({ type: 'COMMA', value: ',', line: lineNum + 1 })
            break
          case ';':
            tokens.push({ type: 'SEMICOLON', value: ';', line: lineNum + 1 })
            break
          case '.':
            tokens.push({ type: 'DOT', value: '.', line: lineNum + 1 })
            break
          default:
            throw new Error(`Karakter tidak dikenal: ${char} pada baris ${lineNum + 1}`)
        }
        i++
      }
    }
    
    tokens.push({ type: 'EOF', value: null, line: lines.length })
    return tokens
  }
}

class MinangWebParser {
  constructor() {
    this.lexer = new MinangWebLexer()
    this.tokens = []
    this.current = 0
  }

  parse(input) {
    this.tokens = this.lexer.tokenize(input)
    this.current = 0
    return this.program()
  }

  getCurrentToken() {
    return this.tokens[this.current] || { type: 'EOF', value: null }
  }

  advance() {
    if (this.current < this.tokens.length - 1) {
      this.current++
    }
    return this.getCurrentToken()
  }

  match(expectedType) {
    const token = this.getCurrentToken()
    return token.type === expectedType
  }

  consume(expectedType, errorMessage) {
    const token = this.getCurrentToken()
    if (token.type === expectedType) {
      this.advance()
      return token
    }
    throw new Error(`${errorMessage}. Ditemukan ${token.type} pada baris ${token.line}`)
  }

  program() {
    const statements = []
    
    while (!this.match('EOF')) {
      try {
        statements.push(this.statement())
      } catch (error) {
        // Skip to next statement on error
        while (!this.match('EOF') && !this.match('VAR') && !this.match('FUNCTION') && !this.match('IF')) {
          this.advance()
        }
      }
    }

    return {
      type: 'Program',
      body: statements
    }
  }

  statement() {
    if (this.match('VAR') || this.match('LET') || this.match('CONST')) {
      return this.variableDeclaration()
    }
    if (this.match('FUNCTION')) {
      return this.functionDeclaration()
    }
    if (this.match('IF')) {
      return this.ifStatement()
    }
    if (this.match('WHILE')) {
      return this.whileStatement()
    }
    if (this.match('FOR')) {
      return this.forStatement()
    }
    if (this.match('RETURN')) {
      return this.returnStatement()
    }
    if (this.match('PRINT')) {
      return this.printStatement()
    }
    if (this.match('LBRACE')) {
      return this.blockStatement()
    }
    return this.expressionStatement()
  }

  variableDeclaration() {
    const declarationType = this.getCurrentToken().type
    this.advance()
    
    const name = this.consume('IDENTIFIER', 'Expected variable name').value
    
    let initializer = null
    if (this.match('ASSIGN')) {
      this.advance()
      initializer = this.expression()
    }
    
    return {
      type: 'VariableDeclaration',
      declarationType: declarationType,
      identifier: name,
      initializer: initializer
    }
  }

  functionDeclaration() {
    this.advance() // consume 'karojo'
    
    const name = this.consume('IDENTIFIER', 'Expected function name').value
    
    this.consume('LPAREN', 'Expected (')
    
    const params = []
    if (!this.match('RPAREN')) {
      do {
        params.push(this.consume('IDENTIFIER', 'Expected parameter name').value)
        if (this.match('COMMA')) {
          this.advance()
        } else {
          break
        }
      } while (true)
    }
    
    this.consume('RPAREN', 'Expected )')
    
    const body = this.blockStatement()
    
    return {
      type: 'FunctionDeclaration',
      name: name,
      params: params,
      body: body
    }
  }

  ifStatement() {
    this.advance() // consume 'kalau'
    
    this.consume('LPAREN', 'Expected (')
    const condition = this.expression()
    this.consume('RPAREN', 'Expected )')
    
    const consequent = this.blockStatement()
    
    let alternate = null
    if (this.match('ELSEIF')) {
      this.advance()
      alternate = this.ifStatement()
    } else if (this.match('ELSE')) {
      this.advance()
      alternate = this.blockStatement()
    }
    
    return {
      type: 'IfStatement',
      condition: condition,
      consequent: consequent,
      alternate: alternate
    }
  }

  whileStatement() {
    this.advance() // consume 'selamo'
    
    this.consume('LPAREN', 'Expected (')
    const condition = this.expression()
    this.consume('RPAREN', 'Expected )')
    
    const body = this.blockStatement()
    
    return {
      type: 'WhileStatement',
      condition: condition,
      body: body
    }
  }

  forStatement() {
    this.advance() // consume 'ulang'
    
    this.consume('LPAREN', 'Expected (')
    
    const init = this.match('SEMICOLON') ? null : this.variableDeclaration()
    this.consume('SEMICOLON', 'Expected ;')
    
    const condition = this.match('SEMICOLON') ? null : this.expression()
    this.consume('SEMICOLON', 'Expected ;')
    
    const update = this.match('RPAREN') ? null : this.expression()
    this.consume('RPAREN', 'Expected )')
    
    const body = this.blockStatement()
    
    return {
      type: 'ForStatement',
      init: init,
      condition: condition,
      update: update,
      body: body
    }
  }

  returnStatement() {
    this.advance() // consume 'jadi'
    
    let argument = null
    if (!this.match('EOF') && !this.match('RBRACE')) {
      argument = this.expression()
    }
    
    return {
      type: 'ReturnStatement',
      argument: argument
    }
  }

  printStatement() {
    this.advance() // consume 'cetak'
    
    const argument = this.expression()
    
    return {
      type: 'PrintStatement',
      argument: argument
    }
  }

  blockStatement() {
    this.consume('LBRACE', 'Expected {')
    
    const statements = []
    while (!this.match('RBRACE') && !this.match('EOF')) {
      statements.push(this.statement())
    }
    
    this.consume('RBRACE', 'Expected }')
    
    return {
      type: 'BlockStatement',
      body: statements
    }
  }

  expressionStatement() {
    const expr = this.expression()
    return {
      type: 'ExpressionStatement',
      expression: expr
    }
  }

  expression() {
    return this.assignment()
  }

  assignment() {
    const expr = this.logicalOr()
    
    if (this.match('ASSIGN')) {
      this.advance()
      const value = this.assignment()
      return {
        type: 'AssignmentExpression',
        left: expr,
        right: value
      }
    }
    
    return expr
  }

  logicalOr() {
    let expr = this.logicalAnd()
    
    while (this.match('OR')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.logicalAnd()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  logicalAnd() {
    let expr = this.equality()
    
    while (this.match('AND')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.equality()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  equality() {
    let expr = this.comparison()
    
    while (this.match('EQUAL') || this.match('NOT_EQUAL')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.comparison()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  comparison() {
    let expr = this.addition()
    
    while (this.match('GREATER_THAN') || this.match('GREATER_EQUAL') || 
           this.match('LESS_THAN') || this.match('LESS_EQUAL')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.addition()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  addition() {
    let expr = this.multiplication()
    
    while (this.match('PLUS') || this.match('MINUS')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.multiplication()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  multiplication() {
    let expr = this.unary()
    
    while (this.match('MULTIPLY') || this.match('DIVIDE') || this.match('MODULO')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.unary()
      expr = {
        type: 'BinaryExpression',
        left: expr,
        operator: operator,
        right: right
      }
    }
    
    return expr
  }

  unary() {
    if (this.match('NOT') || this.match('MINUS')) {
      const operator = this.getCurrentToken().value
      this.advance()
      const right = this.unary()
      return {
        type: 'UnaryExpression',
        operator: operator,
        argument: right
      }
    }
    
    return this.call()
  }

  call() {
    let expr = this.primary()
    
    while (true) {
      if (this.match('LPAREN')) {
        this.advance()
        const args = []
        
        if (!this.match('RPAREN')) {
          do {
            args.push(this.expression())
            if (this.match('COMMA')) {
              this.advance()
            } else {
              break
            }
          } while (true)
        }
        
        this.consume('RPAREN', 'Expected )')
        
        expr = {
          type: 'CallExpression',
          callee: expr,
          arguments: args
        }
      } else if (this.match('DOT')) {
        this.advance()
        const name = this.consume('IDENTIFIER', 'Expected property name').value
        expr = {
          type: 'MemberExpression',
          object: expr,
          property: name,
          computed: false
        }
      } else if (this.match('LBRACKET')) {
        this.advance()
        const index = this.expression()
        this.consume('RBRACKET', 'Expected ]')
        expr = {
          type: 'MemberExpression',
          object: expr,
          property: index,
          computed: true
        }
      } else {
        break
      }
    }
    
    return expr
  }

  primary() {
    if (this.match('TRUE')) {
      this.advance()
      return { type: 'Literal', value: true }
    }
    
    if (this.match('FALSE')) {
      this.advance()
      return { type: 'Literal', value: false }
    }
    
    if (this.match('NULL')) {
      this.advance()
      return { type: 'Literal', value: null }
    }
    
    if (this.match('NUMBER')) {
      const value = this.getCurrentToken().value
      this.advance()
      return { type: 'Literal', value: value }
    }
    
    if (this.match('STRING')) {
      const value = this.getCurrentToken().value
      this.advance()
      return { type: 'Literal', value: value }
    }
    
    if (this.match('LBRACKET')) {
      this.advance()
      const elements = []
      
      if (!this.match('RBRACKET')) {
        do {
          elements.push(this.expression())
          if (this.match('COMMA')) {
            this.advance()
          } else {
            break
          }
        } while (true)
      }
      
      this.consume('RBRACKET', 'Expected ]')
      
      return {
        type: 'ArrayExpression',
        elements: elements
      }
    }
    
    if (this.match('IDENTIFIER')) {
      const name = this.getCurrentToken().value
      this.advance()
      return { type: 'Identifier', name: name }
    }
    
    if (this.match('LPAREN')) {
      this.advance()
      const expr = this.expression()
      this.consume('RPAREN', 'Expected )')
      return expr
    }
    
    throw new Error(`Unexpected token: ${this.getCurrentToken().type}`)
  }
}

export class MinangWebCompiler {
  constructor() {
    this.parser = new MinangWebParser()
  }

  compile(sourceCode) {
    return this.parser.parse(sourceCode)
  }

  transpile(sourceCode) {
    const ast = this.compile(sourceCode)
    return this.generateJavaScript(ast)
  }

  generateJavaScript(node) {
    switch (node.type) {
      case 'Program':
        return node.body.map(stmt => this.generateJavaScript(stmt)).join('\n')

      case 'VariableDeclaration':
        const initValue = node.initializer ? ` = ${this.generateJavaScript(node.initializer)}` : ''
        const jsKeyword = this.mapDeclarationType(node.declarationType)
        return `${jsKeyword} ${node.identifier}${initValue};`

      case 'FunctionDeclaration':
        const params = node.params.join(', ')
        const body = this.generateJavaScript(node.body)
        return `function ${node.name}(${params}) ${body}`

      case 'IfStatement':
        let result = `if (${this.generateJavaScript(node.condition)}) ${this.generateJavaScript(node.consequent)}`
        if (node.alternate) {
          if (node.alternate.type === 'IfStatement') {
            result += ` else ${this.generateJavaScript(node.alternate)}`
          } else {
            result += ` else ${this.generateJavaScript(node.alternate)}`
          }
        }
        return result

      case 'WhileStatement':
        return `while (${this.generateJavaScript(node.condition)}) ${this.generateJavaScript(node.body)}`

      case 'ForStatement':
        const forInit = node.init ? this.generateJavaScript(node.init).replace(';', '') : ''
        const condition = node.condition ? this.generateJavaScript(node.condition) : ''
        const update = node.update ? this.generateJavaScript(node.update) : ''
        return `for (${forInit}; ${condition}; ${update}) ${this.generateJavaScript(node.body)}`

      case 'ReturnStatement':
        const arg = node.argument ? ` ${this.generateJavaScript(node.argument)}` : ''
        return `return${arg};`

      case 'PrintStatement':
        return `console.log(${this.generateJavaScript(node.argument)});`

      case 'BlockStatement':
        const statements = node.body.map(stmt => this.generateJavaScript(stmt)).join('\n  ')
        return `{\n  ${statements}\n}`

      case 'ExpressionStatement':
        return `${this.generateJavaScript(node.expression)};`

      case 'MemberExpression':
        if (node.computed) {
          return `${this.generateJavaScript(node.object)}[${this.generateJavaScript(node.property)}]`
        } else {
          return `${this.generateJavaScript(node.object)}.${node.property}`
        }

      case 'AssignmentExpression':
        return `${this.generateJavaScript(node.left)} = ${this.generateJavaScript(node.right)}`

      case 'BinaryExpression':
        const left = this.generateJavaScript(node.left)
        const right = this.generateJavaScript(node.right)
        return `(${left} ${this.mapOperator(node.operator)} ${right})`

      case 'UnaryExpression':
        const operand = this.generateJavaScript(node.argument)
        return `(${this.mapOperator(node.operator)}${operand})`

      case 'CallExpression':
        const callee = this.generateJavaScript(node.callee)
        const args = node.arguments.map(arg => this.generateJavaScript(arg)).join(', ')
        return `${callee}(${args})`

      case 'ArrayExpression':
        const elements = node.elements.map(elem => this.generateJavaScript(elem)).join(', ')
        return `[${elements}]`

      case 'Identifier':
        return node.name

      case 'Literal':
        if (typeof node.value === 'string') {
          return `"${node.value.replace(/"/g, '\\"')}"`
        }
        return String(node.value)

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  mapDeclarationType(type) {
    switch (type) {
      case 'VAR': return 'var'
      case 'LET': return 'let'
      case 'CONST': return 'const'
      default: return 'var'
    }
  }

  mapOperator(operator) {
    switch (operator) {
      case '&&': return '&&'
      case '||': return '||'
      case '!': return '!'
      default: return operator
    }
  }
}
