# MinangScript Changelog v2.0.0

## Version 2.0.0 - "Web-Ready Data Structures" (2025-06-24)

### 🚀 MAJOR NEW FEATURES

#### Native Data Structures
- **✨ NEW: Array Literals (`kumpulan`)** - Native array support with intuitive syntax
  ```minangscript
  buek numbers = kumpulan[1, 2, 3, 4, 5]
  buek empty = kumpulan[]
  ```
- **✨ NEW: Object Literals (`benda`)** - Native object support 
  ```minangscript
  buek person = benda{nama: "Ahmad", umur: 25}
  buek config = benda{mode: "dark", lang: "id"}
  ```

#### Web Development Ready
- **🌐 Web/DOM Keywords** - Complete web development vocabulary
  - `dokumen` (document), `elemen` (element), `cari` (querySelector)
  - `klik` (click), `ubah` (change), `muat` (load)
  - `kirim` (fetch), `json` (JSON), `form` (form)
- **🔧 HTTP/API Support** - Built-in web API functions
  - `get`, `post`, `put`, `delete` for HTTP methods
  - Enhanced runtime with DOM manipulation functions
  - localStorage, timer, and web API integrations

#### Algorithm Examples
- **📊 LeetCode Two Sum Implementation** - Complete solutions with:
  - Brute Force O(n²) approach
  - Hash Map O(n) optimal solution  
  - Two Pointer O(n log n) approach
  - Interactive examples and benchmarking
- **🎯 Web Application Templates** - Ready-to-use examples:
  - Simple web apps with DOM manipulation
  - Todo list application
  - API dashboard with data fetching
  - Interactive algorithm visualizations

### 🔧 BREAKING CHANGES
- **Removed cultural philosophy keywords** from core language
  - Cleaned up lexer, runtime, and test framework
  - Maintained backward compatibility for practical features
  - Cultural examples preserved in `/examples` for reference
- **Fixed increment/decrement syntax** - Use `i = i + 1` instead of `i++`
- **Enhanced keyword resolution** - Fixed conflicts between `piliah` (switch/selector)

### 🐛 BUG FIXES
- Fixed duplicate import error in main CLI
- Resolved lexer keyword conflicts
- Enhanced parser expression handling
- Improved error messages and debugging

### 📚 DOCUMENTATION
- Updated README with new data structure syntax
- Added comprehensive web development examples
- Enhanced algorithm tutorials and walkthroughs
- Performance benchmarking documentation

### 🏗️ INFRASTRUCTURE
- Enhanced compiler with array/object transpilation
- Improved runtime evaluation engine
- Better error handling and debugging
- Streamlined development workflow

---

## Migration Guide v1.x → v2.0

### Array Syntax
```minangscript
// OLD: Not supported
buek arr = []

// NEW: Native support
buek arr = kumpulan[1, 2, 3]
```

### Object Syntax  
```minangscript
// OLD: Not supported
buek obj = {}

// NEW: Native support  
buek obj = benda{key: "value"}
```

### Loop Increments
```minangscript
// OLD: Not supported
for (let i = 0; i < 10; i++) {}

// NEW: MinangScript syntax
untuak (buek i = 0; i < 10; i = i + 1) {}
```

---

**Full Diff**: https://github.com/DityaPerdana/minangScript/compare/v1.3.1...v2.0.0
