// Enhanced MinangScript Package Manager CLI with International Support
// Accessible for both Indonesian and international developers

const { MinangPaket } = require('./MinangPaket');
const { MinangI18n } = require('../utils/i18n');

class EnhancedMinangPaketCLI {
    constructor() {
        this.paket = new MinangPaket();
        this.i18n = new MinangI18n();
        this.supportedLanguages = ['en', 'id'];
    }

    async execute(command, args = []) {
        try {
            // Handle language switching commands first
            if (command === 'lang' || command === 'language') {
                return this.handleLanguage(args);
            }

            // Map commands to methods with both English and Indonesian support
            const commandMap = {
                // English commands
                'init': 'handleInit',
                'install': 'handleInstall', 
                'uninstall': 'handleUninstall',
                'remove': 'handleUninstall',
                'list': 'handleList',
                'search': 'handleSearch',
                'update': 'handleUpdate',
                'upgrade': 'handleUpdate',
                'publish': 'handlePublish',
                'info': 'handleInfo',
                'help': 'handleHelp',
                'version': 'handleVersion',
                
                // Indonesian commands (aliases)
                'inisialkan': 'handleInit',
                'pasang': 'handleInstall',
                'lepas': 'handleUninstall',
                'hapus': 'handleUninstall',
                'daftar': 'handleList',
                'cari': 'handleSearch',
                'perbarui': 'handleUpdate',
                'terbitkan': 'handlePublish',
                'bantuan': 'handleHelp',
                'versi': 'handleVersion'
            };

            const method = commandMap[command];
            if (method && this[method]) {
                await this[method](args);
            } else {
                this.showUnknownCommand(command);
            }
        } catch (error) {
            console.error(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    async handleLanguage(args) {
        const targetLang = args[0];
        
        if (!targetLang) {
            console.log(`Current language: ${this.i18n.currentLang}`);
            console.log(`Available languages: ${this.supportedLanguages.join(', ')}`);
            console.log(`Usage: minang lang <language>`);
            console.log(`       minang language <language>`);
            return;
        }

        if (this.i18n.setLanguage(targetLang)) {
            console.log(`🌍 ${this.i18n.t('languageChanged')}`);
            this.showLanguageHelp();
        } else {
            console.log(`❌ Unsupported language: ${targetLang}`);
            console.log(`Available: ${this.supportedLanguages.join(', ')}`);
        }
    }

    showLanguageHelp() {
        const currentLang = this.i18n.currentLang;
        if (currentLang === 'en') {
            console.log('\n🌟 Welcome to MinangScript Package Manager!');
            console.log('You can now use English commands:');
            console.log('  minang init myproject');
            console.log('  minang install package-name');
            console.log('  minang search ui-components');
            console.log('\nFor Indonesian commands: minang lang id');
        } else {
            console.log('\n🌟 Selamat datang di MinangScript Package Manager!');
            console.log('Anda sekarang dapat menggunakan perintah Indonesia:');
            console.log('  minang inisialkan proyeksaya');
            console.log('  minang pasang nama-paket');
            console.log('  minang cari komponen-ui');
            console.log('\nUntuk perintah Inggris: minang lang en');
        }
    }

    async handleInit(args) {
        const projectName = args[0];
        const options = this.parseOptions(args.slice(1));
        
        console.log(`🏔️ ${this.i18n.t('initializingProject', projectName || 'new-project')}`);
        
        try {
            const result = await this.paket.inisialkan(projectName, {
                description: options.description || options.desc,
                author: options.author,
                license: options.license || 'MIT'
            });
            
            if (result.success) {
                console.log(`✅ ${this.i18n.t('projectInitialized', result.projectName)}`);
                this.showNextSteps(result.projectName);
            } else {
                console.log(`❌ ${this.i18n.t('error', result.error)}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    showNextSteps(projectName) {
        console.log(`\n📚 ${this.getCurrentWord('nextSteps', 'Next Steps', 'Langkah Selanjutnya')}:`);
        console.log(`   cd ${projectName}`);
        console.log(`   minang run main.minang`);
        console.log(`\n🔧 ${this.getCurrentWord('packageCommands', 'Package Commands', 'Perintah Paket')}:`);
        console.log(`   minang ${this.getCurrentWord('install', 'install', 'pasang')} <package-name>`);
        console.log(`   minang ${this.getCurrentWord('search', 'search', 'cari')} <query>`);
    }

    async handleInstall(args) {
        const packageName = args[0];
        if (!packageName) {
            console.log(`❌ ${this.getCurrentWord('packageRequired', 'Package name required', 'Nama paket diperlukan')}`);
            console.log(`   ${this.getCurrentWord('example', 'Example', 'Contoh')}: minang ${this.getCurrentWord('install', 'install', 'pasang')} minang-ui`);
            return;
        }

        const options = this.parseOptions(args.slice(1));
        
        console.log(`📦 ${this.i18n.t('packageInstalled', packageName)}...`);
        
        try {
            const result = await this.paket.pasang(packageName, options);
            if (result.success) {
                console.log(`✅ ${this.i18n.t('packageInstalled', packageName)}`);
                if (result.dependencies && result.dependencies.length > 0) {
                    console.log(`📋 ${this.getCurrentWord('dependencies', 'Dependencies installed', 'Dependensi terpasang')}:`);
                    result.dependencies.forEach(dep => console.log(`   └─ ${dep}`));
                }
            } else {
                console.log(`❌ ${this.i18n.t('error', result.error)}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    async handleSearch(args) {
        const query = args.join(' ');
        if (!query) {
            console.log(`❌ ${this.getCurrentWord('searchQuery', 'Search query required', 'Query pencarian diperlukan')}`);
            console.log(`   ${this.getCurrentWord('example', 'Example', 'Contoh')}: minang ${this.getCurrentWord('search', 'search', 'cari')} ui components`);
            return;
        }

        console.log(`🔍 ${this.i18n.t('searchingPackages', query)}`);
        
        try {
            const searchResult = await this.paket.cari(query);
            if (searchResult && searchResult.success && searchResult.packages.length > 0) {
                // Results are already displayed by the paket.cari method
                // No need to display them again here
            } else if (searchResult && searchResult.packages.length === 0) {
                console.log(`📭 ${this.i18n.t('noPackagesFound', query)}`);
                this.suggestAlternatives(query);
            } else {
                console.log(`❌ ${this.i18n.t('registryError', searchResult ? searchResult.error : 'Unknown error')}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('registryError', error.message)}`);
        }
    }

    suggestAlternatives(query) {
        console.log(`\n💡 ${this.getCurrentWord('suggestions', 'Suggestions', 'Saran')}:`);
        console.log(`   • ${this.getCurrentWord('checkSpelling', 'Check spelling', 'Periksa ejaan')}`);
        console.log(`   • ${this.getCurrentWord('tryBroader', 'Try broader search terms', 'Coba kata kunci yang lebih luas')}`);
        console.log(`   • ${this.getCurrentWord('browse', 'Browse available packages', 'Jelajahi paket tersedia')}: minang ${this.getCurrentWord('list', 'list', 'daftar')}`);
    }

    async handleList(args) {
        const options = this.parseOptions(args);
        
        try {
            const packages = await this.paket.daftar(options);
            
            if (packages.length > 0) {
                console.log(`📦 ${this.getCurrentWord('installedPackages', 'Installed Packages', 'Paket Terpasang')} (${packages.length}):\n`);
                
                packages.forEach((pkg, index) => {
                    console.log(`${index + 1}. 📦 ${pkg.nama}@${pkg.versi}`);
                    if (pkg.deskripsi) {
                        console.log(`   ${pkg.deskripsi}`);
                    }
                    if (pkg.filosofi && pkg.filosofi.length > 0) {
                        const principles = pkg.filosofi.map(p => this.getCulturalPrincipleDescription(p)).join(', ');
                        console.log(`   🏔️ ${principles}`);
                    }
                    console.log('');
                });
            } else {
                console.log(`📭 ${this.getCurrentWord('noPackages', 'No packages installed', 'Tidak ada paket terpasang')}`);
                console.log(`💡 ${this.getCurrentWord('getStarted', 'Get started', 'Mulai')}: minang ${this.getCurrentWord('search', 'search', 'cari')} <${this.getCurrentWord('query', 'query', 'kueri')}>`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    async handleInfo(args) {
        console.log('🏔️ MinangScript Package Manager (MinangPaket)\n');
        
        const info = {
            version: '1.3.0',
            registry: this.paket.localRegistry,
            packageDir: this.paket.packageDir,
            configFile: this.paket.configFile,
            language: this.i18n.currentLang
        };

        console.log(`📋 ${this.getCurrentWord('systemInfo', 'System Information', 'Informasi Sistem')}:`);
        console.log(`   ${this.getCurrentWord('version', 'Version', 'Versi')}: ${info.version}`);
        console.log(`   ${this.getCurrentWord('language', 'Language', 'Bahasa')}: ${info.language.toUpperCase()}`);
        console.log(`   ${this.getCurrentWord('registry', 'Registry', 'Registry')}: ${info.registry}`);
        console.log(`   ${this.getCurrentWord('packageDirectory', 'Package Directory', 'Direktori Paket')}: ${info.packageDir}`);
        console.log(`   ${this.getCurrentWord('configFile', 'Config File', 'File Konfigurasi')}: ${info.configFile}`);

        console.log(`\n🏔️ ${this.getCurrentWord('culturalPhilosophy', 'Cultural Philosophy', 'Filosofi Budaya')}:`);
        console.log(`   🤝 ${this.i18n.t('gotongRoyong')}`);
        console.log(`   🗣️ ${this.i18n.t('musyawarah')}`);
        console.log(`   🌿 ${this.i18n.t('alamTakambang')}`);
        console.log(`   ⚖️ ${this.i18n.t('adatBasandi')}`);

        console.log(`\n🌍 ${this.getCurrentWord('languageSupport', 'Language Support', 'Dukungan Bahasa')}:`);
        console.log(`   ${this.getCurrentWord('switchLanguage', 'Switch language', 'Ganti bahasa')}: minang lang <en|id>`);
        console.log(`   ${this.getCurrentWord('availableLanguages', 'Available languages', 'Bahasa tersedia')}: English, Indonesian`);
    }

    handleHelp(args) {
        const currentLang = this.i18n.currentLang;
        
        console.log('🏔️ MinangScript Package Manager (MinangPaket)\n');
        
        if (currentLang === 'en') {
            this.showEnglishHelp();
        } else {
            this.showIndonesianHelp();
        }
        
        // Always show both language options
        console.log(`\n🌍 ${this.getCurrentWord('languageOptions', 'Language Options', 'Opsi Bahasa')}:`);
        console.log(`   minang lang en     # Switch to English`);
        console.log(`   minang lang id     # Beralih ke Bahasa Indonesia`);
    }

    showEnglishHelp() {
        console.log('📚 USAGE:');
        console.log('  minang <command> [options]\n');
        
        console.log('📦 PROJECT MANAGEMENT:');
        console.log('  init [name]              - Initialize new project');
        console.log('  inisialkan [name]        - Alias for init (Indonesian)\n');
        
        console.log('🔧 PACKAGE MANAGEMENT:');
        console.log('  install <package>        - Install package');
        console.log('  uninstall <package>      - Remove package');
        console.log('  update [package]         - Update packages');
        console.log('  list                     - List installed packages');
        console.log('  search <query>           - Search packages in registry\n');
        
        console.log('📋 INFORMATION:');
        console.log('  info                     - Show package manager information');
        console.log('  help                     - Show this help');
        console.log('  version                  - Show version information\n');
        
        console.log('📢 PUBLISHING:');
        console.log('  publish [options]        - Publish package to registry\n');
        
        console.log('⚙️ OPTIONS:');
        console.log('  --description <desc>     - Project description (for init)');
        console.log('  --author <name>          - Author name (for init)');
        console.log('  --license <license>      - Project license (for init)');
        console.log('  --dev                    - Install as development dependency');
        console.log('  --global                 - Install globally');
        console.log('  --force                  - Force operation\n');
        
        console.log('💡 EXAMPLES:');
        console.log('  minang init my-project --author "John Doe"');
        console.log('  minang install minang-ui');
        console.log('  minang search mathematical');
        console.log('  minang list');
        console.log('  minang publish --force');
    }

    showIndonesianHelp() {
        console.log('📚 PENGGUNAAN:');
        console.log('  minang <perintah> [opsi]\n');
        
        console.log('📦 MANAJEMEN PROYEK:');
        console.log('  init [nama]              - Inisialisasi proyek baru');
        console.log('  inisialkan [nama]        - Inisialisasi proyek baru\n');
        
        console.log('🔧 MANAJEMEN PAKET:');
        console.log('  pasang <paket>           - Pasang paket');
        console.log('  lepas <paket>            - Hapus paket');
        console.log('  perbarui [paket]         - Perbarui paket');
        console.log('  daftar                   - Daftar paket terpasang');
        console.log('  cari <kueri>             - Cari paket di registry\n');
        
        console.log('📋 INFORMASI:');
        console.log('  info                     - Tampilkan informasi package manager');
        console.log('  bantuan                  - Tampilkan bantuan ini');
        console.log('  versi                    - Tampilkan informasi versi\n');
        
        console.log('📢 PUBLIKASI:');
        console.log('  terbitkan [opsi]         - Terbitkan paket ke registry\n');
        
        console.log('⚙️ OPSI:');
        console.log('  --description <desc>     - Deskripsi proyek (untuk init)');
        console.log('  --author <nama>          - Nama pengarang (untuk init)');
        console.log('  --license <lisensi>      - Lisensi proyek (untuk init)');
        console.log('  --dev                    - Pasang sebagai development dependency');
        console.log('  --global                 - Pasang secara global');
        console.log('  --force                  - Paksa operasi\n');
        
        console.log('💡 CONTOH:');
        console.log('  minang inisialkan proyek-saya --author "John Doe"');
        console.log('  minang pasang minang-ui');
        console.log('  minang cari matematika');
        console.log('  minang daftar');
        console.log('  minang terbitkan --force');
    }

    showUnknownCommand(command) {
        console.log(`❌ ${this.getCurrentWord('unknownCommand', 'Unknown command', 'Perintah tidak dikenal')}: ${command}`);
        console.log(`💡 ${this.getCurrentWord('useHelp', 'Use help for assistance', 'Gunakan bantuan untuk panduan')}:`);
        console.log(`   minang ${this.getCurrentWord('help', 'help', 'bantuan')}`);
        console.log(`   minang ${this.getCurrentWord('help', 'help', 'bantuan')} ${this.getCurrentWord('commands', 'commands', 'perintah')}`);
    }

    // Helper methods
    getCurrentWord(key, englishDefault, indonesianDefault) {
        const currentLang = this.i18n.currentLang;
        if (currentLang === 'en') {
            return englishDefault;
        } else {
            return indonesianDefault;
        }
    }

    getCulturalPrincipleDescription(principle) {
        const descriptions = {
            'gotongRoyong': this.getCurrentWord('gotongRoyong', 'Collaborative Work', 'Kerja Sama'),
            'musyawarah': this.getCurrentWord('musyawarah', 'Consensus Building', 'Musyawarah'),
            'alamTakambang': this.getCurrentWord('alamTakambang', 'Learning from Nature', 'Belajar dari Alam'),
            'adatBasandi': this.getCurrentWord('adatBasandi', 'Ethical Foundation', 'Fondasi Etika')
        };
        return descriptions[principle] || principle;
    }

    parseOptions(args) {
        const options = {};
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg.startsWith('--')) {
                const key = arg.substring(2);
                const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
                options[key] = value;
                if (value !== true) i++; // Skip next arg if it was used as value
            }
        }
        return options;
    }

    async handleUninstall(args) {
        const packageName = args[0];
        if (!packageName) {
            console.log(`❌ ${this.getCurrentWord('packageRequired', 'Package name required', 'Nama paket diperlukan')}`);
            return;
        }

        try {
            const result = await this.paket.lepas(packageName);
            if (result.success) {
                console.log(`✅ ${this.i18n.t('packageRemoved', packageName)}`);
            } else {
                console.log(`❌ ${this.i18n.t('error', result.error)}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    async handleUpdate(args) {
        const packageName = args[0];
        
        try {
            const result = await this.paket.perbarui(packageName);
            if (result.success) {
                if (packageName) {
                    console.log(`✅ ${this.i18n.t('packageUpdated', packageName)}`);
                } else {
                    console.log(`✅ ${this.getCurrentWord('allPackagesUpdated', 'All packages updated', 'Semua paket diperbarui')}`);
                }
            } else {
                console.log(`❌ ${this.i18n.t('error', result.error)}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    async handlePublish(args) {
        const options = this.parseOptions(args);
        
        console.log(`📤 ${this.i18n.t('publishingPackage')}`);
        
        try {
            const result = await this.paket.terbitkan(options);
            if (result.success) {
                console.log(`✅ ${this.i18n.t('packagePublished')}`);
            } else {
                console.log(`❌ ${this.i18n.t('publishFailed', result.error)}`);
            }
        } catch (error) {
            console.log(`❌ ${this.i18n.t('error', error.message)}`);
        }
    }

    handleVersion() {
        console.log('🏔️ MinangScript Package Manager');
        console.log(`📦 Version: 1.3.0`);
        console.log(`🌍 Language: ${this.i18n.currentLang.toUpperCase()}`);
        console.log(`🏠 Node.js: ${process.version}`);
        console.log(`💻 Platform: ${process.platform} ${process.arch}`);
        console.log(`\n🌟 ${this.getCurrentWord('culturalMotto', 'Cultural Motto', 'Motto Budaya')}:`);
        console.log(`   "Alam Takambang Jadi Guru" - Nature unfolds to become our teacher`);
    }
}

module.exports = { EnhancedMinangPaketCLI };
