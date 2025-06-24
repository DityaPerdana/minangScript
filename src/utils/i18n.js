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
                
                // Package Manager
                packageManager: 'Package Manager',
                initializingProject: 'Initializing MinangScript project: {0}',
                projectInitialized: 'Project {0} initialized successfully',
                packageInstalled: 'Package {0} installed successfully',
                packageRemoved: 'Package {0} removed successfully',
                packageUpdated: 'Package {0} updated successfully',
                searchingPackages: 'Searching packages for: {0}',
                packagesFound: 'Found {0} packages',
                noPackagesFound: 'No packages found for: {0}',
                packageInfo: 'Package Information',
                packageNotFound: 'Package not found: {0}',
                publishingPackage: 'Publishing package to registry...',
                packagePublished: 'Package published successfully',
                publishFailed: 'Package publishing failed: {0}',
                invalidPackage: 'Invalid package configuration',
                dependencyResolved: 'Dependency {0} resolved',
                dependencyConflict: 'Dependency conflict detected: {0}',
                cacheUpdated: 'Package cache updated',
                registryError: 'Registry error: {0}',
                
                // Cultural Principles (English explanations)
                gotongRoyong: 'Gotong Royong - Collaborative work and mutual assistance',
                musyawarah: 'Musyawarah Mufakat - Consensus through deliberation',
                alamTakambang: 'Alam Takambang Jadi Guru - Learning from nature and experience',
                adatBasandi: 'Adat Basandi Syarak - Ethics based on traditional and religious values',
                
                // Package Manager Commands
                cmdInit: 'Initialize new project',
                cmdInstall: 'Install package',
                cmdUninstall: 'Remove package',
                cmdList: 'List installed packages',
                cmdSearch: 'Search packages in registry',
                cmdUpdate: 'Update packages',
                cmdPublish: 'Publish package to registry',
                cmdInfo: 'Show package manager information',
                cmdHelp: 'Show help information',
                cmdVersion: 'Show version information',
                
                // Options
                optDescription: 'Project description',
                optAuthor: 'Author name',
                optLicense: 'Project license',
                optForce: 'Force operation',
                optDev: 'Install as development dependency',
                optGlobal: 'Install globally',
                
                // Package Validation
                validatingPackage: 'Validating package structure...',
                packageValid: 'Package validation successful',
                packageInvalid: 'Package validation failed: {0}',
                missingField: 'Missing required field: {0}',
                invalidVersion: 'Invalid version format: {0}',
                culturalValidation: 'Cultural principle validation',
                culturalValidationPassed: 'Cultural principles validated successfully',
                culturalValidationFailed: 'Cultural validation failed: {0}',
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
                switchToEnglish: 'Beralih ke Bahasa Inggris dengan: minang lang en',
                
                // Package Manager
                packageManager: 'Pengelola Paket',
                initializingProject: 'Menginisialisasi proyek MinangScript: {0}',
                projectInitialized: 'Proyek {0} telah diinisialisasi',
                packageInstalled: 'Paket {0} berhasil dipasang',
                packageRemoved: 'Paket {0} berhasil dihapus',
                packageUpdated: 'Paket {0} berhasil diperbarui',
                searchingPackages: 'Mencari paket untuk: {0}',
                packagesFound: 'Ditemukan {0} paket',
                noPackagesFound: 'Tidak ada paket ditemukan untuk: {0}',
                packageInfo: 'Informasi Paket',
                packageNotFound: 'Paket tidak ditemukan: {0}',
                publishingPackage: 'Menerbitkan paket ke registry...',
                packagePublished: 'Paket berhasil diterbitkan',
                publishFailed: 'Gagal menerbitkan paket: {0}',
                invalidPackage: 'Konfigurasi paket tidak valid',
                dependencyResolved: 'Dependensi {0} berhasil diselesaikan',
                dependencyConflict: 'Konflik dependensi terdeteksi: {0}',
                cacheUpdated: 'Cache paket diperbarui',
                registryError: 'Kesalahan registry: {0}',
                
                // Cultural Principles (Indonesian explanations)
                gotongRoyong: 'Gotong Royong - Kerja sama dan saling membantu',
                musyawarah: 'Musyawarah Mufakat - Kesepakatan melalui diskusi',
                alamTakambang: 'Alam Takambang Jadi Guru - Belajar dari alam dan pengalaman',
                adatBasandi: 'Adat Basandi Syarak - Etika berdasarkan nilai adat dan agama',
                
                // Package Manager Commands
                cmdInit: 'Inisialisasi proyek baru',
                cmdInstall: 'Pasang paket',
                cmdUninstall: 'Hapus paket',
                cmdList: 'Daftar paket terpasang',
                cmdSearch: 'Cari paket di registry',
                cmdUpdate: 'Perbarui paket',
                cmdPublish: 'Terbitkan paket ke registry',
                cmdInfo: 'Tampilkan informasi package manager',
                cmdHelp: 'Tampilkan bantuan',
                cmdVersion: 'Tampilkan informasi versi',
                
                // Options
                optDescription: 'Deskripsi proyek',
                optAuthor: 'Nama pengarang',
                optLicense: 'Lisensi proyek',
                optForce: 'Paksa operasi',
                optDev: 'Pasang sebagai development dependency',
                optGlobal: 'Pasang secara global',
                
                // Package Validation
                validatingPackage: 'Memvalidasi struktur paket...',
                packageValid: 'Validasi paket berhasil',
                packageInvalid: 'Validasi paket gagal: {0}',
                missingField: 'Field yang diperlukan tidak ada: {0}',
                invalidVersion: 'Format versi tidak valid: {0}',
                culturalValidation: 'Validasi prinsip budaya',
                culturalValidationPassed: 'Prinsip budaya berhasil divalidasi',
                culturalValidationFailed: 'Validasi budaya gagal: {0}'
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
