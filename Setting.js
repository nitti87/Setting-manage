const fs = require('fs')
const path = require('path')

class Setting {
  constructor() {
    this.path = path.join('workbench', 'global', 'json', 'setting.json')
  }

  change(option) {
    const options = {
      what: option?.key || console.error('Undefined setting'),
      to: option?.value || '', 
      data: JSON.parse(fs.readFileSync(this.path, 'utf8'))
    }

    if(options.what in options.data) {
      options.data[options.what] = options.to
      fs.writeFileSync(this.path, JSON.stringify(options.data, null, 4), 'utf8')
    } else {
      console.error('Unknown setting')
    }
  }

  pull(key = new String()) {
    const data = JSON.parse(fs.readFileSync(this.path, 'utf8'))

    return key in data ? data[key] : console.error('Unknown setting')
  }
}

module.exports = new Setting()
