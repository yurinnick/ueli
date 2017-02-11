import fs from 'fs'

let configFilePath = `${process.env.HOME}\\ezr_config.json`

export default class ConfigManager {
    constructor() {
        if (!fs.existsSync(configFilePath))
            fs.writeFileSync(configFilePath, JSON.stringify(getDefaultConfig()), 'utf-8')

        this.config = getConfigFromConfigFile()
    }

    getConfig() {
        return this.config
    }

    setConfig(config) {
        if (fs.existsSync(configFilePath))
            fs.writeFileSync(configFilePath, JSON.stringify(config), 'utf-8')
        else
            alert(this.getMissingConfigFileMessage())
    }

    getConfigFilePath() {
        return configFilePath
    }

    getMissingConfigFileMessage() {
        return `There is no config file (${configFilePath})`
    }
}

function getDefaultConfig() {
    return {
        colorTheme: 'osc-dark-blue',
        folders: [
            `C:\\ProgramData\\Microsoft\\Windows\\Start Menu`,
            `${process.env.HOME}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu`,
            `${process.env.HOME}\\Desktop`
        ],
        webSearches: [
            {
                name: 'Google',
                prefix: 'g',
                url: 'https://google.com/search?q='
            }
        ],
        customShortcuts: [],
        favorites: []
    }
}

function getConfigFromConfigFile() {
    return JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))
}