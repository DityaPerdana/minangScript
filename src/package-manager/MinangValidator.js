// MinangScript Package Validator
// Validates packages according to Minangkabau cultural principles

const fs = require('fs');
const path = require('path');
const { MinangLexer } = require('../lexer/MinangLexer');
const { MinangParser } = require('../parser/MinangParser');

class MinangValidator {
    constructor() {
        this.lexer = new MinangLexer();
        this.parser = new MinangParser();
        this.culturalPrinciples = {
            'gotong-royong': {
                name: 'Gotong Royong',
                description: 'Kerja sama dan saling membantu',
                keywords: ['gotongRoyong', 'kolaborasi', 'bersama', 'tolong']
            },
            'musyawarah-mufakat': {
                name: 'Musyawarah Mufakat',
                description: 'Pengambilan keputusan bersama',
                keywords: ['musyawarah', 'mufakat', 'keputusan', 'diskusi']
            },
            'alam-takambang-jadi-guru': {
                name: 'Alam Takambang Jadi Guru',
                description: 'Belajar dari alam dan pengalaman',
                keywords: ['alamTakambang', 'belajar', 'adaptif', 'observasi']
            },
            'adat-basandi-syarak': {
                name: 'Adat Basandi Syarak',
                description: 'Praktik berdasarkan etika dan moral',
                keywords: ['adatBasandi', 'etika', 'moral', 'keadilan']
            }
        };
    }

    // Validate package configuration
    async validatePackage(packagePath) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            culturalScore: 0,
            recommendations: []
        };

        try {
            console.log('🔍 Memvalidasi paket MinangScript...');
            
            // Check package structure
            const structureValidation = await this.validateStructure(packagePath);
            validation.errors.push(...structureValidation.errors);
            validation.warnings.push(...structureValidation.warnings);

            // Validate configuration file
            const configValidation = await this.validateConfiguration(packagePath);
            validation.errors.push(...configValidation.errors);
            validation.warnings.push(...configValidation.warnings);

            // Validate MinangScript code (skip config files)
            const codeValidation = await this.validateMinangScriptCode(packagePath);
            validation.errors.push(...codeValidation.errors);
            validation.warnings.push(...codeValidation.warnings);

            // Validate cultural principles
            const culturalValidation = await this.validateCulturalPrinciples(packagePath);
            validation.culturalScore = culturalValidation.score;
            validation.warnings.push(...culturalValidation.warnings);
            validation.recommendations.push(...culturalValidation.recommendations);

            // Validate documentation
            const docValidation = await this.validateDocumentation(packagePath);
            validation.warnings.push(...docValidation.warnings);
            validation.recommendations.push(...docValidation.recommendations);

            validation.isValid = validation.errors.length === 0;

            return validation;

        } catch (error) {
            validation.isValid = false;
            validation.errors.push(`Error validasi: ${error.message}`);
            return validation;
        }
    }

    async validateStructure(packagePath) {
        const validation = { errors: [], warnings: [] };
        
        // Required files
        const requiredFiles = ['paket.minang', 'main.minang'];
        const recommendedFiles = ['README.md', 'CHANGELOG.md', 'LICENSE'];
        
        for (const file of requiredFiles) {
            const filePath = path.join(packagePath, file);
            if (!fs.existsSync(filePath)) {
                validation.errors.push(`File wajib tidak ditemukan: ${file}`);
            }
        }

        for (const file of recommendedFiles) {
            const filePath = path.join(packagePath, file);
            if (!fs.existsSync(filePath)) {
                validation.warnings.push(`File rekomendasi tidak ada: ${file}`);
            }
        }

        // Check directory structure
        const recommendedDirs = ['src', 'test', 'docs', 'examples'];
        for (const dir of recommendedDirs) {
            const dirPath = path.join(packagePath, dir);
            if (!fs.existsSync(dirPath)) {
                validation.warnings.push(`Direktori rekomendasi tidak ada: ${dir}`);
            }
        }

        return validation;
    }

    async validateConfiguration(packagePath) {
        const validation = { errors: [], warnings: [] };
        const configPath = path.join(packagePath, 'paket.minang');
        
        if (!fs.existsSync(configPath)) {
            validation.errors.push('File paket.minang tidak ditemukan');
            return validation;
        }

        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            
            // Required fields
            const requiredFields = ['nama', 'versi', 'deskripsi', 'pengarang'];
            for (const field of requiredFields) {
                if (!config[field]) {
                    validation.errors.push(`Field wajib tidak ada: ${field}`);
                }
            }

            // Version format validation
            if (config.versi && !this.isValidVersion(config.versi)) {
                validation.errors.push(`Format versi tidak valid: ${config.versi}`);
            }

            // Cultural principles validation
            if (!config.filosofi || config.filosofi.length === 0) {
                validation.warnings.push('Tidak ada filosofi Minangkabau yang didefinisikan');
            } else {
                const invalidPhilosophies = config.filosofi.filter(p => 
                    !this.culturalPrinciples[p]
                );
                if (invalidPhilosophies.length > 0) {
                    validation.warnings.push(`Filosofi tidak dikenal: ${invalidPhilosophies.join(', ')}`);
                }
            }

            // License validation
            if (!config.lisensi) {
                validation.warnings.push('Lisensi tidak ditentukan');
            }

            // Dependencies validation
            if (config.dependencies) {
                for (const [dep, version] of Object.entries(config.dependencies)) {
                    if (!this.isValidVersion(version)) {
                        validation.warnings.push(`Versi dependency tidak valid: ${dep}@${version}`);
                    }
                }
            }

        } catch (error) {
            validation.errors.push(`Error parsing paket.minang: ${error.message}`);
        }

        return validation;
    }

    async validateMinangScriptCode(packagePath) {
        const validation = { errors: [], warnings: [] };
        
        // Find all .minang files (exclude config files)
        const minangFiles = this.findMinangFiles(packagePath).filter(file => 
            !file.endsWith('paket.minang') && !file.includes('/paket.minang')
        );
        
        if (minangFiles.length === 0) {
            validation.warnings.push('Tidak ada file .minang ditemukan');
            return validation;
        }

        for (const file of minangFiles) {
            try {
                const code = fs.readFileSync(file, 'utf8');
                
                // Lexical analysis
                const tokens = this.lexer.tokenize(code);
                if (tokens.length === 0) {
                    validation.warnings.push(`File kosong atau tidak valid: ${path.relative(packagePath, file)}`);
                    continue;
                }

                // Syntax analysis
                try {
                    this.parser.parse(code);
                } catch (parseError) {
                    validation.errors.push(`Syntax error di ${path.relative(packagePath, file)}: ${parseError.message}`);
                }

                // Cultural function usage analysis
                const culturalUsage = this.analyzeCulturalUsage(code);
                if (culturalUsage.score === 0) {
                    validation.warnings.push(`File ${path.relative(packagePath, file)} tidak menggunakan fungsi budaya Minangkabau`);
                }

            } catch (error) {
                validation.errors.push(`Error membaca file ${path.relative(packagePath, file)}: ${error.message}`);
            }
        }

        return validation;
    }

    async validateCulturalPrinciples(packagePath) {
        const validation = { score: 0, warnings: [], recommendations: [] };
        
        // Read configuration
        const configPath = path.join(packagePath, 'paket.minang');
        if (!fs.existsSync(configPath)) {
            return validation;
        }

        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            
            // Check declared philosophies
            const declaredPhilosophies = config.filosofi || [];
            validation.score += declaredPhilosophies.length * 10;

            // Analyze code for cultural implementation
            const minangFiles = this.findMinangFiles(packagePath);
            let totalCulturalUsage = 0;
            let fileCount = 0;

            for (const file of minangFiles) {
                try {
                    const code = fs.readFileSync(file, 'utf8');
                    const culturalUsage = this.analyzeCulturalUsage(code);
                    totalCulturalUsage += culturalUsage.score;
                    fileCount++;
                } catch (error) {
                    // Skip files with errors
                }
            }

            if (fileCount > 0) {
                const avgCulturalUsage = totalCulturalUsage / fileCount;
                validation.score += avgCulturalUsage;
            }

            // Check documentation for cultural references
            const readmePath = path.join(packagePath, 'README.md');
            if (fs.existsSync(readmePath)) {
                const readme = fs.readFileSync(readmePath, 'utf8').toLowerCase();
                let culturalMentions = 0;
                
                Object.keys(this.culturalPrinciples).forEach(principle => {
                    if (readme.includes(principle) || readme.includes(this.culturalPrinciples[principle].name.toLowerCase())) {
                        culturalMentions++;
                    }
                });
                
                validation.score += culturalMentions * 5;
            }

            // Generate recommendations based on score
            if (validation.score < 20) {
                validation.warnings.push('Skor budaya rendah - pertimbangkan untuk mengintegrasikan lebih banyak nilai Minangkabau');
                validation.recommendations.push('Tambahkan fungsi gotongRoyong() untuk kolaborasi');
                validation.recommendations.push('Gunakan musyawarah() untuk pengambilan keputusan');
                validation.recommendations.push('Implementasikan alamTakambang() untuk pembelajaran adaptif');
            } else if (validation.score < 40) {
                validation.recommendations.push('Dokumentasikan implementasi filosofi Minangkabau di README');
                validation.recommendations.push('Pertimbangkan menambahkan lebih banyak prinsip budaya');
            } else {
                validation.recommendations.push('Excellent! Paket ini mencerminkan nilai-nilai Minangkabau dengan baik');
            }

        } catch (error) {
            validation.warnings.push(`Error validasi budaya: ${error.message}`);
        }

        return validation;
    }

    async validateDocumentation(packagePath) {
        const validation = { warnings: [], recommendations: [] };
        
        // Check README.md
        const readmePath = path.join(packagePath, 'README.md');
        if (fs.existsSync(readmePath)) {
            const readme = fs.readFileSync(readmePath, 'utf8');
            
            if (readme.length < 200) {
                validation.warnings.push('README.md terlalu pendek - pertimbangkan menambah dokumentasi');
            }

            // Check for required sections
            const requiredSections = ['installation', 'usage', 'example'];
            const missingSections = requiredSections.filter(section => 
                !readme.toLowerCase().includes(section)
            );
            
            if (missingSections.length > 0) {
                validation.recommendations.push(`Tambahkan section: ${missingSections.join(', ')}`);
            }

            // Check for cultural documentation
            const culturalTerms = Object.keys(this.culturalPrinciples);
            const hasCulturalDoc = culturalTerms.some(term => 
                readme.toLowerCase().includes(term.replace('-', ' '))
            );
            
            if (!hasCulturalDoc) {
                validation.recommendations.push('Jelaskan implementasi filosofi Minangkabau dalam dokumentasi');
            }
        } else {
            validation.warnings.push('README.md tidak ditemukan');
        }

        // Check for changelog
        const changelogPath = path.join(packagePath, 'CHANGELOG.md');
        if (!fs.existsSync(changelogPath)) {
            validation.recommendations.push('Tambahkan CHANGELOG.md untuk tracking perubahan');
        }

        // Check for license
        const licensePath = path.join(packagePath, 'LICENSE');
        if (!fs.existsSync(licensePath)) {
            validation.recommendations.push('Tambahkan file LICENSE');
        }

        return validation;
    }

    findMinangFiles(packagePath) {
        const files = [];
        
        const walkDir = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'minang_modules') {
                    walkDir(fullPath);
                } else if (stat.isFile() && item.endsWith('.minang')) {
                    files.push(fullPath);
                }
            }
        };
        
        try {
            walkDir(packagePath);
        } catch (error) {
            // Handle permission errors gracefully
        }
        
        return files;
    }

    analyzeCulturalUsage(code) {
        let score = 0;
        const usage = {
            gotongRoyong: 0,
            musyawarah: 0,
            alamTakambang: 0,
            adatBasandi: 0
        };

        // Check for cultural function calls
        if (code.includes('gotongRoyong(')) {
            usage.gotongRoyong++;
            score += 10;
        }
        
        if (code.includes('musyawarah(')) {
            usage.musyawarah++;
            score += 10;
        }
        
        if (code.includes('alamTakambang(')) {
            usage.alamTakambang++;
            score += 10;
        }
        
        if (code.includes('adatBasandi(')) {
            usage.adatBasandi++;
            score += 10;
        }

        // Check for cultural comments
        const culturalComments = [
            'gotong royong', 'musyawarah', 'mufakat', 
            'alam takambang', 'adat basandi', 'syarak'
        ];
        
        culturalComments.forEach(comment => {
            if (code.toLowerCase().includes(comment)) {
                score += 2;
            }
        });

        return { score, usage };
    }

    isValidVersion(version) {
        // Semantic versioning validation
        const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
        return semverRegex.test(version) || version === 'latest';
    }

    // Generate validation report
    generateReport(validation, packageName) {
        const report = [];
        
        report.push('🏔️ Laporan Validasi MinangScript');
        report.push('═'.repeat(50));
        report.push(`📦 Paket: ${packageName}`);
        report.push(`✅ Status: ${validation.isValid ? 'VALID' : 'TIDAK VALID'}`);
        report.push(`🎯 Skor Budaya: ${validation.culturalScore}/100`);
        report.push('');

        if (validation.errors.length > 0) {
            report.push('❌ ERROR:');
            validation.errors.forEach(error => {
                report.push(`   • ${error}`);
            });
            report.push('');
        }

        if (validation.warnings.length > 0) {
            report.push('⚠️  PERINGATAN:');
            validation.warnings.forEach(warning => {
                report.push(`   • ${warning}`);
            });
            report.push('');
        }

        if (validation.recommendations.length > 0) {
            report.push('💡 REKOMENDASI:');
            validation.recommendations.forEach(rec => {
                report.push(`   • ${rec}`);
            });
            report.push('');
        }

        report.push('🏔️ Filosofi Minangkabau dalam Kode:');
        Object.entries(this.culturalPrinciples).forEach(([key, principle]) => {
            const icon = validation.culturalScore > 20 ? '✅' : '⭕';
            report.push(`   ${icon} ${principle.name} - ${principle.description}`);
        });

        return report.join('\n');
    }
}

module.exports = { MinangValidator };
