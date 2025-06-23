// MinangScript Internationalization
// Supporting English and Indonesian for broader accessibility

const { MinangConfig } = require('./config');

class MinangI18n {
    constructor() {
        this.config = new MinangConfig();
        this.translations = {
            en: {
                // CLI Messages
                welcome: '🏔️  MinangScript - Nature Unfolds to Become Our Teacher',
                fileNotFound: '❌ File not found: {0}',
                error: '❌ Error: {0}',
                building: '🔨 Building MinangScript...',
                buildSuccess: '✅ Successfully built to: {0}',
                buildFailed: '❌ Build failed: {0}',
                
                // Project Creation
                projectCreated: '✅ Project {0} created successfully!',
                enterDirectory: '📁 Enter directory: cd {0}',
                runProject: '🚀 Run with: minang run main.minang',
                
                // REPL
                replWelcome: '🏔️ MinangScript REPL - Interactive Mode',
                replInstructions: 'Type MinangScript code and press Enter',
                replHelp: 'Type .help for help, .exit to quit\n',
                goodbye: '🏔️ Goodbye! (Salamat tinggal!)',
                
                // Commands
                unknownCommand: '❌ Unknown command: {0}',
                useHelp: 'Use "minang help" for complete help',
                useHelpShort: 'Or "minang" without arguments for quick help',
                provideFile: '❌ Please provide a file name',
                example: 'Example: {0}',
                
                // Help System
                helpTitle: '🏔️  MinangScript - Complete Usage Guide',
                helpAvailable: 'Available commands:',
                projectManagement: '📂 Project Management:',
                execution: '🚀 Execution:',
                devTools: '🔧 Development Tools:',
                templates: '📖 Template Types:',
                examples: '💡 Usage Examples:',
                philosophy: '🌟 MinangScript Philosophy:',
                philosophyQuote: '"Alam Takambang Jadi Guru" - Nature unfolds to become our teacher',
                philosophyDesc: 'Learning from nature and Minangkabau culture',
                
                // Command Descriptions
                newProject: 'Create new MinangScript project',
                template: 'Generate cultural code template',
                runFile: 'Run .minang file',
                buildFile: 'Transpile to JavaScript',
                repl: 'Interactive mode for testing',
                validate: 'Validate syntax and culture',
                format: 'Format MinangScript code',
                version: 'Version and platform info',
                
                // Template Types
                templateBasic: 'Basic MinangScript template',
                templateGotongRoyong: 'Cooperation template',
                templateMusyawarah: 'Decision-making template',
                templateAlamTakambang: 'Learning from nature template',
                
                // REPL Help
                replHelpTitle: '📖 MinangScript REPL Help:',
                replCommands: 'Commands:',
                replExamples: 'MinangScript Examples:',
                replCulturalFunctions: 'Cultural Functions:',
                
                // Command Help
                helpCommand: 'Show this help',
                exitCommand: 'Exit REPL',
                examplesCommand: 'Show code examples',
                analyzeCommand: 'Analyze code structure',
                
                // Validation
                validationSuccess: '✅ Code validation successful',
                validationFailed: '❌ Validation failed: {0}',
                formatSuccess: '✅ Code formatted successfully',
                formatFailed: '❌ Format failed: {0}',
                
                // Language
                languageChanged: '🌍 Language changed to English',
                switchToIndonesian: 'Switch to Indonesian with: minang lang id'
            },
            
            id: {
                // CLI Messages
                welcome: '🏔️  MinangScript - Alam Takambang Jadi Guru',
                fileNotFound: '❌ File tidak ditemukan: {0}',
                error: '❌ Kesalahan: {0}',
                building: '🔨 Membangun MinangScript...',
                buildSuccess: '✅ Berhasil dibangun ke: {0}',
                buildFailed: '❌ Gagal membangun: {0}',
                
                // Project Creation
                projectCreated: '✅ Proyek {0} telah dibuat!',
                enterDirectory: '📁 Masuk ke direktori: cd {0}',
                runProject: '🚀 Jalankan: minang run main.minang',
                
                // REPL
                replWelcome: '🏔️ MinangScript REPL - Mode Interaktif',
                replInstructions: 'Ketik kode MinangScript dan tekan Enter',
                replHelp: 'Ketik .help untuk bantuan, .exit untuk keluar\n',
                goodbye: '🏔️ Salamat tinggal! (Goodbye!)',
                
                // Commands
                unknownCommand: '❌ Perintah tidak dikenal: {0}',
                useHelp: 'Gunakan "minang help" untuk melihat bantuan lengkap',
                useHelpShort: 'Atau "minang" tanpa argumen untuk bantuan singkat',
                provideFile: '❌ Harap berikan nama file',
                example: 'Contoh: {0}',
                
                // Help System
                helpTitle: '🏔️  MinangScript - Panduan Penggunaan Lengkap',
                helpAvailable: 'Perintah yang tersedia:',
                projectManagement: '📂 Project Management:',
                execution: '🚀 Execution:',
                devTools: '🔧 Development Tools:',
                templates: '📖 Template Types:',
                examples: '💡 Contoh penggunaan:',
                philosophy: '🌟 Filosofi MinangScript:',
                philosophyQuote: '"Alam Takambang Jadi Guru"',
                philosophyDesc: 'Belajar dari alam dan budaya Minangkabau',
                
                // Command Descriptions
                newProject: 'Buat proyek baru MinangScript',
                template: 'Generate template kode budaya',
                runFile: 'Jalankan file .minang',
                buildFile: 'Transpile ke JavaScript',
                repl: 'Mode interaktif untuk testing',
                validate: 'Validasi sintaks dan budaya',
                format: 'Format kode MinangScript',
                version: 'Info versi dan platform',
                
                // Template Types
                templateBasic: 'Template dasar MinangScript',
                templateGotongRoyong: 'Template kerja sama',
                templateMusyawarah: 'Template pengambilan keputusan',
                templateAlamTakambang: 'Template belajar dari alam',
                
                // REPL Help
                replHelpTitle: '📖 MinangScript REPL Help:',
                replCommands: 'Commands:',
                replExamples: 'Contoh MinangScript:',
                replCulturalFunctions: 'Fungsi Budaya:',
                
                // Command Help
                helpCommand: 'Tampilkan bantuan ini',
                exitCommand: 'Keluar dari REPL',
                examplesCommand: 'Tampilkan contoh kode',
                analyzeCommand: 'Analisis struktur kode',
                
                // Validation
                validationSuccess: '✅ Validasi kode berhasil',
                validationFailed: '❌ Validasi gagal: {0}',
                formatSuccess: '✅ Kode berhasil diformat',
                formatFailed: '❌ Format gagal: {0}',
                
                // Language
                languageChanged: '🌍 Bahasa diubah ke Bahasa Indonesia',
                switchToEnglish: 'Beralih ke Bahasa Inggris dengan: minang lang en'
            }
        };
        this.currentLang = this.detectLanguage();
    }
    
    detectLanguage() {
        // Check saved preference first
        const savedLang = this.config.getLanguage();
        if (savedLang !== 'auto' && this.translations && this.translations[savedLang]) {
            return savedLang;
        }
        
        // Check environment variables for language preference
        const envLang = process.env.LANG || process.env.LANGUAGE || '';
        if (envLang.includes('id') || envLang.includes('ID')) {
            return 'id';
        }
        
        // Check for Indonesian system indicators
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Asia/Jakarta')) {
            return 'id';
        }
        
        // Default to English for broader accessibility
        return 'en';
    }
    
    setLanguage(lang) {
        if (this.translations[lang] || lang === 'auto') {
            if (lang === 'auto') {
                this.config.setLanguage('auto');
                this.currentLang = this.detectLanguage();
            } else {
                this.currentLang = lang;
                this.config.setLanguage(lang);
            }
            return true;
        }
        return false;
    }
    
    t(key, ...args) {
        const translation = this.translations[this.currentLang][key] || 
                          this.translations['en'][key] || 
                          key;
        
        // Simple string interpolation
        return translation.replace(/{(\d+)}/g, (match, index) => {
            return args[index] || match;
        });
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
    
    showLanguageHelp() {
        console.log(`
🌍 MinangScript Language Support:

Current Language: ${this.currentLang === 'en' ? 'English' : 'Bahasa Indonesia'}
Saved Preference: ${this.config.getLanguage()}

Available Languages:
  en - English (Default for international users)
  id - Bahasa Indonesia (Default for Indonesian users)
  auto - Auto-detect based on system

Change Language:
  minang lang en    - Switch to English
  minang lang id    - Switch to Indonesian  
  minang lang auto  - Enable auto-detection

Auto-detection:
  • Detects system language automatically
  • Falls back to English for broader accessibility
  • Preserves Minangkabau cultural keywords in code

Note: Only CLI messages are translated.
MinangScript keywords remain authentically Minangkabau.

Configuration saved in: ${this.config.configFile}
        `);
    }
}

module.exports = { MinangI18n };
