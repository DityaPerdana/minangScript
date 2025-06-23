# MinangScript 🏔️

> *A complete programming language inspired by Minangkabau culture, featuring authentic Minangkabau keywords and cultural philosophy integration.*

[![Version](https://img.shields.io/badge/version-1.1.1-blue)](https://www.npmjs.com/package/minangscript)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![NPM](https://img.shields.io/npm/v/minangscript?color=red)](https://www.npmjs.com/package/minangscript)
[![Build Status](https://img.shields.io/badge/tests-19%2F19-brightgreen)](tests/)
[![Downloads](https://img.shields.io/npm/dm/minangscript)](https://www.npmjs.com/package/minangscript)

## 🌟 What is MinangScript?

MinangScript is a revolutionary programming language that bridges traditional Minangkabau wisdom with modern software development. Built on JavaScript foundations, it integrates authentic Minangkabau keywords and cultural philosophies into a complete programming environment.

**Key Highlights:**
- 🏔️ **Authentic Minangkabau Keywords** - Programming in your native language
- 🌍 **International Ready** - Bilingual CLI support (English/Indonesian)
- 🚀 **Zero Dependencies** - Lightweight and fast
- 🎯 **Production Ready** - v1.1.1 stable release with comprehensive testing
- 🔧 **Complete Ecosystem** - CLI tools, VS Code extension, and NPM package

---

## 🚀 Quick Start

### Installation

```bash
# Global installation (Recommended)
npm install -g minangscript

# Verify installation
minang help
```

### Your First Program

Create `hello.minang`:

```minang
// Traditional Minangkabau greeting
cetak "Salamat datang ka dunia MinangScript!"

buek nama = "Programmer"
karojo sambutan(nama) {
    jadi "Halo, " + nama + "! Alam takambang jadi guru."
}

cetak sambutan(nama)
cetak.pesan "🏔️ Filosofi Minangkabau dalam kode!"
```

Run your program:

```bash
minang run hello.minang
```

---

## ✨ Core Features

### 🔤 Authentic Minangkabau Keywords

MinangScript preserves Minangkabau linguistic heritage through carefully chosen keywords:

```minang
buek angka = 42           // Variable declaration
ambiak teks = "Hello"     // Block-scoped variable
tagak PI = 3.14159        // Constant declaration

karojo hitung(a, b) {     // Function definition
    jadi a + b            // Return statement
}

kalau angka > 0 {         // Conditional statements
    cetak "Positif"
} kalauLain angka < 0 {
    cetak "Negatif"  
} lain {
    cetak "Nol"
}
```

### 🖨️ Enhanced Console System

Seven specialized output methods for different purposes:

```minang
cetak "Standard output"
cetak.pesan "Informational message"
cetak.ingek "Warning message"
cetak.peringatan "Alert message"
cetak.rusak "Error message"
cetak.urai "Debug information"
cetak.tabel [{nama: "Ali", umur: 25}]
```

### 🔧 Type Conversion Functions

Built-in Minangkabau-named type constructors:

```minang
buek angka = angko("123.45")     // Convert to Number
buek teks = kato(789)            // Convert to String
buek benar = kabanaran(1)        // Convert to Boolean
```

### 🌿 Cultural Philosophy Integration

Four core Minangkabau principles integrated into programming:

```minang
// 1. Gotong Royong (Mutual Cooperation)
gotongRoyong("task1", "task2", "task3")

// 2. Musyawarah Mufakat (Consensus Building)
buek keputusan = musyawarah("topic", ["participant1", "participant2"])

// 3. Alam Takambang Jadi Guru (Learning from Nature)
alamTakambang("patience from flowing water")

// 4. Adat Basandi Syarak (Ethics-Based Foundation)
adatBasandi("ethical decision making")
```

---

## 🌍 International Accessibility

MinangScript is designed for global developers while preserving cultural authenticity:

### 🗣️ Bilingual CLI Support

```bash
# Automatic language detection
minang help

# Manual language switching
minang lang en    # English
minang lang id    # Indonesian

# Language-specific features
minang new myproject    # Creates project with localized templates
minang repl            # Interactive environment in your language
```

**What's Translated:**
- ✅ CLI messages and help text
- ✅ Error messages and warnings  
- ✅ REPL instructions
- ✅ Build output
- ❌ MinangScript keywords (remain authentically Minangkabau)

---

## 📚 Complete Language Reference

### Core Keywords

| MinangScript | JavaScript | Purpose | Example |
|-------------|------------|---------|---------|
| `buek` | `var` | Variable declaration | `buek nama = "Ali"` |
| `ambiak` | `let` | Block-scoped variable | `ambiak umur = 25` |
| `tagak` | `const` | Constant declaration | `tagak PI = 3.14` |
| `karojo` | `function` | Function definition | `karojo tambah(a, b) { jadi a + b }` |
| `jadi` | `return` | Return statement | `jadi hasil` |
| `kalau` | `if` | Conditional | `kalau umur >= 18 { ... }` |
| `kalauLain` | `else if` | Else if | `kalauLain umur < 13 { ... }` |
| `lain` | `else` | Else | `lain { ... }` |
| `selamo` | `while` | While loop | `selamo i < 10 { ... }` |
| `untuak` | `for` | For loop | `untuak i = 0; i < 10; i++ { ... }` |
| `baronti` | `break` | Break statement | `baronti` |
| `lanjuik` | `continue` | Continue statement | `lanjuik` |

### Boolean Values & Literals

| MinangScript | JavaScript | Type |
|-------------|------------|------|
| `bana` | `true` | Boolean |
| `salah` | `false` | Boolean |
| `kosong` | `null` | Null |

### Cultural Philosophy Functions

| Function | Philosophy | Description |
|----------|------------|-------------|
| `gotongRoyong(...)` | Gotong Royong | Cooperative work pattern |
| `musyawarah(topic, participants)` | Musyawarah Mufakat | Consensus decision making |
| `alamTakambang(lesson)` | Alam Takambang Jadi Guru | Learning from nature |
| `adatBasandi(action)` | Adat Basandi Syarak | Ethical practices |

---

## 🛠️ CLI Commands

### Project Management
```bash
minang new myproject      # Create new project
minang run file.minang    # Execute MinangScript file
minang build in.minang out.js  # Transpile to JavaScript
```

### Development Tools
```bash
minang repl              # Interactive REPL
minang help              # Show help information
minang lang <en|id>      # Switch CLI language
```

### Advanced Usage
```bash
# Project scaffolding
minang new --template basic myproject
minang new --template web mywebapp

# Build with options
minang build --minify input.minang output.js
minang build --sourcemap app.minang dist/app.js
```

---

## 🎯 Example Programs

### Basic Calculator
```minang
karojo kalkulator() {
    cetak "=== Kalkulator MinangScript ==="
    
    buek angka1 = angko("10")
    buek angka2 = angko("5")
    
    cetak "Penjumlahan: " + kato(angka1 + angka2)
    cetak "Pengurangan: " + kato(angka1 - angka2)
    cetak "Perkalian: " + kato(angka1 * angka2)
    cetak "Pembagian: " + kato(angka1 / angka2)
}

kalkulator()
```

### Cultural Programming Pattern
```minang
// Implementing Gotong Royong in code
karojo gotongRoyongProject() {
    buek tasks = ["design", "coding", "testing", "documentation"]
    buek team = ["Alice", "Bob", "Charlie", "Diana"]
    
    cetak "🤝 Memulai Gotong Royong Project"
    untuak i = 0; i < tasks.length; i++ {
        buek task = tasks[i]
        buek person = team[i % team.length]
        cetak person + " mengerjakan " + task
        
        // Simulate collaborative work
        gotongRoyong(task, person)
    }
    
    cetak "✅ Project selesai dengan semangat gotong royong!"
}

gotongRoyongProject()
```

### Digital Nagari System
```minang
// Simple digital village management
karojo sistemNagari() {
    tagak NAGARI = {
        nama: "Nagari Digital",
        penduduk: 1500,
        ninik_mamak: ["Dt. Rajo", "Dt. Bendahara", "Dt. Penghulu"]
    }
    
    karojo rapat(topik) {
        cetak "🗣️ Mengadakan musyawarah tentang: " + topik
        jadi musyawarah(topik, NAGARI.ninik_mamak)
    }
    
    buek keputusan = rapat("pembangunan infrastruktur")
    cetak "Hasil mufakat: " + keputusan
}

sistemNagari()
```

---

## 🧪 Development & Testing

### Setting Up Development Environment

```bash
# Clone repository
git clone https://github.com/DityaPerdana/minangScript.git
cd minangScript

# Install dependencies
npm install

# Run comprehensive test suite
npm test
```

### Test Results
```
📊 Test Summary:
✅ Passed: 19/19 
❌ Failed: 0/19
📈 Coverage: 100%
🎉 All tests passing successfully!
```

**Test Categories:**
- Core keyword parsing and execution
- Enhanced console methods functionality
- Data type constructors validation
- Cultural philosophy functions
- Variable scoping and function calls
- Control flow and loop constructs
- JavaScript transpilation accuracy
- Error handling and recovery

---

## 🔌 VS Code Extension

Enhance your MinangScript development experience with our comprehensive VS Code extension:

### Features
- 🎨 **Syntax Highlighting** - Beautiful color coding for MinangScript
- 💡 **IntelliSense** - Auto-completion and smart suggestions
- 📖 **Hover Documentation** - Instant help for keywords and functions
- 🎯 **Code Snippets** - Quick templates for common patterns
- 🏃 **Integrated Commands** - Run and compile directly from editor
- 🎨 **File Icons** - Custom icons for `.minang` files

### Installation
```bash
# Install via VS Code marketplace
code --install-extension dtyminang.minangscript-intellisense

# Or search "MinangScript IntelliSense" in VS Code Extensions
```

---

## 📦 NPM Package

MinangScript is available as a professional NPM package:

- **📦 Package**: [minangscript](https://www.npmjs.com/package/minangscript)
- **🏷️ Version**: 1.1.1
- **👤 Publisher**: radityaperdana
- **📏 Size**: 28.1 kB (116.5 kB unpacked)
- **📄 License**: MIT
- **🔗 Dependencies**: Zero dependencies!

### Package Statistics
```bash
# Check package info
npm info minangscript

# View download statistics
npm info minangscript --json
```

---

## 🏗️ Architecture

### Core Components

```
minangScript/
├── src/
│   ├── lexer/           # Tokenization with cultural keywords
│   │   └── MinangLexer.js
│   ├── parser/          # AST generation with Minangkabau syntax
│   │   └── MinangParser.js
│   ├── compiler/        # JavaScript transpilation
│   │   └── MinangCompiler.js
│   ├── runtime/         # Execution engine with cultural functions
│   │   └── MinangRuntime.js
│   └── utils/           # Helper functions and utilities
│       └── MinangUtils.js
├── cli/                 # Command-line interface
│   ├── index.js        # Main CLI entry point
│   ├── commands/       # Individual CLI commands
│   └── i18n/           # Internationalization support
├── examples/           # Comprehensive example programs
├── tests/             # Complete test suite
├── docs/              # Documentation and guides
└── minangscript-intellisense/  # VS Code extension
```

### Language Pipeline

```
Source Code (.minang) 
    ↓
Lexer (Tokenization)
    ↓
Parser (AST Generation)
    ↓
Compiler (JavaScript Generation)
    ↓
Runtime (Execution with Cultural Functions)
    ↓
Output
```

---

## 🌿 Cultural Philosophy

MinangScript embeds four fundamental Minangkabau principles into programming:

### 1. 🤝 **Gotong Royong** - *Mutual Cooperation*
```minang
// Functions that work together collaboratively
karojo projectTeam() {
    gotongRoyong("analysis", "design", "implementation", "testing")
    jadi "Success through collaboration"
}
```

### 2. 🗣️ **Musyawarah Mufakat** - *Consensus Building*
```minang
// Decision-making through discussion and agreement
karojo teamDecision(options) {
    buek discussion = musyawarah("project direction", options)
    jadi consensus(discussion)
}
```

### 3. 🌿 **Alam Takambang Jadi Guru** - *Learning from Nature*
```minang
// Adaptive algorithms inspired by natural processes
karojo adaptiveAlgorithm(data) {
    alamTakambang("water flows around obstacles")
    jadi optimizeBasedOnNature(data)
}
```

### 4. ⚖️ **Adat Basandi Syarak** - *Ethics-Based Foundation*
```minang
// Ensuring ethical decision-making in code
karojo ethicalProcess(input) {
    adatBasandi("fairness and justice")
    jadi processWithEthics(input)
}
```

---

## 📈 Changelog

### **[1.1.1] - 2025-06-23**
- 🌍 **International Accessibility** - Bilingual CLI support (English/Indonesian)
- ✅ **Persistent Language Settings** - Preferences saved between sessions
- 🔍 **Auto-detection** - System locale-based language detection
- 🌐 **Enhanced UX** - Improved international developer experience
- 🏔️ **Cultural Preservation** - Keywords remain authentically Minangkabau

### **[1.0.1] - 2025-06-23**
- 🎉 **NPM Publication** - Global package availability
- 🔌 **VS Code Extension** - Complete IntelliSense support
- 📚 **Documentation** - Comprehensive README consolidation
- 🪶 **Zero Dependencies** - Lightweight package architecture
- ✅ **Enhanced Testing** - 19/19 tests passing with 100% coverage

### **[1.0.0] - 2025-06-22**
- 🎉 **Initial Release** - Complete MinangScript implementation
- 🔤 **Language Core** - All 12 Minangkabau keywords implemented
- 🖨️ **Console System** - 7 specialized output methods
- 🔧 **Type Constructors** - 3 conversion functions
- 🌿 **Philosophy Integration** - 4 Minangkabau cultural principles
- 🛠️ **CLI Tools** - Professional command-line interface
- 🔄 **JavaScript Interop** - Complete transpilation support
- 🧪 **Testing Framework** - Comprehensive test coverage
- 📚 **Example Programs** - 16 demonstration programs

---

## 🤝 Contributing

We welcome contributions in the spirit of **Gotong Royong** (mutual cooperation):

### How to Contribute

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **🏔️ Implement** with respect for Minangkabau cultural values
4. **🧪 Add tests** for new functionality
5. **📝 Document** your changes thoroughly
6. **✅ Commit** your changes (`git commit -m 'Add amazing feature'`)
7. **🚀 Push** to the branch (`git push origin feature/amazing-feature`)
8. **🗣️ Submit** pull request for community **Musyawarah**

### Contribution Guidelines

- **🏔️ Cultural Sensitivity** - Respect Minangkabau values and traditions
- **🧪 Quality Assurance** - Maintain 100% test coverage
- **📖 Documentation** - Write clear, comprehensive documentation
- **🌿 Philosophy** - Align with the four cultural principles
- **🤝 Community** - Participate in respectful discussions

### Development Commands

```bash
# Setup development environment
npm run dev:setup

# Run tests with coverage
npm run test:coverage

# Lint and format code
npm run lint:fix

# Build for production
npm run build:production

# Generate documentation
npm run docs:generate
```

---

## 🔗 Resources & Links

### 📦 **Package & Distribution**
- [NPM Package](https://www.npmjs.com/package/minangscript)
- [GitHub Repository](https://github.com/DityaPerdana/minangScript)
- [Release Notes](https://github.com/DityaPerdana/minangScript/releases)

### 🛠️ **Development Tools**
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense)
- [Language Server Protocol](https://github.com/DityaPerdana/minangScript/tree/main/lsp)
- [Syntax Highlighter](https://github.com/DityaPerdana/minangScript/tree/main/highlighter)

### 📚 **Documentation & Learning**
- [Language Specification](docs/language-spec.md)
- [API Reference](docs/api-reference.md)
- [Tutorial Series](docs/tutorials/)
- [Cultural Philosophy Guide](docs/philosophy.md)

### 🤝 **Community**
- [Discord Server](https://discord.gg/minangscript)
- [GitHub Issues](https://github.com/DityaPerdana/minangScript/issues)
- [Discussion Forum](https://github.com/DityaPerdana/minangScript/discussions)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License reflects the open and sharing nature of Minangkabau culture, allowing the community to use, modify, and distribute MinangScript freely while maintaining cultural respect and attribution.

---

## 🙏 Acknowledgments

We extend our gratitude to:

- **🏔️ Minangkabau Community** - For preserving and sharing cultural wisdom
- **💻 JavaScript Community** - For providing the technical foundation
- **🌐 Open Source Community** - For inspiration and collaborative spirit
- **🔧 VS Code Team** - For excellent extension development APIs
- **📚 Documentation Contributors** - For making MinangScript accessible worldwide

---

## 🎉 Project Status

**MinangScript v1.1.1** is a **production-ready** programming language with:

✅ **Complete Implementation** - 41 language elements fully operational  
✅ **Global Distribution** - Available via NPM worldwide  
✅ **Professional Tooling** - VS Code extension with IntelliSense  
✅ **Comprehensive Testing** - 19/19 tests passing with 100% coverage  
✅ **International Support** - Bilingual CLI for global developers  
✅ **Cultural Authenticity** - Genuine Minangkabau philosophy integration  
✅ **Zero Dependencies** - Lightweight and efficient architecture  
✅ **Active Development** - Regular updates and community engagement  

---

<div align="center">

### *"Alam Takambang Jadi Guru"*
*Nature unfolds to become our teacher*

**🏔️ Built with Minangkabau wisdom and modern technology**

*Integrating traditional wisdom with contemporary programming for ethical and collaborative software development*

</div>