import { useState } from 'react'
import { MinangWebCompiler } from '../utils/MinangWebCompiler'

const MinangCompiler = () => {
  const [sourceCode, setSourceCode] = useState(`// Welcome to MinangScript Web Compiler!
// Philosophy: Alam Takambang Jadi Guru (Nature is Our Teacher)

cetak "Welcome to MinangScript!"
cetak "Let's learn programming with Minangkabau philosophy"

// Basic variables
buek name = "MinangScript"
buek version = "2.0.0" 
buek philosophy = "Gotong Royong"

// Greeting function
karojo greet(nama) {
    jadi "Welcome, " + nama + "! Let's work together."
}

// Display information
cetak "Name: " + name
cetak "Version: " + version
cetak "Philosophy: " + philosophy
cetak greet("Friend")`)

  const [compiledCode, setCompiledCode] = useState('')
  const [error, setError] = useState('')
  const [consoleOutput, setConsoleOutput] = useState('')
  const [compiler] = useState(new MinangWebCompiler())

  const handleCompile = () => {
    try {
      setError('')
      const compiled = compiler.transpile(sourceCode)
      setCompiledCode(compiled)
    } catch (err) {
      setError(err.message)
      setCompiledCode('')
    }
  }

  const handleRun = () => {
    if (!compiledCode) {
      handleCompile()
      return
    }

    try {
      setError('')
      setConsoleOutput('')
      
      // Capture console.log output
      const originalLog = console.log
      let output = ''
      
      console.log = (...args) => {
        output += args.join(' ') + '\n'
      }

      // Execute the compiled JavaScript
      eval(compiledCode)
      
      // Restore original console.log
      console.log = originalLog
      
      setConsoleOutput(output)
    } catch (err) {
      setError(`Runtime Error: ${err.message}`)
      console.log = console.log // Restore in case of error
    }
  }

  const loadExample = (example) => {
    setSourceCode(example)
    setCompiledCode('')
    setError('')
    setConsoleOutput('')
  }

  const examples = {
    'Hello World': `// Simple MinangScript program
cetak "Welcome to MinangScript!"
buek name = "Friend"
cetak "Hello, " + name + "!"`,

    'Variables & Functions': `// Variable and function example
buek number1 = 10
buek number2 = 20
ambiak result = 0

karojo add(a, b) {
    jadi a + b
}

result = add(number1, number2)
cetak "Result: " + result`,

    'Conditions': `// Conditional example
buek age = 25

kalau (age >= 18) {
    cetak "Adult"
} tapi kalau (age >= 13) {
    cetak "Teenager"
} lainnya {
    cetak "Child"
}`,

    'Loops': `// Loop example
cetak "Counting from 1 to 5:"

ulang (buek i = 1; i <= 5; i = i + 1) {
    cetak "Number: " + i
}

cetak "Done!"`,

    'Arrays': `// Array example
buek fruits = ["apple", "orange", "mango"]
buek numbers = [1, 2, 3, 4, 5]

cetak "First fruit: " + fruits[0]
cetak "Number of fruits: " + fruits.length

ulang (buek i = 0; i < fruits.length; i = i + 1) {
    cetak "Fruit " + (i + 1) + ": " + fruits[i]
}`
  }

  return (
    <div>
      <div className="compiler-container">
        <div className="editor-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              📝 MinangScript Code
            </h3>
            <div>
              <button className="compile-button" onClick={handleCompile}>
                Compile
              </button>
              <button className="run-button" onClick={handleRun}>
                Run Code
              </button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Write your MinangScript code here..."
            spellCheck={false}
          />
        </div>

        <div className="editor-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              ⚙️ Compiled JavaScript
            </h3>
          </div>
          <div className="output-area">
            {compiledCode || 'Compiled JavaScript will appear here...'}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {consoleOutput && (
        <div className="editor-panel">
          <h3 className="panel-title">🖥️ Console Output</h3>
          <div className="console-output">
            {consoleOutput}
          </div>
        </div>
      )}

      <div className="examples-section">
        <h3>📚 MinangScript Examples</h3>
        <p>Click one of the examples below to see MinangScript code in action:</p>
        <div className="example-buttons">
          {Object.keys(examples).map((name) => (
            <button
              key={name}
              className="example-button"
              onClick={() => loadExample(examples[name])}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="syntax-section">
        <h3>📖 MinangScript Syntax Reference</h3>
        <p>Learn the MinangScript keywords inspired by Minangkabau language and philosophy:</p>
        
        <div className="syntax-tables">
          <div className="syntax-table">
            <h4>🔤 Variables & Functions</h4>
            <table>
              <thead>
                <tr>
                  <th>MinangScript</th>
                  <th>JavaScript</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>buek</code></td>
                  <td><code>var</code></td>
                  <td>Create variable</td>
                </tr>
                <tr>
                  <td><code>ambiak</code></td>
                  <td><code>let</code></td>
                  <td>Let variable declaration</td>
                </tr>
                <tr>
                  <td><code>tagak</code></td>
                  <td><code>const</code></td>
                  <td>Constant declaration</td>
                </tr>
                <tr>
                  <td><code>karojo</code></td>
                  <td><code>function</code></td>
                  <td>Function definition (means "work")</td>
                </tr>
                <tr>
                  <td><code>jadi</code></td>
                  <td><code>return</code></td>
                  <td>Return statement (means "become")</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="syntax-table">
            <h4>🎯 Control Flow</h4>
            <table>
              <thead>
                <tr>
                  <th>MinangScript</th>
                  <th>JavaScript</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>kalau</code></td>
                  <td><code>if</code></td>
                  <td>If statement (means "if")</td>
                </tr>
                <tr>
                  <td><code>tapi kalau</code></td>
                  <td><code>else if</code></td>
                  <td>Else if statement</td>
                </tr>
                <tr>
                  <td><code>lainnya</code></td>
                  <td><code>else</code></td>
                  <td>Else statement</td>
                </tr>
                <tr>
                  <td><code>selamo</code></td>
                  <td><code>while</code></td>
                  <td>While loop (means "continuously")</td>
                </tr>
                <tr>
                  <td><code>ulang</code></td>
                  <td><code>for</code></td>
                  <td>For loop (means "repeat")</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="syntax-table">
            <h4>💬 Input/Output & Values</h4>
            <table>
              <thead>
                <tr>
                  <th>MinangScript</th>
                  <th>JavaScript</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cetak</code></td>
                  <td><code>console.log</code></td>
                  <td>Print statement (means "print")</td>
                </tr>
                <tr>
                  <td><code>bana</code></td>
                  <td><code>true</code></td>
                  <td>Boolean true (means "real")</td>
                </tr>
                <tr>
                  <td><code>salah</code></td>
                  <td><code>false</code></td>
                  <td>Boolean false (means "wrong")</td>
                </tr>
                <tr>
                  <td><code>kosong</code></td>
                  <td><code>null</code></td>
                  <td>Null value (means "empty")</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="syntax-table">
            <h4>🔢 Operators</h4>
            <table>
              <thead>
                <tr>
                  <th>Operator</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>+</code></td>
                  <td>Addition / String concatenation</td>
                  <td><code>5 + 3</code> or <code>"Hello" + "World"</code></td>
                </tr>
                <tr>
                  <td><code>-</code></td>
                  <td>Subtraction</td>
                  <td><code>10 - 5</code></td>
                </tr>
                <tr>
                  <td><code>*</code></td>
                  <td>Multiplication</td>
                  <td><code>4 * 3</code></td>
                </tr>
                <tr>
                  <td><code>/</code></td>
                  <td>Division</td>
                  <td><code>12 / 4</code></td>
                </tr>
                <tr>
                  <td><code>==</code></td>
                  <td>Equal comparison</td>
                  <td><code>age == 18</code></td>
                </tr>
                <tr>
                  <td><code>!=</code></td>
                  <td>Not equal comparison</td>
                  <td><code>name != "John"</code></td>
                </tr>
                <tr>
                  <td><code>&gt;</code>, <code>&lt;</code></td>
                  <td>Greater/Less than</td>
                  <td><code>score &gt; 80</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="syntax-examples">
          <h4>💡 Quick Examples</h4>
          <div className="example-grid">
            <div className="syntax-example">
              <h5>Variable Declaration</h5>
              <pre><code>buek name = "MinangScript"
ambiak age = 25
tagak PI = 3.14159</code></pre>
            </div>
            
            <div className="syntax-example">
              <h5>Function</h5>
              <pre><code>{`karojo greet(name) {
    jadi "Hello, " + name
}`}</code></pre>
            </div>
            
            <div className="syntax-example">
              <h5>Condition</h5>
              <pre><code>{`kalau (age >= 18) {
    cetak "Adult"
} lainnya {
    cetak "Minor"
}`}</code></pre>
            </div>
            
            <div className="syntax-example">
              <h5>Loop</h5>
              <pre><code>{`ulang (buek i = 1; i <= 5; i = i + 1) {
    cetak "Number: " + i
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinangCompiler
