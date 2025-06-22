# MinangScript Installation Guide

## Quick Installation

### Global Installation (Recommended)
```bash
# Navigate to MinangScript directory
cd /path/to/minangScript

# Install globally
npm install -g .

# Verify installation
minang help
```

### Local Development
```bash
# Use directly without installation
node index.js help

# Run examples
node index.js run examples/hello.minang
```

## Getting Started

### Create Your First Program
```bash
# Create a new project
minang new myproject
cd myproject

# Edit main.minang and run
minang run main.minang
```

### Basic Commands
- `minang run <file>` - Execute MinangScript file
- `minang build <input> <output>` - Transpile to JavaScript
- `minang new <project>` - Create new project
- `minang help` - Show help

### Example Programs
```bash
# Try the examples
minang run examples/hello.minang
minang run examples/kalkulator.minang
minang run examples/gotong-royong.minang
```

## Language Quick Reference

### Variables
```minang
buat nama = "Minang"
buat umur = 25
```

### Functions
```minang
fungsi salam(nama) {
    baliak "Hello " + nama
}
```

### Control Flow
```minang
kalau umur >= 18 {
    tampilkan "Dewasa"
} lain {
    tampilkan "Muda"
}
```

### Cultural Functions
```minang
gotongRoyong("kerja", "bersama")
musyawarah("topik", "peserta")
alamTakambang("pelajaran")
```

## Development Tools

### Test the Installation
```bash
npm test
```

### Development REPL
```bash
npm run repl
```

### Generate Templates
```bash
npm run template:basic
npm run template:gotong
```

## Philosophy

MinangScript integrates Minangkabau cultural values:
- **Gotong Royong**: Collaborative programming
- **Musyawarah Mufakat**: Consensus-based development
- **Alam Takambang Jadi Guru**: Learning from nature
- **Adat Basandi Syarak**: Ethical programming practices
