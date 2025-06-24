// MinangScript Performance Benchmarking Tool
// Tool untuk mengukur performa dengan filosofi Alam Takambang Jadi Guru

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { MinangLexer } = require('../lexer/MinangLexer');
const { MinangParser } = require('../parser/MinangParser');
const { MinangCompiler } = require('../compiler/MinangCompiler');
const { MinangRuntime } = require('../runtime/MinangRuntime');

class MinangBenchmark {
    constructor() {
        this.lexer = new MinangLexer();
        this.parser = new MinangParser();
        this.compiler = new MinangCompiler();
        this.runtime = new MinangRuntime();
        
        this.results = {
            lexer: [],
            parser: [],
            compiler: [],
            runtime: [],
            fullPipeline: []
        };
        
        this.testCases = this.generateTestCases();
    }

    generateTestCases() {
        return {
            simple: {
                name: 'Simple Variable Assignment',
                code: 'buek x = 42; cetak x;',
                iterations: 1000
            },
            
            function: {
                name: 'Function Declaration and Call',
                code: `
                    karojo tambah(a, b) {
                        jadi a + b;
                    }
                    buek hasil = tambah(5, 3);
                    cetak hasil;
                `,
                iterations: 500
            },
            
            loop: {
                name: 'For Loop with Operations',
                code: `
                    buek total = 0;
                    untuak (buek i = 0; i < 100; i++) {
                        total = total + i;
                    }
                    cetak total;
                `,
                iterations: 200
            },
            
            conditional: {
                name: 'Complex Conditional Logic',
                code: `
                    karojo cekNilai(n) {
                        kalau (n > 90) {
                            jadi "Sangat Baik";
                        } kalauLain (n > 80) {
                            jadi "Baik";
                        } kalauLain (n > 70) {
                            jadi "Cukup";
                        } lain {
                            jadi "Perlu Perbaikan";
                        }
                    }
                    
                    buek nilai = 85;
                    buek grade = cekNilai(nilai);
                    cetak grade;
                `,
                iterations: 300
            },
            
            cultural: {
                name: 'Cultural Philosophy Implementation',
                code: `
                    karojo implementasiGotongRoyong(anggota, tugas) {
                        buek distribusi = {};
                        untuak (buek i = 0; i < tugas.length; i++) {
                            buek anggotaIndex = i % anggota.length;
                            kalau (!distribusi[anggota[anggotaIndex]]) {
                                distribusi[anggota[anggotaIndex]] = [];
                            }
                            distribusi[anggota[anggotaIndex]].push(tugas[i]);
                        }
                        jadi distribusi;
                    }
                    
                    buek anggota = ["Ali", "Siti", "Budi"];
                    buek tugas = ["task1", "task2", "task3", "task4", "task5"];
                    buek hasil = implementasiGotongRoyong(anggota, tugas);
                    cetak hasil;
                `,
                iterations: 100
            },
            
            recursive: {
                name: 'Recursive Function (Fibonacci)',
                code: `
                    karojo fibonacci(n) {
                        kalau (n <= 1) {
                            jadi n;
                        }
                        jadi fibonacci(n - 1) + fibonacci(n - 2);
                    }
                    
                    buek result = fibonacci(15);
                    cetak result;
                `,
                iterations: 50
            },
            
            arrayOperations: {
                name: 'Array Operations and Methods',
                code: `
                    buek numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    buek doubled = [];
                    
                    untuak (buek i = 0; i < numbers.length; i++) {
                        doubled.push(numbers[i] * 2);
                    }
                    
                    buek sum = 0;
                    untuak (buek i = 0; i < doubled.length; i++) {
                        sum = sum + doubled[i];
                    }
                    
                    cetak sum;
                `,
                iterations: 200
            },
            
            objectManipulation: {
                name: 'Object Creation and Manipulation',
                code: `
                    karojo buatPerson(nama, umur, kota) {
                        jadi {
                            nama: nama,
                            umur: umur,
                            kota: kota,
                            perkenalan: karojo() {
                                jadi "Halo, saya " + this.nama + " dari " + this.kota;
                            }
                        };
                    }
                    
                    buek persons = [];
                    untuak (buek i = 0; i < 10; i++) {
                        buek person = buatPerson("Person" + i, 20 + i, "Kota" + i);
                        persons.push(person);
                    }
                    
                    cetak persons.length;
                `,
                iterations: 100
            }
        };
    }

    async benchmarkComponent(componentName, testCase, operation) {
        const results = [];
        const { code, iterations } = testCase;
        
        console.log(`\n🔥 Benchmarking ${componentName}: ${testCase.name}`);
        console.log(`📊 Running ${iterations} iterations...`);
        
        // Warm-up runs
        for (let i = 0; i < Math.min(10, iterations / 10); i++) {
            try {
                await operation(code);
            } catch (error) {
                // Ignore warm-up errors
            }
        }
        
        // Actual benchmark runs
        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();
            
            try {
                await operation(code);
                const endTime = performance.now();
                results.push(endTime - startTime);
            } catch (error) {
                console.warn(`⚠️ Error in iteration ${i + 1}: ${error.message}`);
                results.push(null);
            }
            
            // Progress indicator
            if ((i + 1) % Math.ceil(iterations / 10) === 0) {
                const progress = Math.round(((i + 1) / iterations) * 100);
                process.stdout.write(`\r⏳ Progress: ${progress}%`);
            }
        }
        
        console.log('\r✅ Complete!');
        
        // Filter out failed runs
        const validResults = results.filter(r => r !== null);
        
        if (validResults.length === 0) {
            console.log('❌ All iterations failed!');
            return null;
        }
        
        const stats = this.calculateStats(validResults);
        stats.successRate = (validResults.length / iterations) * 100;
        stats.componentName = componentName;
        stats.testName = testCase.name;
        
        return stats;
    }

    calculateStats(times) {
        const sorted = times.slice().sort((a, b) => a - b);
        const sum = times.reduce((a, b) => a + b, 0);
        
        return {
            min: sorted[0],
            max: sorted[sorted.length - 1],
            mean: sum / times.length,
            median: sorted[Math.floor(sorted.length / 2)],
            p95: sorted[Math.floor(sorted.length * 0.95)],
            p99: sorted[Math.floor(sorted.length * 0.99)],
            stdDev: this.calculateStdDev(times, sum / times.length),
            totalRuns: times.length
        };
    }

    calculateStdDev(times, mean) {
        const squaredDiffs = times.map(time => Math.pow(time - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / times.length;
        return Math.sqrt(avgSquaredDiff);
    }

    async runFullBenchmark() {
        console.log('🏔️ MinangScript Performance Benchmark');
        console.log('🌿 Alam Takambang Jadi Guru - Learning from Performance');
        console.log(''.padEnd(60, '='));

        const benchmarkStart = performance.now();

        for (const [testKey, testCase] of Object.entries(this.testCases)) {
            console.log(`\n📋 Test Case: ${testCase.name}`);
            console.log(''.padEnd(50, '-'));

            // Benchmark Lexer
            const lexerResult = await this.benchmarkComponent(
                'Lexer',
                testCase,
                (code) => this.lexer.tokenize(code)
            );
            if (lexerResult) this.results.lexer.push(lexerResult);

            // Benchmark Parser
            const parserResult = await this.benchmarkComponent(
                'Parser',
                testCase,
                (code) => {
                    const tokens = this.lexer.tokenize(code);
                    return this.parser.parse(code);
                }
            );
            if (parserResult) this.results.parser.push(parserResult);

            // Benchmark Compiler
            const compilerResult = await this.benchmarkComponent(
                'Compiler',
                testCase,
                (code) => this.compiler.compile(code)
            );
            if (compilerResult) this.results.compiler.push(compilerResult);

            // Benchmark Runtime
            const runtimeResult = await this.benchmarkComponent(
                'Runtime',
                testCase,
                async (code) => {
                    const compiled = this.compiler.compile(code);
                    if (compiled.success) {
                        return this.runtime.execute(compiled.code);
                    }
                    throw new Error('Compilation failed');
                }
            );
            if (runtimeResult) this.results.runtime.push(runtimeResult);

            // Benchmark Full Pipeline
            const pipelineResult = await this.benchmarkComponent(
                'Full Pipeline',
                testCase,
                async (code) => {
                    const tokens = this.lexer.tokenize(code);
                    const ast = this.parser.parse(code);
                    const compiled = this.compiler.compile(code);
                    if (compiled.success) {
                        return this.runtime.execute(compiled.code);
                    }
                    throw new Error('Pipeline failed');
                }
            );
            if (pipelineResult) this.results.fullPipeline.push(pipelineResult);
        }

        const benchmarkEnd = performance.now();
        const totalDuration = benchmarkEnd - benchmarkStart;

        this.printResults(totalDuration);
        this.generateReport();
        this.suggestOptimizations();

        return this.results;
    }

    printResults(totalDuration) {
        console.log('\n📊 Benchmark Results Summary');
        console.log(''.padEnd(60, '='));

        const components = ['lexer', 'parser', 'compiler', 'runtime', 'fullPipeline'];
        
        components.forEach(component => {
            const results = this.results[component];
            if (results.length === 0) return;

            console.log(`\n🔧 ${component.toUpperCase()} PERFORMANCE:`);
            console.log(''.padEnd(40, '-'));

            const avgMean = results.reduce((sum, r) => sum + r.mean, 0) / results.length;
            const avgSuccessRate = results.reduce((sum, r) => sum + r.successRate, 0) / results.length;

            console.log(`📈 Average Time: ${avgMean.toFixed(4)}ms`);
            console.log(`✅ Success Rate: ${avgSuccessRate.toFixed(2)}%`);

            // Find best and worst performing test
            const bestTest = results.reduce((best, current) => 
                current.mean < best.mean ? current : best
            );
            const worstTest = results.reduce((worst, current) => 
                current.mean > worst.mean ? current : worst
            );

            console.log(`🏆 Best: ${bestTest.testName} (${bestTest.mean.toFixed(4)}ms)`);
            console.log(`🐌 Slowest: ${worstTest.testName} (${worstTest.mean.toFixed(4)}ms)`);
        });

        console.log(`\n⏱️ Total Benchmark Duration: ${(totalDuration / 1000).toFixed(2)}s`);
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            environment: {
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                cpus: require('os').cpus().length,
                memory: Math.round(require('os').totalmem() / 1024 / 1024) + 'MB'
            },
            minangscriptVersion: '1.3.0',
            culturalPrinciple: 'Alam Takambang Jadi Guru - Learning from Performance',
            testCases: Object.keys(this.testCases),
            results: this.results,
            summary: this.generateSummary()
        };

        const reportPath = path.join(process.cwd(), 'benchmark-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\n📄 Detailed benchmark report saved to: ${reportPath}`);
    }

    generateSummary() {
        const summary = {};
        
        Object.keys(this.results).forEach(component => {
            const results = this.results[component];
            if (results.length === 0) return;

            summary[component] = {
                averageTime: results.reduce((sum, r) => sum + r.mean, 0) / results.length,
                averageSuccessRate: results.reduce((sum, r) => sum + r.successRate, 0) / results.length,
                testCount: results.length,
                performance: this.categorizePerformance(
                    results.reduce((sum, r) => sum + r.mean, 0) / results.length
                )
            };
        });

        return summary;
    }

    categorizePerformance(avgTime) {
        if (avgTime < 1) return 'Excellent';
        if (avgTime < 5) return 'Good';
        if (avgTime < 20) return 'Fair';
        if (avgTime < 100) return 'Poor';
        return 'Very Poor';
    }

    suggestOptimizations() {
        console.log('\n💡 Performance Optimization Suggestions');
        console.log('🌿 Alam Takambang Jadi Guru - Learning from Results');
        console.log(''.padEnd(60, '='));

        const suggestions = [];

        // Analyze lexer performance
        const lexerAvg = this.results.lexer.length > 0 ? 
            this.results.lexer.reduce((sum, r) => sum + r.mean, 0) / this.results.lexer.length : 0;
        
        if (lexerAvg > 10) {
            suggestions.push('🔤 Lexer: Consider optimizing token recognition patterns');
        }

        // Analyze parser performance
        const parserAvg = this.results.parser.length > 0 ? 
            this.results.parser.reduce((sum, r) => sum + r.mean, 0) / this.results.parser.length : 0;
        
        if (parserAvg > 20) {
            suggestions.push('📝 Parser: Consider implementing AST caching or parser optimizations');
        }

        // Analyze compiler performance
        const compilerAvg = this.results.compiler.length > 0 ? 
            this.results.compiler.reduce((sum, r) => sum + r.mean, 0) / this.results.compiler.length : 0;
        
        if (compilerAvg > 50) {
            suggestions.push('⚙️ Compiler: Consider implementing compilation caching');
        }

        // Analyze runtime performance
        const runtimeAvg = this.results.runtime.length > 0 ? 
            this.results.runtime.reduce((sum, r) => sum + r.mean, 0) / this.results.runtime.length : 0;
        
        if (runtimeAvg > 100) {
            suggestions.push('🏃 Runtime: Consider JIT compilation or runtime optimizations');
        }

        // General suggestions
        suggestions.push('🤝 Gotong Royong: Share optimization efforts across components');
        suggestions.push('🗣️ Musyawarah: Discuss performance targets with development team');
        suggestions.push('⚖️ Adat Basandi: Balance performance with code readability and ethics');

        if (suggestions.length === 0) {
            console.log('🎉 Performance is excellent! No immediate optimizations needed.');
        } else {
            suggestions.forEach((suggestion, index) => {
                console.log(`${index + 1}. ${suggestion}`);
            });
        }
    }

    // Quick performance test for development
    async quickBench(code, iterations = 100) {
        console.log(`🚀 Quick Benchmark: ${iterations} iterations`);
        
        const results = [];
        
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            
            try {
                const tokens = this.lexer.tokenize(code);
                const ast = this.parser.parse(code);
                const compiled = this.compiler.compile(code);
                if (compiled.success) {
                    this.runtime.execute(compiled.code);
                }
                
                results.push(performance.now() - start);
            } catch (error) {
                results.push(null);
            }
        }
        
        const validResults = results.filter(r => r !== null);
        if (validResults.length === 0) {
            console.log('❌ All iterations failed!');
            return {
                min: 0, max: 0, mean: 0, median: 0,
                p95: 0, p99: 0, stdDev: 0, totalRuns: 0
            };
        }
        const stats = this.calculateStats(validResults);
        
        console.log(`📊 Average: ${stats.mean.toFixed(4)}ms`);
        console.log(`📊 Median: ${stats.median.toFixed(4)}ms`);
        console.log(`📊 Min: ${stats.min.toFixed(4)}ms`);
        console.log(`📊 Max: ${stats.max.toFixed(4)}ms`);
        console.log(`📊 Success Rate: ${(validResults.length / iterations * 100).toFixed(2)}%`);
        
        return stats;
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    const benchmark = new MinangBenchmark();
    
    if (args.includes('--quick')) {
        const code = args.includes('--code') ? 
            args[args.indexOf('--code') + 1] : 
            'buek x = 42; cetak x;';
        
        const iterations = args.includes('--iterations') ? 
            parseInt(args[args.indexOf('--iterations') + 1]) : 100;
        
        await benchmark.quickBench(code, iterations);
    } else {
        await benchmark.runFullBenchmark();
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = MinangBenchmark;
