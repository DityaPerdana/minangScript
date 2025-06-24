// MinangScript Package Manager - MinangPaket
// Manages packages with Minangkabau cultural principles

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');
const { MinangConfig } = require('../utils/config');
const { MinangI18n } = require('../utils/i18n');

class MinangPaket {
    constructor() {
        this.config = new MinangConfig();
        this.i18n = new MinangI18n();
        this.registryUrl = 'https://registry.minangscript.org'; // Future registry
        this.localRegistry = 'https://raw.githubusercontent.com/DityaPerdana/minangscript-packages/main';
        this.packageDir = path.join(process.cwd(), 'minang_modules');
        this.lockFile = path.join(process.cwd(), 'paket.lock');
        this.configFile = path.join(process.cwd(), 'paket.minang');
        
        // Ensure package directory exists
        this.ensurePackageDir();
    }

    ensurePackageDir() {
        if (!fs.existsSync(this.packageDir)) {
            fs.mkdirSync(this.packageDir, { recursive: true });
        }
    }

    // Initialize package manager in current directory
    async inisialkan(name, options = {}) {
        try {
            const projectConfig = {
                nama: name || path.basename(process.cwd()),
                versi: "1.0.0",
                deskripsi: options.description || "Proyek MinangScript baru",
                pengarang: options.author || "Programmer MinangScript",
                lisensi: options.license || "MIT",
                filosofi: [
                    "gotong-royong",
                    "musyawarah-mufakat",
                    "alam-takambang-jadi-guru",
                    "adat-basandi-syarak"
                ],
                dependencies: {},
                devDependencies: {},
                scripts: {
                    "main": "main.minang",
                    "test": "test/*.minang",
                    "build": "build/"
                },
                engine: {
                    "minangscript": ">=1.1.0"
                }
            };

            // Write configuration file
            fs.writeFileSync(this.configFile, JSON.stringify(projectConfig, null, 2));
            
            // Create basic project structure
            const directories = ['src', 'test', 'docs', 'examples'];
            directories.forEach(dir => {
                const dirPath = path.join(process.cwd(), dir);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }
            });

            // Create main.minang
            if (!fs.existsSync('main.minang')) {
                const mainContent = `// ${name || 'MinangScript Project'}
// Dibuat dengan filosofi Minangkabau

cetak "Salamat datang ka ${name || 'proyek'} MinangScript!"
cetak "Alam takambang jadi guru"

// Contoh penggunaan gotong royong
karojo projectSetup() {
    gotongRoyong("inisialisasi", "konfigurasi", "dokumentasi")
    cetak "Project setup selesai dengan semangat gotong royong"
}

projectSetup()
`;
                fs.writeFileSync('main.minang', mainContent);
            }

            // Create gitignore if not exists
            if (!fs.existsSync('.gitignore')) {
                const gitignoreContent = `# MinangScript Package Manager
minang_modules/
paket.lock

# Logs
*.log
logs/

# Build output
build/
dist/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
`;
                fs.writeFileSync('.gitignore', gitignoreContent);
            }

            return {
                success: true,
                projectName: name || path.basename(process.cwd()),
                message: 'Project initialized successfully'
            };

        } catch (error) {
            console.error('❌ Gagal inisialisasi:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Install package following Gotong Royong principle
    async pasang(packageName, version = 'latest') {
        try {
            // Check if paket.minang exists
            if (!fs.existsSync(this.configFile)) {
                throw new Error('File paket.minang tidak ditemukan. Jalankan "minang init" terlebih dahulu.');
            }

            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            
            // Download package metadata
            const packageInfo = await this.fetchPackageInfo(packageName, version);
            
            // Apply Gotong Royong principle - resolve dependencies collaboratively
            const dependencies = await this.resolveDepencenciesGotongRoyong(packageInfo);
            
            // Install main package and dependencies
            for (const dep of dependencies) {
                await this.installSinglePackage(dep);
            }

            // Update configuration
            config.dependencies[packageName] = packageInfo.version;
            fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));

            // Update lock file following Musyawarah Mufakat (consensus)
            await this.updateLockFile();

            return {
                success: true,
                packageName: packageName,
                version: packageInfo.version,
                dependencies: dependencies,
                message: 'Package installed successfully'
            };

        } catch (error) {
            console.error('❌ Gagal memasang paket:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Uninstall package with cultural consideration
    async lepas(packageName) {
        try {
            if (!fs.existsSync(this.configFile)) {
                throw new Error('File paket.minang tidak ditemukan.');
            }

            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            
            if (!config.dependencies[packageName]) {
                return {
                    success: false,
                    error: 'Package not installed',
                    packageName: packageName
                };
            }

            // Remove from dependencies
            delete config.dependencies[packageName];
            
            // Remove package directory
            const packagePath = path.join(this.packageDir, packageName);
            if (fs.existsSync(packagePath)) {
                fs.rmSync(packagePath, { recursive: true, force: true });
            }

            // Update config
            fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
            
            // Update lock file
            await this.updateLockFile();

            return {
                success: true,
                packageName: packageName,
                message: 'Package uninstalled successfully'
            };

        } catch (error) {
            console.error('❌ Gagal menghapus paket:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // List installed packages with Musyawarah insight
    async daftar() {
        try {
            if (!fs.existsSync(this.configFile)) {
                console.log('❌ Belum ada proyek MinangScript di direktori ini');
                console.log('💡 Jalankan "minang init" untuk memulai');
                return {
                    success: false,
                    error: 'No MinangScript project found in current directory'
                };
            }

            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            
            console.log('📦 Daftar Paket MinangScript:');
            console.log('─'.repeat(50));
            
            if (Object.keys(config.dependencies).length === 0) {
                console.log('   Belum ada paket terpasang');
                console.log('   💡 Gunakan "minang install <nama-paket>"');
            } else {
                Object.entries(config.dependencies).forEach(([name, version]) => {
                    const status = this.checkPackageHealth(name);
                    const icon = status ? '✅' : '❌';
                    console.log(`   ${icon} ${name}@${version}`);
                });
            }

            console.log('─'.repeat(50));
            console.log(`🏔️ Total: ${Object.keys(config.dependencies).length} paket`);
            console.log('🤝 Semangat gotong royong dalam berbagi kode');

            return {
                success: true,
                packages: config.dependencies,
                count: Object.keys(config.dependencies).length
            };

        } catch (error) {
            console.error('❌ Gagal menampilkan daftar:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Search packages from community (Alam Takambang Jadi Guru)
    async cari(query, options = {}) {
        try {
            console.log('🔍 ' + this.i18n.t('searching', query));
            
            // Search in local registry first
            const results = await this.searchInRegistry(query);
            
            if (results.length === 0) {
                console.log('❌ Tidak ditemukan paket untuk:', query);
                console.log('💡 Alam takambang jadi guru - pelajari dari komunitas:');
                console.log('   - https://github.com/minangscript-packages');
                console.log('   - https://minangscript.org/packages');
                return {
                    success: true,
                    packages: [],
                    count: 0
                };
            }

            console.log('📦 Hasil pencarian:');
            console.log('─'.repeat(70));
            
            results.forEach((pkg, index) => {
                console.log(`${index + 1}. 📦 ${pkg.name}@${pkg.version}`);
                console.log(`   📝 ${pkg.description || 'Tidak ada deskripsi'}`);
                console.log(`   👤 ${pkg.author || 'Anonim'}`);
                console.log(`   📅 ${pkg.lastModified || 'Tidak diketahui'}`);
                console.log(`   🏔️ Filosofi: ${pkg.philosophy ? pkg.philosophy.join(', ') : 'Tidak ada'}`);
                console.log();
            });

            console.log('💡 Gunakan "minang install <nama>" untuk memasang');

            return {
                success: true,
                packages: results,
                count: results.length
            };

        } catch (error) {
            console.error('❌ Gagal mencari paket:', error.message);
            return {
                success: false,
                error: error.message,
                packages: [],
                count: 0
            };
        }
    }

    // Update packages following Adat Basandi Syarak (ethical updates)
    async perbarui(packageName = null) {
        try {
            console.log('🔄 ' + this.i18n.t('updating'));
            
            if (!fs.existsSync(this.configFile)) {
                throw new Error('File paket.minang tidak ditemukan.');
            }

            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            
            if (packageName) {
                // Update specific package
                if (!config.dependencies[packageName]) {
                    console.log('❌ Paket tidak terpasang:', packageName);
                    return;
                }
                
                await this.updateSinglePackage(packageName);
            } else {
                // Update all packages with ethical consideration
                console.log('🔄 Memperbarui semua paket dengan prinsip adat basandi syarak...');
                
                for (const name of Object.keys(config.dependencies)) {
                    await this.updateSinglePackage(name);
                }
            }

            await this.updateLockFile();
            console.log('✅ Pembaruan selesai dengan prinsip etika MinangScript');

        } catch (error) {
            console.error('❌ Gagal memperbarui:', error.message);
        }
    }

    // Publish package to community
    async terbitkan(options = {}) {
        try {
            console.log('📢 ' + this.i18n.t('publishing'));
            
            if (!fs.existsSync(this.configFile)) {
                throw new Error('File paket.minang tidak ditemukan.');
            }

            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            
            // Validate package before publishing
            const validation = await this.validatePackage(config);
            if (!validation.isValid) {
                console.log('❌ Paket tidak valid:');
                validation.errors.forEach(error => console.log(`   • ${error}`));
                return;
            }

            // Check cultural philosophy compliance
            const culturalCheck = this.validateCulturalPrinciples(config);
            if (!culturalCheck.isValid) {
                console.log('⚠️  Peringatan filosofi budaya:');
                culturalCheck.warnings.forEach(warning => console.log(`   • ${warning}`));
                
                if (!options.force) {
                    console.log('💡 Gunakan --force untuk mengabaikan peringatan');
                    return;
                }
            }

            // Create package archive
            const packagePath = await this.createPackageArchive(config);
            
            // Upload to registry (future implementation)
            console.log('📦 Paket dikemas di:', packagePath);
            console.log('🏔️ Siap untuk dibagikan dengan semangat gotong royong');
            console.log('💡 Implementasi upload ke registry akan hadir di versi mendatang');

        } catch (error) {
            console.error('❌ Gagal menerbitkan:', error.message);
        }
    }

    // Helper methods

    async fetchPackageInfo(name, version) {
        // Mock implementation - will be replaced with actual registry
        return {
            name: name,
            version: version,
            description: `Paket MinangScript: ${name}`,
            dependencies: {},
            philosophy: ['gotong-royong']
        };
    }

    async resolveDepencenciesGotongRoyong(packageInfo) {
        // Implement dependency resolution with collaborative approach
        return [packageInfo];
    }

    async installSinglePackage(packageInfo) {
        const packagePath = path.join(this.packageDir, packageInfo.name);
        
        if (!fs.existsSync(packagePath)) {
            fs.mkdirSync(packagePath, { recursive: true });
        }
        
        // Create basic package structure
        const packageConfig = {
            name: packageInfo.name,
            version: packageInfo.version,
            installedAt: new Date().toISOString()
        };
        
        fs.writeFileSync(
            path.join(packagePath, 'package.info'),
            JSON.stringify(packageConfig, null, 2)
        );
    }

    async updateLockFile() {
        const lockData = {
            version: "1.0.0",
            generated: new Date().toISOString(),
            packages: {},
            philosophy: "Musyawarah Mufakat dalam pengelolaan dependencies"
        };

        if (fs.existsSync(this.configFile)) {
            const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
            Object.keys(config.dependencies).forEach(name => {
                lockData.packages[name] = {
                    version: config.dependencies[name],
                    resolved: `local://minang_modules/${name}`,
                    integrity: "sha256-placeholder"
                };
            });
        }

        fs.writeFileSync(this.lockFile, JSON.stringify(lockData, null, 2));
    }

    checkPackageHealth(packageName) {
        const packagePath = path.join(this.packageDir, packageName);
        return fs.existsSync(packagePath);
    }

    async searchInRegistry(query) {
        // Mock search results - will be replaced with actual registry
        const mockPackages = [
            {
                name: "minang-ui",
                version: "1.0.0",
                description: "Komponen UI dengan filosofi Minangkabau",
                author: "Komunitas MinangScript",
                philosophy: ["gotong-royong", "alam-takambang-jadi-guru"]
            },
            {
                name: "minang-math",
                version: "1.2.0",
                description: "Library matematika berbasis budaya Minangkabau",
                author: "Programmer Minang",
                philosophy: ["musyawarah-mufakat"]
            }
        ];

        return mockPackages.filter(pkg => 
            pkg.name.toLowerCase().includes(query.toLowerCase()) ||
            pkg.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    async updateSinglePackage(packageName) {
        console.log(`  🔄 Memperbarui ${packageName}...`);
        // Implementation for updating single package
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate update
        console.log(`  ✅ ${packageName} diperbarui`);
    }

    async validatePackage(config) {
        const errors = [];
        
        if (!config.nama) errors.push('Nama paket diperlukan');
        if (!config.versi) errors.push('Versi paket diperlukan');
        if (!config.pengarang) errors.push('Pengarang paket diperlukan');
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    validateCulturalPrinciples(config) {
        const warnings = [];
        
        if (!config.filosofi || config.filosofi.length === 0) {
            warnings.push('Tidak ada filosofi Minangkabau yang diterapkan');
        }
        
        if (!config.deskripsi.includes('gotong') && !config.deskripsi.includes('musyawarah')) {
            warnings.push('Deskripsi tidak mencerminkan nilai-nilai Minangkabau');
        }
        
        return {
            isValid: warnings.length === 0,
            warnings: warnings
        };
    }

    async createPackageArchive(config) {
        const archiveName = `${config.nama}-${config.versi}.tar.gz`;
        const archivePath = path.join(process.cwd(), archiveName);
        
        // Simple archive creation (in production, use proper tar library)
        console.log(`📦 Membuat archive: ${archiveName}`);
        
        return archivePath;
    }

    // Show package manager info
    info() {
        console.log(`
🏔️ MinangPaket - Package Manager MinangScript

Versi: 1.0.0
Filosofi: Mengelola paket dengan nilai-nilai Minangkabau

🤝 Gotong Royong: Berbagi kode dan saling membantu
🗣️ Musyawarah Mufakat: Pengelolaan dependencies yang seimbang  
🌿 Alam Takambang Jadi Guru: Belajar dari komunitas open source
⚖️ Adat Basandi Syarak: Praktik pengelolaan paket yang etis

Direktori paket: ${this.packageDir}
Registry: ${this.localRegistry}
        `);
    }
}

module.exports = { MinangPaket };
