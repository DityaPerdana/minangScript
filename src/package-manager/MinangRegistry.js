// MinangScript Package Registry Manager
// Manages package repositories and registries

const fs = require('fs');
const path = require('path');
const https = require('https');
const { MinangConfig } = require('../utils/config');

class MinangRegistry {
    constructor() {
        this.config = new MinangConfig();
        this.registries = {
            official: 'https://registry.minangscript.org',
            community: 'https://community.minangscript.org',
            local: path.join(process.cwd(), '.minang-registry')
        };
        this.cacheDir = path.join(require('os').homedir(), '.minangscript', 'cache');
        this.ensureCacheDir();
    }

    ensureCacheDir() {
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    // Search packages across all registries
    async search(query, options = {}) {
        console.log('🔍 Mencari paket di registry...');
        
        const results = [];
        
        // Search in local registry first
        const localResults = await this.searchLocal(query);
        results.push(...localResults);
        
        // Search in community registry
        const communityResults = await this.searchCommunity(query);
        results.push(...communityResults);
        
        // Search in official registry (when available)
        try {
            const officialResults = await this.searchOfficial(query);
            results.push(...officialResults);
        } catch (error) {
            console.log('ℹ️  Registry resmi belum tersedia');
        }

        // Remove duplicates and sort by relevance
        const uniqueResults = this.deduplicateResults(results);
        return this.sortByRelevance(uniqueResults, query);
    }

    async searchLocal(query) {
        const localRegistry = this.registries.local;
        
        if (!fs.existsSync(localRegistry)) {
            return [];
        }

        try {
            const packages = [];
            const registryFiles = fs.readdirSync(localRegistry);
            
            for (const file of registryFiles) {
                if (file.endsWith('.json')) {
                    const packagePath = path.join(localRegistry, file);
                    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                    
                    if (this.matchesQuery(packageData, query)) {
                        packages.push({
                            ...packageData,
                            source: 'local',
                            location: packagePath
                        });
                    }
                }
            }
            
            return packages;
        } catch (error) {
            console.warn('⚠️  Error searching local registry:', error.message);
            return [];
        }
    }

    async searchCommunity(query) {
        // Mock community packages - in production, this would query a real API
        const communityPackages = [
            {
                name: 'minang-ui',
                version: '1.0.0',
                description: 'Komponen UI dengan filosofi Minangkabau',
                author: 'Komunitas MinangScript',
                keywords: ['ui', 'components', 'minangkabau'],
                philosophy: ['gotong-royong', 'alam-takambang-jadi-guru'],
                repository: 'https://github.com/minangscript/minang-ui',
                source: 'community'
            },
            {
                name: 'minang-math',
                version: '1.2.0',
                description: 'Library matematika berbasis budaya Minangkabau',
                author: 'Programmer Minang',
                keywords: ['math', 'mathematics', 'calculation'],
                philosophy: ['musyawarah-mufakat'],
                repository: 'https://github.com/minangscript/minang-math',
                source: 'community'
            },
            {
                name: 'nagari-system',
                version: '2.0.0',
                description: 'Sistem manajemen nagari digital',
                author: 'Tim Nagari Digital',
                keywords: ['nagari', 'management', 'digital', 'village'],
                philosophy: ['adat-basandi-syarak', 'musyawarah-mufakat'],
                repository: 'https://github.com/minangscript/nagari-system',
                source: 'community'
            },
            {
                name: 'minang-web',
                version: '1.5.0',
                description: 'Framework web dengan nilai-nilai Minangkabau',
                author: 'Web Minang Team',
                keywords: ['web', 'framework', 'http', 'server'],
                philosophy: ['gotong-royong'],
                repository: 'https://github.com/minangscript/minang-web',
                source: 'community'
            }
        ];

        return communityPackages.filter(pkg => this.matchesQuery(pkg, query));
    }

    async searchOfficial(query) {
        // Future implementation for official registry
        return [];
    }

    matchesQuery(packageData, query) {
        const searchText = query.toLowerCase();
        
        return (
            packageData.name.toLowerCase().includes(searchText) ||
            packageData.description.toLowerCase().includes(searchText) ||
            (packageData.keywords && packageData.keywords.some(k => k.toLowerCase().includes(searchText))) ||
            (packageData.philosophy && packageData.philosophy.some(p => p.toLowerCase().includes(searchText)))
        );
    }

    deduplicateResults(results) {
        const seen = new Set();
        return results.filter(pkg => {
            const key = `${pkg.name}@${pkg.version}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    sortByRelevance(results, query) {
        return results.sort((a, b) => {
            const scoreA = this.calculateRelevanceScore(a, query);
            const scoreB = this.calculateRelevanceScore(b, query);
            return scoreB - scoreA;
        });
    }

    calculateRelevanceScore(pkg, query) {
        let score = 0;
        const lowerQuery = query.toLowerCase();
        
        // Exact name match gets highest score
        if (pkg.name.toLowerCase() === lowerQuery) {
            score += 100;
        } else if (pkg.name.toLowerCase().includes(lowerQuery)) {
            score += 50;
        }
        
        // Description match
        if (pkg.description.toLowerCase().includes(lowerQuery)) {
            score += 20;
        }
        
        // Keywords match
        if (pkg.keywords) {
            score += pkg.keywords.filter(k => k.toLowerCase().includes(lowerQuery)).length * 10;
        }
        
        // Philosophy match (cultural relevance)
        if (pkg.philosophy) {
            score += pkg.philosophy.filter(p => p.toLowerCase().includes(lowerQuery)).length * 15;
        }
        
        return score;
    }

    // Get package metadata
    async getPackageInfo(name, version = 'latest') {
        console.log(`📦 Mendapatkan informasi paket: ${name}@${version}`);
        
        // Check cache first
        const cacheKey = `${name}@${version}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log('💾 Menggunakan cache');
            return cached;
        }

        // Search across registries
        const searchResults = await this.search(name);
        const exactMatch = searchResults.find(pkg => 
            pkg.name === name && (version === 'latest' || pkg.version === version)
        );

        if (!exactMatch) {
            throw new Error(`Paket tidak ditemukan: ${name}@${version}`);
        }

        // Get detailed package information
        const packageInfo = await this.fetchPackageDetails(exactMatch);
        
        // Cache the result
        this.saveToCache(cacheKey, packageInfo);
        
        return packageInfo;
    }

    async fetchPackageDetails(packageRef) {
        // Mock implementation - in production, this would fetch from actual registry
        const details = {
            ...packageRef,
            dependencies: {},
            devDependencies: {},
            scripts: {
                main: 'main.minang',
                test: 'test/*.minang'
            },
            files: ['src/', '*.minang', 'README.md'],
            downloadUrl: `${packageRef.repository}/archive/v${packageRef.version}.tar.gz`,
            integrity: 'sha256-' + Math.random().toString(36).substring(2, 15),
            lastModified: new Date().toISOString()
        };

        return details;
    }

    getFromCache(key) {
        const cacheFile = path.join(this.cacheDir, `${key}.json`);
        
        if (fs.existsSync(cacheFile)) {
            try {
                const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
                
                // Check if cache is expired (24 hours)
                const cacheTime = new Date(cached.cachedAt);
                const now = new Date();
                const hoursDiff = (now - cacheTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
                    return cached.data;
                }
            } catch (error) {
                // Cache corrupted, ignore
            }
        }
        
        return null;
    }

    saveToCache(key, data) {
        const cacheFile = path.join(this.cacheDir, `${key}.json`);
        const cacheData = {
            cachedAt: new Date().toISOString(),
            data: data
        };
        
        try {
            fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
        } catch (error) {
            console.warn('⚠️  Gagal menyimpan cache:', error.message);
        }
    }

    // Add package to local registry
    async addToLocalRegistry(packageData) {
        const localRegistry = this.registries.local;
        
        if (!fs.existsSync(localRegistry)) {
            fs.mkdirSync(localRegistry, { recursive: true });
        }
        
        const packageFile = path.join(localRegistry, `${packageData.name}.json`);
        fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
        
        console.log(`✅ Paket ditambahkan ke registry lokal: ${packageData.name}`);
    }

    // Remove package from local registry
    async removeFromLocalRegistry(packageName) {
        const localRegistry = this.registries.local;
        const packageFile = path.join(localRegistry, `${packageName}.json`);
        
        if (fs.existsSync(packageFile)) {
            fs.unlinkSync(packageFile);
            console.log(`✅ Paket dihapus dari registry lokal: ${packageName}`);
        }
    }

    // List all available registries
    listRegistries() {
        console.log('🏔️ Registry MinangScript:');
        console.log('─'.repeat(50));
        
        Object.entries(this.registries).forEach(([name, url]) => {
            const status = this.checkRegistryStatus(name);
            const icon = status ? '✅' : '❌';
            console.log(`   ${icon} ${name.padEnd(15)} ${url}`);
        });
        
        console.log('─'.repeat(50));
        console.log('💡 Gunakan "minang paket registry" untuk mengelola registry');
    }

    checkRegistryStatus(name) {
        if (name === 'local') {
            return fs.existsSync(this.registries.local);
        }
        // For remote registries, we'd do an actual health check
        return name === 'community'; // Mock: community is available
    }

    // Clear cache
    clearCache() {
        if (fs.existsSync(this.cacheDir)) {
            const files = fs.readdirSync(this.cacheDir);
            files.forEach(file => {
                fs.unlinkSync(path.join(this.cacheDir, file));
            });
            console.log('✅ Cache dibersihkan');
        }
    }

    // Get cache statistics
    getCacheStats() {
        if (!fs.existsSync(this.cacheDir)) {
            return { files: 0, size: 0 };
        }
        
        const files = fs.readdirSync(this.cacheDir);
        let totalSize = 0;
        
        files.forEach(file => {
            const stats = fs.statSync(path.join(this.cacheDir, file));
            totalSize += stats.size;
        });
        
        return {
            files: files.length,
            size: totalSize,
            sizeFormatted: this.formatBytes(totalSize)
        };
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

module.exports = { MinangRegistry };
