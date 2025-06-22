#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Keyword mappings from old to new
const keywordMappings = {
    'buat': 'buek',
    'fungsi': 'karojo', 
    'baliak': 'jadi',
    'ulang': 'selami',
    'berhenti': 'baronti',
    'kalauElse': 'kalauLain',
    'tampilkan': 'cetak'
};

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Replace keywords
        for (const [oldKeyword, newKeyword] of Object.entries(keywordMappings)) {
            const regex = new RegExp(`\\b${oldKeyword}\\b`, 'g');
            if (content.match(regex)) {
                content = content.replace(regex, newKeyword);
                updated = true;
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Updated: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ No changes needed: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Update all .minang files in examples directory
const examplesDir = path.join(__dirname, 'examples');
const files = fs.readdirSync(examplesDir)
    .filter(file => file.endsWith('.minang'))
    .map(file => path.join(examplesDir, file));

console.log('🔄 Updating MinangScript examples with new keywords...\n');

let updatedCount = 0;
for (const file of files) {
    if (updateFile(file)) {
        updatedCount++;
    }
}

console.log(`\n📊 Summary: ${updatedCount}/${files.length} files updated`);
console.log('🎉 Example update complete!');
