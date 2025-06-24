// MinangScript Package Manager CLI
// Command line interface for MinangPaket

const { MinangPaket } = require('./MinangPaket');
const { MinangI18n } = require('../utils/i18n');

class MinangPaketCLI {
    constructor() {
        this.paket = new MinangPaket();
        this.i18n = new MinangI18n();
    }

    async execute(command, args = []) {
        try {
            switch (command) {
                case 'init':
                case 'inisialkan':
                    await this.handleInit(args);
                    break;

                case 'install':
                case 'pasang':
                    await this.handleInstall(args);
                    break;

                case 'uninstall':
                case 'lepas':
                case 'hapus':
                    await this.handleUninstall(args);
                    break;

                case 'list':
                case 'daftar':
                case 'ls':
                    await this.handleList(args);
                    break;

                case 'search':
                case 'cari':
                    await this.handleSearch(args);
                    break;

                case 'update':
                case 'perbarui':
                    await this.handleUpdate(args);
                    break;

                case 'publish':
                case 'terbitkan':
                    await this.handlePublish(args);
                    break;

                case 'info':
                case 'informasi':
                    this.handleInfo();
                    break;

                case 'help':
                case 'bantuan':
                    this.showHelp();
                    break;

                case 'version':
                case 'versi':
                    this.showVersion();
                    break;

                default:
                    console.error(`Unknown command: ${command}`);
                    this.showHelp();
                    break;
            }
        } catch (error) {
            console.error('Error:', error.message);
            process.exit(1);
        }
    }

    async handleInit(args) {
        const options = this.parseOptions(args);
        const name = args.find(arg => !arg.startsWith('--'));
        
        console.log(`Initializing project: ${name || 'MinangScript Project'}`);
        const result = await this.paket.inisialkan(name, {
            description: options.description || options.desc,
            author: options.author,
            license: options.license || 'MIT'
        });
        
        if (result.success) {
            console.log(`Project ${result.projectName} initialized successfully`);
        } else {
            console.log(`Initialization failed: ${result.error}`);
        }
    }

    async handleInstall(args) {
        if (args.length === 0) {
            console.error('Package name required');
            console.log('Example: minang paket pasang nama-paket');
            return;
        }

        const packageName = args[0];
        const version = args[1] || 'latest';
        
        console.log(`Installing ${packageName}...`);
        const result = await this.paket.pasang(packageName, version);
        
        if (result.success) {
            console.log(`Package ${packageName} installed successfully`);
        } else {
            console.log(`Installation failed: ${result.error}`);
        }
    }

    async handleUninstall(args) {
        if (args.length === 0) {
            console.error('Package name required');
            console.log('Example: minang paket lepas nama-paket');
            return;
        }

        console.log(`Uninstalling ${args[0]}...`);
        const result = await this.paket.lepas(args[0]);
        
        if (result.success) {
            console.log(`Package ${args[0]} uninstalled successfully`);
        } else {
            console.log(`Uninstallation failed: ${result.error}`);
        }
    }

    async handleList(args) {
        await this.paket.daftar();
    }

    async handleSearch(args) {
        if (args.length === 0) {
            console.error('❌ Query pencarian diperlukan');
            console.log('Contoh: minang paket cari ui');
            return;
        }

        const query = args.join(' ');
        await this.paket.cari(query);
    }

    async handleUpdate(args) {
        const packageName = args[0] || null;
        await this.paket.perbarui(packageName);
    }

    async handlePublish(args) {
        const options = this.parseOptions(args);
        await this.paket.terbitkan({
            force: options.force
        });
    }

    handleInfo() {
        this.paket.info();
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

    showHelp() {
        console.log(`
MinangPaket - Package Manager MinangScript

${this.i18n.t('usage')}:
  minang paket <command> [options]

${this.i18n.t('commands')}:

${this.i18n.t('projectManagement')}:
  init [nama]             - Inisialisasi proyek baru
  inisialkan [nama]       - Alias untuk init

${this.i18n.t('packageManagement')}:
  pasang <paket> [versi]  - Pasang paket
  install <paket> [versi] - Alias untuk pasang
  lepas <paket>           - Hapus paket
  uninstall <paket>       - Alias untuk lepas
  perbarui [paket]        - Perbarui paket
  update [paket]          - Alias untuk perbarui

${this.i18n.t('information')}:
  daftar                  - Tampilkan daftar paket terpasang
  list                    - Alias untuk daftar
  cari <query>            - Cari paket di registry
  search <query>          - Alias untuk cari
  info                    - Informasi package manager

${this.i18n.t('publishing')}:
  terbitkan [options]     - Terbitkan paket ke registry
  publish [options]       - Alias untuk terbitkan

${this.i18n.t('help')}:
  bantuan                 - Tampilkan bantuan ini
  help                    - Alias untuk bantuan
  versi                   - Tampilkan versi
  version                 - Alias untuk versi

${this.i18n.t('options')}:
  --description <desc>    - Deskripsi proyek (untuk init)
  --author <nama>         - Nama pengarang (untuk init)
  --license <lisensi>     - Lisensi proyek (untuk init)
  --force                 - Paksa eksekusi (untuk publish)

${this.i18n.t('examples')}:
  minang paket init nagari-digital --author "John Doe"
  minang paket pasang minang-ui
  minang paket cari mathematical
  minang paket daftar
  minang paket terbitkan --force

${this.i18n.t('philosophy')}:
  Gotong Royong - Berbagi dan bekerja sama
  Musyawarah Mufakat - Pengambilan keputusan bersama
  Alam Takambang Jadi Guru - Belajar dari komunitas
  Adat Basandi Syarak - Praktik yang etis dan bertanggung jawab
        `);
    }

    showVersion() {
        const packageJson = require('../../package.json');
        console.log(`
MinangPaket v1.0.0
    Package Manager untuk MinangScript ${packageJson.version}
    
    Dikembangkan dengan filosofi Minangkabau
    Lisensi: MIT
        `);
    }
}

module.exports = { MinangPaketCLI };
