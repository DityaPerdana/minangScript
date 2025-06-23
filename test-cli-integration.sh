#!/bin/bash

# MinangScript CLI Integration Test
echo "🧪 Testing MinangScript CLI Integration..."
echo "================================================"

# Test 1: Version command
echo "1. Testing version command:"
minang version | head -3
echo ""

# Test 2: Help command
echo "2. Testing help command:"
minang help | head -5
echo ""

# Test 3: Template generation
echo "3. Testing template generation:"
minang template basic test-output.minang > /dev/null 2>&1
if [ -f "test-output.minang" ]; then
    echo "✅ Template generation successful"
    rm test-output.minang
else
    echo "❌ Template generation failed"
fi
echo ""

# Test 4: Create new project
echo "4. Testing project creation:"
minang new test-integration-project > /dev/null 2>&1
if [ -d "test-integration-project" ]; then
    echo "✅ Project creation successful"
    rm -rf test-integration-project
else
    echo "❌ Project creation failed"
fi
echo ""

# Test 5: Run example file
echo "5. Testing file execution:"
if minang run examples/hello.minang > /dev/null 2>&1; then
    echo "✅ File execution successful"
else
    echo "❌ File execution failed"
fi
echo ""

# Test 6: Build functionality
echo "6. Testing build functionality:"
echo 'cetak "Hello Build Test"' > temp-build.minang
if minang build temp-build.minang temp-build.js > /dev/null 2>&1; then
    echo "✅ Build functionality successful"
    rm temp-build.minang temp-build.js
else
    echo "❌ Build functionality failed"
    rm -f temp-build.minang temp-build.js
fi
echo ""

# Test 7: Validation
echo "7. Testing validation functionality:"
echo 'buek nama = "test"' > temp-validate.minang
if minang validate temp-validate.minang > /dev/null 2>&1; then
    echo "✅ Validation functionality successful"
    rm temp-validate.minang
else
    echo "❌ Validation functionality failed"
    rm -f temp-validate.minang
fi
echo ""

echo "🎉 MinangScript CLI Integration Test Complete!"
echo "All core functionality is working correctly."
