// MinangScript Advanced Testing Framework
// Framework Testing Canggih untuk MinangScript dengan Filosofi Budaya

const fs = require('fs');
const path = require('path');

class MinangTestFramework {
    constructor() {
        this.testSuites = [];
        this.currentSuite = null;
        this.results = {
            total: 0,
            passed: 0,
            failed: 0,
            skipped: 0,
            suites: []
        };
    }

    // Test suite creation
    suite(name, callback) {
        this.currentSuite = {
            name: name,
            tests: [],
            setup: null,
            teardown: null,
            beforeEach: null,
            afterEach: null
        };

        console.log(`\n🏔️ Test Suite: ${name}`);
        console.log(''.padEnd(50, '='));

        callback();
        this.testSuites.push(this.currentSuite);
        this.currentSuite = null;
    }

    // Test setup methods
    beforeAll(callback) {
        if (this.currentSuite) {
            this.currentSuite.setup = callback;
        }
    }

    afterAll(callback) {
        if (this.currentSuite) {
            this.currentSuite.teardown = callback;
        }
    }

    beforeEach(callback) {
        if (this.currentSuite) {
            this.currentSuite.beforeEach = callback;
        }
    }

    afterEach(callback) {
        if (this.currentSuite) {
            this.currentSuite.afterEach = callback;
        }
    }

    // Individual test method
    test(description, callback, options = {}) {
        if (!this.currentSuite) {
            throw new Error('Tests must be inside a suite');
        }

        const testCase = {
            description: description,
            callback: callback,
            timeout: options.timeout || 5000,
            skip: options.skip || false,
            only: options.only || false,
            culturalValidation: options.culturalValidation || false
        };

        this.currentSuite.tests.push(testCase);
    }

    // Test validation and reporting
    consensus(description, validators, expectedOutcome) {
        this.test(description, async () => {
            const results = [];
            
            for (const validator of validators) {
                try {
                    const result = await validator();
                    results.push({ validator: validator.name, result: result, passed: true });
                } catch (error) {
                    results.push({ validator: validator.name, error: error.message, passed: false });
                }
            }

            const passedCount = results.filter(r => r.passed).length;
            const consensusReached = passedCount >= Math.ceil(validators.length * 0.6); // 60% consensus

            if (consensusReached === expectedOutcome) {
                console.log(`✅ Consensus reached: ${passedCount}/${validators.length} validators agree`);
            } else {
                throw new Error(`Consensus not reached: ${passedCount}/${validators.length} validators agree, expected ${expectedOutcome ? 'consensus' : 'no consensus'}`);
            }

            return { consensusReached, results };
        }, { culturalValidation: true });
    }

    // Alam Takambang - Learning from test results
    adaptiveTest(description, learningCallback, testCallback) {
        this.test(description, async () => {
            let attempts = 0;
            const maxAttempts = 3;
            let lastError = null;

            while (attempts < maxAttempts) {
                try {
                    if (attempts > 0) {
                        console.log(`🌿 Learning from attempt ${attempts}, adapting test...`);
                        await learningCallback(lastError, attempts);
                    }
                    
                    const result = await testCallback();
                    
                    if (attempts > 0) {
                        console.log(`✅ Test passed after ${attempts + 1} attempts through adaptation`);
                    }
                    
                    return result;
                } catch (error) {
                    lastError = error;
                    attempts++;
                    
                    if (attempts >= maxAttempts) {
                        throw new Error(`Test failed after ${maxAttempts} adaptive attempts: ${error.message}`);
                    }
                }
            }
        }, { culturalValidation: true });
    }

    // Adat Basandi - Ethical testing validation
    ethicalTest(description, testCallback, ethicalChecks = []) {
        this.test(description, async () => {
            // Pre-test ethical validation
            for (const check of ethicalChecks.filter(c => c.when === 'before')) {
                const isEthical = await check.validate();
                if (!isEthical) {
                    throw new Error(`Ethical violation (before test): ${check.description}`);
                }
            }

            // Run the actual test
            const result = await testCallback();

            // Post-test ethical validation
            for (const check of ethicalChecks.filter(c => c.when === 'after')) {
                const isEthical = await check.validate(result);
                if (!isEthical) {
                    throw new Error(`Ethical violation (after test): ${check.description}`);
                }
            }

            console.log(`⚖️ Test passed ethical validation`);
            return result;
        }, { culturalValidation: true });
    }

    // Assertion methods with cultural context
    assert(condition, message, culturalContext = null) {
        if (!condition) {
            let errorMessage = message || 'Assertion failed';
            if (culturalContext) {
                errorMessage += ` (Cultural context: ${culturalContext})`;
            }
            throw new Error(errorMessage);
        }
    }

    assertEqual(actual, expected, message = null, culturalContext = null) {
        if (actual !== expected) {
            let errorMessage = message || `Expected ${expected}, but got ${actual}`;
            if (culturalContext) {
                errorMessage += ` (Cultural context: ${culturalContext})`;
            }
            throw new Error(errorMessage);
        }
    }

    assertDeepEqual(actual, expected, message = null) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(message || `Deep equality failed: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
        }
    }

    assertThrows(callback, expectedError = null, message = null) {
        try {
            callback();
            throw new Error(message || 'Expected function to throw an error');
        } catch (error) {
            if (expectedError && !error.message.includes(expectedError)) {
                throw new Error(`Expected error containing "${expectedError}", but got "${error.message}"`);
            }
        }
    }

    // Mock and spy utilities
    createMock(originalObject, overrides = {}) {
        const mock = { ...originalObject };
        Object.keys(overrides).forEach(key => {
            mock[key] = overrides[key];
        });
        mock._isMock = true;
        mock._calls = {};
        
        Object.keys(mock).forEach(key => {
            if (typeof mock[key] === 'function' && key !== 'constructor') {
                const originalFn = mock[key];
                mock[key] = (...args) => {
                    if (!mock._calls[key]) mock._calls[key] = [];
                    mock._calls[key].push(args);
                    return originalFn.apply(mock, args);
                };
            }
        });
        
        return mock;
    }

    spy(object, methodName) {
        const originalMethod = object[methodName];
        const calls = [];
        
        object[methodName] = (...args) => {
            calls.push({ args, timestamp: Date.now() });
            return originalMethod.apply(object, args);
        };
        
        object[methodName].calls = calls;
        object[methodName].restore = () => {
            object[methodName] = originalMethod;
        };
        
        return object[methodName];
    }

    // Main test runner
    async run() {
        console.log('\n🧪 MinangScript Testing Framework');
        console.log('🏔️ Testing with Minangkabau Cultural Principles');
        console.log(''.padEnd(60, '='));

        this.results.startTime = Date.now();

        for (const suite of this.testSuites) {
            await this.runSuite(suite);
        }

        this.results.endTime = Date.now();
        this.results.duration = this.results.endTime - this.results.startTime;

        this.printResults();
        this.generateReport();

        return this.results;
    }

    async runSuite(suite) {
        const suiteResult = {
            name: suite.name,
            culturalPrinciple: suite.culturalPrinciple,
            total: suite.tests.length,
            passed: 0,
            failed: 0,
            skipped: 0,
            tests: []
        };

        console.log(`\n📦 Running suite: ${suite.name}`);
        
        // Run setup
        if (suite.setup) {
            try {
                await suite.setup();
            } catch (error) {
                console.log(`❌ Suite setup failed: ${error.message}`);
                return;
            }
        }

        // Run tests
        for (const test of suite.tests) {
            if (test.skip) {
                console.log(`⏭️  ${test.description} (skipped)`);
                suiteResult.skipped++;
                this.results.skipped++;
                continue;
            }

            const testResult = await this.runTest(test, suite);
            suiteResult.tests.push(testResult);
            
            if (testResult.passed) {
                suiteResult.passed++;
                this.results.passed++;
            } else {
                suiteResult.failed++;
                this.results.failed++;
            }
            
            this.results.total++;
        }

        // Run teardown
        if (suite.teardown) {
            try {
                await suite.teardown();
            } catch (error) {
                console.log(`⚠️  Suite teardown failed: ${error.message}`);
            }
        }

        this.results.suites.push(suiteResult);
    }

    async runTest(test, suite) {
        const testResult = {
            description: test.description,
            passed: false,
            error: null,
            duration: 0,
            culturalValidation: test.culturalValidation
        };

        try {
            const startTime = Date.now();

            // Run beforeEach
            if (suite.beforeEach) {
                await suite.beforeEach();
            }

            // Run the test with timeout
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Test timeout')), test.timeout);
            });

            const testPromise = test.callback();
            await Promise.race([testPromise, timeoutPromise]);

            // Run afterEach
            if (suite.afterEach) {
                await suite.afterEach();
            }

            testResult.duration = Date.now() - startTime;
            testResult.passed = true;
            
            const culturalIcon = test.culturalValidation ? '🏔️ ' : '';
            console.log(`✅ ${culturalIcon}${test.description} (${testResult.duration}ms)`);

        } catch (error) {
            testResult.error = error.message;
            testResult.duration = Date.now() - (testResult.startTime || Date.now());
            
            const culturalIcon = test.culturalValidation ? '🏔️ ' : '';
            console.log(`❌ ${culturalIcon}${test.description}`);
            console.log(`   Error: ${error.message}`);
        }

        return testResult;
    }

    // Results and reporting
    printResults() {
        console.log('\n📊 Test Results Summary');
        console.log(''.padEnd(40, '='));
        console.log(`Total Tests: ${this.results.total}`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⏭️  Skipped: ${this.results.skipped}`);
        console.log(`⏱️  Duration: ${this.results.duration}ms`);

        const successRate = this.results.total > 0 ? 
            ((this.results.passed / this.results.total) * 100).toFixed(2) : 0;
        console.log(`📈 Success Rate: ${successRate}%`);

        // Cultural principles summary
        console.log('\n🏔️ Cultural Principles Applied:');
        Object.keys(this.culturalPrinciples).forEach(principle => {
            const applied = this.culturalPrinciples[principle];
            const icon = applied ? '✅' : '⭕';
            console.log(`${icon} ${principle}: ${this.getCulturalDescription(principle)}`);
        });

        if (this.results.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.suites.forEach(suite => {
                suite.tests.filter(t => !t.passed).forEach(test => {
                    console.log(`   ${suite.name}: ${test.description}`);
                    console.log(`     Error: ${test.error}`);
                });
            });
        }
    }

    generateReport() {
        const report = {
            framework: 'MinangScript Testing Framework',
            timestamp: new Date().toISOString(),
            culturalPrinciples: this.culturalPrinciples,
            summary: {
                total: this.results.total,
                passed: this.results.passed,
                failed: this.results.failed,
                skipped: this.results.skipped,
                successRate: this.results.total > 0 ? 
                    ((this.results.passed / this.results.total) * 100) : 0,
                duration: this.results.duration
            },
            suites: this.results.suites
        };

        const reportPath = path.join(process.cwd(), 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\n📄 Test report saved to: ${reportPath}`);
    }
}

// Global instance for easy access
const minangTest = new MinangTestFramework();

// Export methods for global use
global.suite = minangTest.suite.bind(minangTest);
global.test = minangTest.test.bind(minangTest);
global.beforeAll = minangTest.beforeAll.bind(minangTest);
global.afterAll = minangTest.afterAll.bind(minangTest);
global.beforeEach = minangTest.beforeEach.bind(minangTest);
global.afterEach = minangTest.afterEach.bind(minangTest);
global.consensus = minangTest.consensus.bind(minangTest);
global.adaptiveTest = minangTest.adaptiveTest.bind(minangTest);
global.ethicalTest = minangTest.ethicalTest.bind(minangTest);
global.assert = minangTest.assert.bind(minangTest);
global.assertEqual = minangTest.assertEqual.bind(minangTest);
global.assertDeepEqual = minangTest.assertDeepEqual.bind(minangTest);
global.assertThrows = minangTest.assertThrows.bind(minangTest);
global.createMock = minangTest.createMock.bind(minangTest);
global.spy = minangTest.spy.bind(minangTest);

module.exports = MinangTestFramework;
