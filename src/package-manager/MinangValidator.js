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
    }

    // Validate package configuration
    async validatePackage(packagePath) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            qualityScore: 0,
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

            // Validate code quality
            const qualityValidation = await this.validateCodeQuality(packagePath);
            validation.qualityScore = qualityValidation.score;
            validation.warnings.push(...qualityValidation.warnings);
            validation.recommendations.push(...qualityValidation.recommendations);

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

            // Quality validation
            if (!config.filosofi || config.filosofi.length === 0) {
                validation.warnings.push('Consider defining development principles');
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

                // Code quality analysis
                const qualityMetrics = this.analyzeCodeMetrics(code);
                if (qualityMetrics.score === 0) {
                    validation.warnings.push(`File ${path.relative(packagePath, file)} tidak menggunakan fungsi budaya Minangkabau`);
                }

            } catch (error) {
                validation.errors.push(`Error membaca file ${path.relative(packagePath, file)}: ${error.message}`);
            }
        }

        return validation;
    }

    async validateCodeQuality(packagePath) {
        const validation = { score: 0, warnings: [], recommendations: [] };
        
        // Read configuration
        const configPath = path.join(packagePath, 'paket.minang');
        if (!fs.existsSync(configPath)) {
            return validation;
        }

        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            
            // Check basic quality metrics
            const qualityFeatures = config.features || [];
            validation.score += qualityFeatures.length * 10;

            // Analyze code for quality implementation
            const minangFiles = this.findMinangFiles(packagePath);
            let totalQualityScore = 0;
            let fileCount = 0;

            for (const file of minangFiles) {
                try {
                    const code = fs.readFileSync(file, 'utf8');
                    const qualityMetrics = this.analyzeCodeMetrics(code);
                    totalQualityScore += qualityMetrics.score;
                    fileCount++;
                } catch (error) {
                    // Skip files with errors
                }
            }

            if (fileCount > 0) {
                const avgQualityScore = totalQualityScore / fileCount;
                validation.score += avgQualityScore;
            }

            // Check documentation quality
            const readmePath = path.join(packagePath, 'README.md');
            if (fs.existsSync(readmePath)) {
                const readme = fs.readFileSync(readmePath, 'utf8').toLowerCase();
                let qualityMentions = 0;
                
                const qualityKeywords = ['example', 'usage', 'installation', 'api', 'documentation'];
                qualityKeywords.forEach(keyword => {
                    if (readme.includes(keyword)) {
                        qualityMentions++;
                    }
                });
                
                validation.score += qualityMentions * 5;
            }

            // Generate recommendations based on score
            if (validation.score < 20) {
                validation.warnings.push('Low quality score - consider improving code structure');
                validation.recommendations.push('Add proper documentation and examples');
                validation.recommendations.push('Improve code structure and organization');
                validation.recommendations.push('Add error handling where appropriate');
            } else if (validation.score < 40) {
                validation.recommendations.push('Document implementation details in README');
                validation.recommendations.push('Consider adding more examples and comments');
            } else {
                validation.recommendations.push('Good code quality! Keep up the excellent work');
            }

        } catch (error) {
            validation.warnings.push(`Error in quality validation: ${error.message}`);
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

    analyzeCodeMetrics(code) {
        let score = 0;
        const metrics = {
            functions: 0,
            comments: 0,
            documentation: 0,
            errorHandling: 0
        };

        // Check for function definitions
        const functionMatches = code.match(/karojo\s+\w+/g) || [];
        metrics.functions = functionMatches.length;
        score += functionMatches.length * 5;
        
        // Check for comments
        const commentMatches = code.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || [];
        metrics.comments = commentMatches.length;
        score += Math.min(commentMatches.length * 2, 20); // Cap at 20 points
        
        // Check for error handling
        if (code.includes('cubo(') && code.includes('tangkok(')) {
            metrics.errorHandling++;
            score += 10;
        }
        
        // Check for documentation strings
        const docStrings = code.match(/"""[\s\S]*?"""|'''[\s\S]*?'''/g) || [];
        metrics.documentation = docStrings.length;
        score += docStrings.length * 5;

        return { score, metrics };
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
