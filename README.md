# MinangScript 🏔️

*Bahasa pemrograman berbasis JavaScript dengan filosofi Minangkabau*

A complete programming language inspired by Minangkabau culture, featuring authentic Minangkabau keywords and cultural philosophy integration.

## ✨ Features

### 🔤 **Authentic Minangkabau Keywords**
- `buek` - Variable declaration (var)
- `ambiak` - Let declaration  
- `tagak` - Const declaration
- `karojo` - Function definition
- `jadi` - Return statement
- `cetak` - Print/output with enhanced methods
- `kalau` / `kalauLain` / `lain` - Conditional statements
- `selami` - While loops
- `baronti` - Break statement

### 🖨️ **Enhanced Print System**
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

## 🚀 Quick Start

### Installation
```bash
git clone <repository>
cd minangScript
npm install
```

### Basic Usage
```bash
# Run a MinangScript program
node index.js run examples/hello.minang

# Build to JavaScript
node index.js build examples/hello.minang output.js

# Create new project template
node index.js new myproject
```

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
