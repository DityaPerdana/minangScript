# MinangScript 🏔️ v2.0

> *Modern programming language with Minangkabau philosophy. Now featuring native arrays, objects, and web development support!*

[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://www.npmjs.com/package/minangscript)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![NPM](https://img.shields.io/npm/v/minangscript?color=red)](https://www.npmjs.com/package/minangscript)
[![Downloads](https://img.shields.io/npm/dm/minangscript)](https://www.npmjs.com/package/minangscript)

## 🌟 What's New in v2.0?

MinangScript v2.0 is a **major release** featuring native data structures and web development capabilities:

### 🆕 Native Data Structures
- **`kumpulan`** (arrays) - `buek numbers = kumpulan[1, 2, 3, 4]`
- **`benda`** (objects) - `buek person = benda{nama: "Ahmad", umur: 25}`

### 🌐 Web Development Ready
- DOM manipulation with Minangkabau keywords
- HTTP/API support with native functions
- Complete web application templates

### 📊 Algorithm Examples
- LeetCode Two Sum solutions (3 approaches)
- Interactive algorithm visualizations
- Performance benchmarking tools

---

## 🚀 Quick Start

### Installation

```bash
# Global installation
npm install -g minangscript

# Verify installation
minang help
```

### Your First Program

Create `hello.minang`:

```minangscript
// Traditional greeting with arrays and objects
cetak "🏔️ Salamat datang ka MinangScript v2.0!"

// Create an array (kumpulan)
buek numbers = kumpulan[1, 2, 3, 4, 5]
cetak "Numbers: " + numbers

// Create an object (benda)
buek person = benda{
    nama: "Ahmad",
    umur: 25,
    kota: "Padang"
}

karojo greet(person) {
    jadi "Halo " + person.nama + " dari " + person.kota + "!"
}

cetak greet(person)
```

```bash
minang run hello.minang
```

Output:
```
🏔️ Salamat datang ka MinangScript v2.0!
Numbers: 1,2,3,4,5
Halo Ahmad dari Padang!
```

---

## 📚 Data Structures

### Arrays (`kumpulan`)

```minangscript
// Create arrays
buek fruits = kumpulan["apel", "pisang", "mangga"]
buek numbers = kumpulan[1, 2, 3, 4, 5]
buek empty = kumpulan[]

// Access elements
cetak fruits[0]  // "apel"
cetak numbers.length  // 5

// Add elements
fruits.push("jeruk")
```

### Objects (`benda`)

```minangscript
// Create objects
buek student = benda{
    nama: "Siti",
    umur: 20,
    jurusan: "Informatika"
}

// Access properties
cetak student.nama    // "Siti"
cetak student["umur"] // 20

// Nested objects
buek config = benda{
    app: benda{
        name: "MinangApp",
        version: "1.0.0"
    },
    database: benda{
        host: "localhost",
        port: 5432
    }
}
```

---

## 🌐 Web Development

### DOM Manipulation

```minangscript
// Select elements
buek button = dokumen.cari("#myButton")
buek title = dokumen.cari("h1")

// Event handling
button.dengar("klik", karojo() {
    title.konten = "Button clicked!"
})

// Create new elements
buek newDiv = dokumen.buat("div")
newDiv.konten = "Dynamic content"
dokumen.body.tambah(newDiv)
```

### HTTP/API Calls

```minangscript
// Fetch data
karojo fetchUserData(userId) {
    buek response = kirim("get", `/api/users/${userId}`)
    buek user = json.parse(response)
    jadi user
}

// POST data
karojo createUser(userData) {
    buek response = kirim("post", "/api/users", userData)
    jadi response
}
```

---

## 📊 Algorithm Examples

### LeetCode Two Sum

```minangscript
// Hash Map approach - O(n)
karojo twoSum(nums, target) {
    buek map = benda{}
    
    untuak (buek i = 0; i < nums.length; i = i + 1) {
        buek complement = target - nums[i]
        
        kalau map[complement] !== undefined {
            jadi kumpulan[map[complement], i]
        }
        
        map[nums[i]] = i
    }
    
    jadi kumpulan[]
}

// Test the solution
buek nums = kumpulan[2, 7, 11, 15]
buek target = 9
buek result = twoSum(nums, target)
cetak "Solution: " + result  // [0, 1]
```

---

## 🎯 Language Features

### Variables & Functions

```minangscript
// Variables
buek name = "MinangScript"     // let/var
ambiak version = "2.0"         // let
tagak PI = 3.14159            // const

// Functions
karojo calculate(a, b) {
    buek sum = a + b
    jadi sum
}
```

### Control Flow

```minangscript
// Conditionals
kalau condition {
    cetak "True branch"
} lainKalau otherCondition {
    cetak "Else if branch"  
} lain {
    cetak "Else branch"
}

// Loops
untuak (buek i = 0; i < 10; i = i + 1) {
    cetak "Count: " + i
}

selamo condition {
    // While loop body
}
```

### Advanced Features

```minangscript
// Try-catch
cubo {
    // Risky operation
    buek result = riskyFunction()
} tangkok (error) {
    cetak "Error: " + error
} akhianyo {
    cetak "Cleanup"
}

// Template literals
buek message = `Hello ${name}, welcome to MinangScript!`
```

---

## 📦 CLI Commands

```bash
# Project Management
minang new myproject          # Create new project
minang init                   # Initialize package
minang template web-app       # Generate web app template

# Development
minang run app.minang         # Run program
minang build src/ dist/       # Transpile to JavaScript
minang repl                   # Interactive mode

# Package Management
minang install package-name   # Install package
minang search query          # Search packages
minang update               # Update packages

# Examples
minang example:arrays        # Run array examples
minang example:web          # Run web examples
minang example:two-sum      # Run algorithm examples
```

---

## 🌍 Philosophy: "Alam Takambang Jadi Guru"

*Nature unfolds to become our teacher*

MinangScript embodies the Minangkabau philosophy of learning from nature and community collaboration. The language promotes:

- **Simplicity** - Clear, readable syntax inspired by natural language
- **Collaboration** - Built-in package management and sharing tools
- **Growth** - Designed to evolve with the community's needs
- **Accessibility** - Bilingual support for global and local developers

---

## 📖 Examples

Explore comprehensive examples in the `/examples` directory:

- `leetcode-two-sum-simple.minang` - Algorithm implementation
- `web-simple.minang` - Basic web app
- `web-todo.minang` - Todo list application  
- `web-api-dashboard.minang` - API dashboard
- `two-sum-interactive.minang` - Interactive algorithm

---

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/DityaPerdana/minangScript.git
cd minangScript

# Install dependencies
npm install

# Run tests
npm test

# Run examples
npm run example:arrays
npm run example:web
```

---

## 📋 Requirements

- **Node.js** >= 14.0.0
- **NPM** >= 6.0.0
- **OS**: Windows, macOS, Linux

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **NPM Package**: [minangscript](https://www.npmjs.com/package/minangscript)
- **GitHub**: [DityaPerdana/minangScript](https://github.com/DityaPerdana/minangScript)
- **VS Code Extension**: [MinangScript IntelliSense](https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense)

---

**MinangScript v2.0** - *Alam takambang jadi guru* 🏔️

*Built with ❤️ for the global programming community*
