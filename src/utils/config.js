// MinangScript Configuration Management
// Handles persistent settings like language preference

const fs = require('fs');
const path = require('path');
const os = require('os');

class MinangConfig {
    constructor() {
        this.configDir = path.join(os.homedir(), '.minangscript');
        this.configFile = path.join(this.configDir, 'config.json');
        this.config = this.loadConfig();
    }
    
    loadConfig() {
        try {
            if (fs.existsSync(this.configFile)) {
                const data = fs.readFileSync(this.configFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            // If config is corrupted, return defaults
        }
        
        return {
            language: 'auto',
            version: '1.0.1',
            culturalValidation: true,
            autoFormat: false
        };
    }
    
    saveConfig() {
        try {
            if (!fs.existsSync(this.configDir)) {
                fs.mkdirSync(this.configDir, { recursive: true });
            }
            fs.writeFileSync(this.configFile, JSON.stringify(this.config, null, 2));
            return true;
        } catch (error) {
            console.error('Failed to save configuration:', error.message);
            return false;
        }
    }
    
    get(key) {
        return this.config[key];
    }
    
    set(key, value) {
        this.config[key] = value;
        return this.saveConfig();
    }
    
    getLanguage() {
        return this.config.language;
    }
    
    setLanguage(lang) {
        if (['en', 'id', 'auto'].includes(lang)) {
            this.config.language = lang;
            return this.saveConfig();
        }
        return false;
    }
    
    reset() {
        this.config = {
            language: 'auto',
            version: '1.0.1',
            culturalValidation: true,
            autoFormat: false
        };
        return this.saveConfig();
    }
}

module.exports = { MinangConfig };
