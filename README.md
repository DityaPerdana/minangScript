# MinangScript 🏔️

*Bahasa pemrograman berbasis JavaScript dengan filosofi Minangkabau*

A complete programming language inspired by Minangkabau culture, featuring authentic Minangkabau keywords and cultural philosophy integration.

![Version](https://img.shields.io/badge/version-1.0.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![NPM](https://img.shields.io/npm/v/minangscript?color=red)
[![Build Status](https://img.shields.io/badge/tests-19%2F19-brightgreen)](tests/)

## 🚀 Quick Start

### Installation

```bash
# Global installation (Recommended)
npm install -g minangscript

# Local installation
npm install minangscript

# Verify installation
minang help
```

### Usage

```bash
# Create a new project
minang new myproject

# Run a MinangScript file
minang run hello.minang

# Build to JavaScript
minang build input.minang output.js

# Interactive REPL
minang repl

# Change language for CLI messages
minang lang en    # English (default for international users)
minang lang id    # Indonesian (default for Indonesian users)
```

### Your First MinangScript Program

```minang
// hello.minang
cetak "Salamat datang ka dunia MinangScript!"

buek nama = "Programmer"
karojo sambutan(nama) {
    jadi "Halo, " + nama + "! Selamat belajar MinangScript."
}

cetak sambutan(nama)
cetak.pesan "🏔️ Filosofi Minangkabau dalam kode!"
```

## ✨ Features

### 🔤 **Authentic Minangkabau Keywords**
- `buek` - Variable declaration (var)
- `ambiak` - Let declaration  
- `tagak` - Const declaration
- `karojo` - Function definition
- `jadi` - Return statement
- `cetak` - Enhanced print/output system
- `kalau` / `kalauLain` / `lain` - Conditional statements
- `selamo` - While loops (continuous)
- `untuak` - For loops
- `baronti` - Break statement
- `lanjuik` - Continue statement

### 🖨️ **Enhanced Console System**
MinangScript provides a comprehensive console system with 7 different output methods:

- `cetak()` - Standard output (console.log)
- `cetak.pesan()` - Info messages (console.info)
- `cetak.rusak()` - Error messages (console.error)
- `cetak.ingek()` - Warning messages (console.warn)
- `cetak.peringatan()` - Alternative warning (console.warn)
- `cetak.urai()` - Debug information (console.debug)
- `cetak.tabel()` - Table display (console.table)

### 🔧 **Data Type Constructors**
Built-in Minangkabau-named type conversion functions:

- `angko(value)` - Convert to Number
- `kato(value)` - Convert to String  
- `kabanaran(value)` - Convert to Boolean

### 🌟 **Cultural Philosophy Integration**
MinangScript integrates four core Minangkabau principles:

1. **🤝 Gotong Royong** - Collaborative programming functions
2. **🗣️ Musyawarah Mufakat** - Consensus-based decision making utilities
3. **🌿 Alam Takambang Jadi Guru** - Learning from nature and patterns
4. **⚖️ Adat Basandi Syarak** - Ethical coding practices

### 🛠️ **Complete Development Environment**
- Full lexer, parser, compiler, and runtime
- JavaScript transpilation and interoperability  
- Comprehensive CLI tools with internationalization (English/Indonesian)
- Interactive REPL with bilingual support
- Built-in testing framework (19/19 tests passing)
- Code formatter and validator
- Zero dependencies package

## 🌍 International Accessibility

MinangScript is designed to be accessible to developers worldwide while preserving Minangkabau cultural authenticity:

### 🗣️ **Bilingual CLI Support**
- **English** - Default for international users
- **Indonesian** - Default for Indonesian users  
- **Auto-detection** - Detects system language automatically
- **Manual switching** - `minang lang en` or `minang lang id`

### 🌐 **What's Translated**
- ✅ CLI messages and help text
- ✅ Error messages and warnings
- ✅ REPL instructions and prompts
- ✅ Build and validation output
- ❌ MinangScript keywords (remain authentically Minangkabau)

### 🎯 **Language Detection**
```bash
# Automatic detection based on:
# - System environment variables (LANG, LANGUAGE)
# - Timezone (Asia/Jakarta indicates Indonesian)
# - Defaults to English for broader accessibility

# Manual override:
minang lang en    # Switch to English
minang lang id    # Switch to Indonesian
minang lang       # Show language help
```

This ensures that international developers can use MinangScript effectively while maintaining the cultural integrity of the programming language itself.

## 📚 Complete Language Dictionary

### **Core Language Keywords**

| **MinangScript** | **JavaScript** | **Category** | **Description** | **Example** |
|------------------|----------------|--------------|-----------------|-------------|
| `buek` | `var` | Variable Declaration | Variable declaration (mutable) | `buek nama = "Ali"` |
| `ambiak` | `let` | Variable Declaration | Block-scoped variable | `ambiak umur = 25` |
| `tagak` | `const` | Variable Declaration | Constant declaration | `tagag PI = 3.14` |
| `karojo` | `function` | Function Definition | Function declaration | `karojo tambah(a, b) { jadi a + b }` |
| `jadi` | `return` | Return Statement | Return from function | `jadi hasil` |
| `kalau` | `if` | Conditional | If statement | `kalau umur >= 18 { ... }` |
| `kalauLain` | `else if` | Conditional | Else if statement | `kalauLain umur < 13 { ... }` |
| `lain` | `else` | Conditional | Else statement | `lain { ... }` |
| `selamo` | `while` | Loop | While loop (continuous) | `selamo i < 10 { ... }` |
| `untuak` | `for` | Loop | For loop | `untuak i = 0; i < 10; i++ { ... }` |
| `baronti` | `break` | Control Flow | Break statement | `baronti` |
| `lanjuik` | `continue` | Control Flow | Continue statement | `lanjuik` |

### **Boolean Values & Null**

| **MinangScript** | **JavaScript** | **Type** | **Description** |
|------------------|----------------|----------|-----------------|
| `bana` | `true` | Boolean | True value |
| `salah` | `false` | Boolean | False value |
| `kosong` | `null` | Null | Null/empty value |

### **Cultural Philosophy Functions**

| **MinangScript** | **Philosophy** | **Description** | **Example** |
|------------------|----------------|-----------------|-------------|
| `gotongRoyong(...)` | Gotong Royong | Cooperative work pattern | `gotongRoyong("task1", "task2")` |
| `musyawarah(topic, participants)` | Musyawarah Mufakat | Consensus decision making | `musyawarah("budget", "team")` |
| `alamTakambang(lesson)` | Alam Takambang Jadi Guru | Learning from nature | `alamTakambang("patience")` |
| `adatBasandi(action)` | Adat Basandi Syarak | Ethical practices | `adatBasandi("decision")` |

## 📝 Example Code

### Basic Syntax
```minang
// Variable declarations
buek nama = "MinangScript"
ambiak versi = "1.0.1"  
tagak filosofi = "Alam Takambang Jadi Guru"

// Function with cultural wisdom
karojo sambutan(nama) {
    jadi "Salamat datang, " + nama + "!"
}

// Enhanced console output
cetak sambutan("Programmer")
cetak.pesan "Informasi: Bahasa pemrograman dengan budaya Minang"
cetak.ingek "Perhatian: Selalu utamakan gotong royong"

// Control flow with Minangkabau terms
kalau versi == "1.0.1" {
    cetak "🎉 Versi pertama MinangScript telah rilis!"
} lain {
    cetak "Versi dalam pengembangan"
}

// Loops with continuous philosophy
buek i = 0
selamo i < 3 {
    cetak "Iterasi ke-" + kato(i)
    i = i + 1
}
```

### Advanced Features
```minang
// Data type constructors
buek angka = angko("123.45")    // 123.45
buek teks = kato(789)           // "789"
buek benar = kabanaran(1)       // true

// Cultural philosophy functions
gotongRoyong("membuat aplikasi", "debugging", "testing")
buek keputusan = musyawarah("fitur baru", ["tim", "pengguna"])
alamTakambang("pelajaran dari alam")
adatBasandi("keputusan etis")

// Enhanced debugging
cetak.urai "Debug: Variabel angka = " + kato(angka)
cetak.tabel [{nama: "MinangScript", versi: "1.0.1", filosofi: "Minangkabau"}]
```

## 🧪 Testing

The language includes a comprehensive test suite covering all features:

```bash
# Run all tests
npm test

# Test output
📊 Test Summary:
✅ Berhasil: 19/19 
❌ Gagal: 0/19
📈 Coverage: 100%
🎉 All tests passing successfully!
```

**Test Categories:**
- ✅ Core keyword parsing and execution
- ✅ Enhanced console methods functionality
- ✅ Data type constructors validation
- ✅ Cultural philosophy functions
- ✅ Variable scoping and function calls
- ✅ Control flow and loop constructs
- ✅ JavaScript transpilation accuracy
- ✅ Error handling and recovery

## 📚 Examples

The project includes comprehensive examples demonstrating all features:

- `examples/hello.minang` - Basic introduction
- `examples/gotong-royong.minang` - Collaborative programming patterns
- `examples/nagari-simple.minang` - Digital village management
- `examples/sistem-nagari.minang` - Complete nagari system
- `examples/test-keywords.minang` - All keyword validation
- `examples/fitur-lengkap.minang` - Complete feature showcase
- `examples/kalkulator.minang` - Calculator with cultural elements
- `examples/showcase-lengkap.minang` - Comprehensive demonstration

## 🏗️ Language Architecture

### Components
- **Lexer** (`src/lexer/MinangLexer.js`) - Tokenization with cultural keywords
- **Parser** (`src/parser/MinangParser.js`) - AST generation with Minangkabau syntax
- **Compiler** (`src/compiler/MinangCompiler.js`) - JavaScript transpilation
- **Runtime** (`src/runtime/MinangRuntime.js`) - Execution engine with cultural functions
- **Utils** (`src/utils/MinangUtils.js`) - Helper functions and utilities

### CLI Tools
- `index.js` - Main CLI interface
- `build.js` - Build system
- `dev.js` - Development tools

### Available Commands
- `minang run <file>` - Execute MinangScript file
- `minang build <input> <output>` - Transpile to JavaScript
- `minang new <project>` - Create new project
- `minang repl` - Interactive development environment
- `minang help` - Show help information
- `minang lang <en|id>` - Switch CLI language (English/Indonesian)

## 🌍 Cultural Philosophy

MinangScript integrates four core Minangkabau principles into programming:

### 1. **🤝 Gotong Royong** - *Mutual Cooperation*
Encourages collaborative programming patterns where functions work together to solve complex problems.

### 2. **🗣️ Musyawarah Mufakat** - *Consensus Building*
Decision-making functions that consider multiple inputs and reach consensus through discussion.

### 3. **🌿 Alam Takambang Jadi Guru** - *Learning from Nature*
Adaptive programming patterns that learn from data patterns and natural processes.

### 4. **⚖️ Adat Basandi Syarak** - *Ethics-Based Foundation*
Ensuring that all code follows ethical guidelines and moral principles.

## 📦 NPM Package Information

MinangScript is available as a global NPM package:

- **Package URL**: https://www.npmjs.com/package/minangscript
- **Version**: 1.0.1
- **Publisher**: radityaperdana
- **Package Size**: 28.1 kB
- **Unpacked Size**: 116.5 kB
- **Dependencies**: None (zero dependencies!)
- **License**: MIT

### Installation Commands
```bash
# Global installation (recommended)
npm install -g minangscript

# Local installation
npm install minangscript

# Verify installation
minang help
minang run examples/hello.minang
```

## 🔧 VS Code Extension

MinangScript has a comprehensive VS Code extension available:

- **Extension Name**: MinangScript IntelliSense
- **Publisher**: dtyminang
- **Marketplace**: https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense

### Extension Features
- ✅ Complete syntax highlighting
- ✅ IntelliSense with auto-completion
- ✅ Hover documentation for keywords
- ✅ Code snippets for common patterns
- ✅ Cultural philosophy keyword support
- ✅ File icon theme for `.minang` files
- ✅ Integrated commands for running and compiling

### Installation
```bash
# Install via VS Code marketplace
code --install-extension dtyminang.minangscript-intellisense

# Or search "MinangScript IntelliSense" in VS Code Extensions
```

## 🛠️ Development

### Setting Up Development Environment
```bash
# Clone the repository
git clone https://github.com/DityaPerdana/minangScript.git
cd minangScript

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Start development mode
npm run dev
```

### Project Structure
```
minangScript/
├── src/
│   ├── lexer/          # Tokenization
│   ├── parser/         # AST generation
│   ├── compiler/       # JavaScript transpilation
│   ├── runtime/        # Execution engine
│   └── utils/          # Helper functions
├── examples/           # Example programs
├── tests/             # Test suite
├── minangscript-intellisense/  # VS Code extension
└── docs/              # Documentation
```

## 🤝 Contributing

MinangScript welcomes contributions in the spirit of **Gotong Royong**:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Implement with cultural sensitivity** - respect Minangkabau values
4. **Add tests** for new features
5. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
6. **Push to the branch** (`git push origin feature/AmazingFeature`)
7. **Submit pull request** for **Musyawarah** (community discussion)

### Contributing Guidelines
- Follow Minangkabau cultural principles
- Maintain 100% test coverage
- Write clear, documented code
- Respect the philosophical foundations
- Participate in community discussions

## 📈 Changelog

### **[1.0.2] - 2025-06-23**
- 🌍 **International Accessibility** - Added bilingual CLI support (English/Indonesian)
- ✅ **Persistent Language Settings** - Language preferences saved between sessions
- ✅ **Auto-detection** - Automatic language detection based on system locale
- ✅ **Enhanced UX** - Improved accessibility for international developers
- ✅ **Cultural Preservation** - MinangScript keywords remain authentically Minangkabau

### **[1.0.1] - 2025-06-23**
- 🎉 **NPM Publication** - Available globally via `npm install -g minangscript`
- ✅ **VS Code Extension** - Complete IntelliSense support published
- ✅ **Documentation Consolidation** - Single comprehensive README
- ✅ **Zero Dependencies** - Lightweight package
- ✅ **Enhanced Testing** - 19/19 tests passing

### **[1.0.0] - 2025-06-22** 
- 🎉 **Initial Release** - Complete MinangScript implementation
- ✅ **Complete Language Core** - All 12 keywords implemented
- ✅ **Enhanced Console System** - 7 different output methods
- ✅ **Data Type Constructors** - 3 conversion functions
- ✅ **Cultural Philosophy Integration** - 4 Minangkabau principles
- ✅ **CLI Tools** - Complete command-line interface
- ✅ **JavaScript Interoperability** - Full transpilation support
- ✅ **Comprehensive Testing** - 100% test coverage
- ✅ **Rich Examples** - 16 example programs
- ✅ **Complete Documentation** - Extensive guides and references

#### **Language Features Added in 1.0.0**
- **Syntax Highlighting**: Full support for MinangScript syntax
- **Auto-completion**: Smart suggestions for keywords and functions
- **Hover Documentation**: Detailed explanations for all constructs
- **Code Snippets**: Pre-built templates for cultural programming patterns
- **Command Integration**: Direct execution and compilation from CLI
- **Cultural Keywords**: Special support for Minangkabau philosophy-based programming

## 🔗 Links & Resources

- **📦 NPM Package**: https://www.npmjs.com/package/minangscript
- **🐙 GitHub Repository**: https://github.com/DityaPerdana/minangScript
- **🔌 VS Code Extension**: https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense
- **📚 Documentation**: Complete README and dictionary table included
- **🌟 Examples**: 16 example programs demonstrating all features

## 📜 License

This project honors Minangkabau cultural values while remaining open source under the MIT License.

## 🙏 Acknowledgments

- **Minangkabau Community** for cultural wisdom and philosophy
- **JavaScript Community** for technical foundation
- **Open Source Community** for inspiration and support
- **VS Code Team** for excellent extension APIs

---

## 🎉 **Achievement Summary**

✅ **Complete Language Implementation** - All 41 language elements working  
✅ **NPM Publication** - Available globally via `npm install minangscript`  
✅ **VS Code Extension** - Full IntelliSense support published  
✅ **GitHub Repository** - Open source with comprehensive documentation  
✅ **Dictionary Table** - Complete MinangScript ↔ JavaScript mapping  
✅ **CLI Tools** - Professional command-line interface  
✅ **Zero Dependencies** - Lightweight and fast  
✅ **Cultural Integration** - Authentic Minangkabau philosophy  
✅ **Test Coverage** - 19/19 passing test suite  
✅ **Production Ready** - v1.0.1 stable release  

---

**"Alam Takambang Jadi Guru"** - *Nature unfolds to become our teacher*

🏔️ **Built with Minangkabau wisdom and modern technology**

*Integrating traditional wisdom with modern programming for ethical and collaborative software development.*
- `cetak()` - Standard output
- `cetak.pesan()` - Info messages  
- `cetak.ingek()` - Warnings
- `cetak.urai()` - Debug information
- `cetak.rusak()` - Error messages

### 🌟 **Cultural Philosophy Integration**
- **Gotong Royong** - Collaborative programming functions
- **Musyawarah Mufakat** - Consensus-based utilities
- **Alam Takambang Jadi Guru** - Learning from patterns
- **Adat Basandi Syarak** - Ethical coding practices

### 🛠️ **Complete Development Environment**
- Full lexer, parser, compiler, and runtime
- JavaScript transpilation and interoperability  
- Comprehensive CLI tools
- Interactive REPL
- Built-in testing framework
- Code formatter and validator

## 📝 Example Code

```minang
// Hello World dengan filosofi Minangkabau
cetak "Salamat datang ka MinangScript!"

// Deklarasi variabel
buek nama = "MinangScript"
ambiak versi = "1.0.0"  
tagak filosofi = "Alam Takambang Jadi Guru"

// Fungsi dengan kearifan lokal
karojo sambutan(nama) {
    jadi "Salamat datang, " + nama + "!"
}

// Output dengan sistem cetak enhanced
cetak sambutan("Programmer")
cetak.pesan "Informasi: Bahasa pemrograman dengan budaya Minang"
cetak.ingek "Perhatian: Selalu utamakan gotong royong"

// Kontrol alur dengan istilah Minang
kalau versi == "1.0.0" {
    cetak "🎉 Versi pertama MinangScript telah rilis!"
} lain {
    cetak "Versi dalam pengembangan"
}
```

## 🧪 Testing

The language includes a comprehensive test suite covering all features:

```bash
# Run all tests
npm test

# Results: 17/17 tests passing ✅
```

## 📚 Examples

- `examples/hello.minang` - Basic introduction
- `examples/gotong-royong.minang` - Collaborative programming patterns
- `examples/nagari-simple.minang` - Digital village management
- `examples/sistem-nagari.minang` - Complete nagari system
- `examples/test-keywords.minang` - All keyword validation
- `examples/fitur-lengkap.minang` - Complete feature showcase

## 🏗️ Language Architecture

### Components
- **Lexer** (`src/lexer/MinangLexer.js`) - Tokenization
- **Parser** (`src/parser/MinangParser.js`) - AST generation  
- **Compiler** (`src/compiler/MinangCompiler.js`) - JavaScript transpilation
- **Runtime** (`src/runtime/MinangRuntime.js`) - Execution engine
- **Utils** (`src/utils/MinangUtils.js`) - Helper functions

### CLI Tools
- `index.js` - Main CLI interface
- `build.js` - Build system
- `dev.js` - Development tools

## 🌍 Cultural Philosophy

MinangScript integrates four core Minangkabau principles:

1. **🤝 Gotong Royong** - Mutual cooperation in problem-solving
2. **🗣️ Musyawarah Mufakat** - Consensus-based decision making  
3. **🌿 Alam Takambang Jadi Guru** - Learning from nature and patterns
4. **📜 Adat Basandi Syarak** - Ethics-based development practices

## 🤝 Contributing

MinangScript welcomes contributions in the spirit of **Gotong Royong**:

1. Fork the repository
2. Create your feature branch
3. Implement with cultural sensitivity
4. Add tests for new features
5. Submit pull request for **Musyawarah**

## 📜 License

This project honors Minangkabau cultural values while remaining open source.

---

**"Alam Takambang Jadi Guru"** - *Nature unfolds to become our teacher*

🏔️ **Built with Minangkabau wisdom and modern technology**
fungsi gotongRoyong(kerja) {
    // Collaborative work function
    baliak kerja + " dilakukan bersama"
}

// Conditional with local wisdom
kalau umur >= 17 {
    tampilkan namo + " sudah dewasa"
} lain {
    tampilkan namo + " masih muda"
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Start development server
npm run dev
```

## Contributing

We welcome contributions following the Minangkabau principle of **Musyawarah Mufakat** (consensus-based decision making). Please read our contributing guidelines and join our community discussions.

## License

MIT License - reflecting the open and sharing nature of Minangkabau culture.
