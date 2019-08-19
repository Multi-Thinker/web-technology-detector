const fs = require('fs');
const path = require('path');
const Detector = require('./detector');
const fetch = require('node-fetch');
const json = JSON.parse(fs.readFileSync(path.resolve(`${ __dirname }/apps.json`)));
class Detect
{
  constructor (url, data, context)
  {
    this.apps = [];
    this.detector = new Detector();
    this.detector.apps = json.apps;
    this.detector.driver.displayApps = (detected, meta) =>
    {
      this.meta = meta;
      Object.keys(detected).forEach((appName) =>
      {
        const app = detected[ appName ];
        const categories = [];
        app.props.cats.forEach((id) =>
        {
          const category = {};
          category[ id ] = json.categories[ id ].name;
          categories.push(category);
        });
        if (!this.apps.some(detectedApp => detectedApp.name === app.name))
        {
          let icon = this.datauri('./icons/' + (app.props.icon || 'default.svg'));
          this.apps.push({
            name: app.name,
            confidence: app.confidenceTotal.toString(),
            version: app.version || null,
            icon,
            website: app.props.website,
            categories,
          });
        }
      });
    };
  }
  datauri(file)
  {
    var bitmap = fs.readFileSync(path.resolve(`${ __dirname }/${ file }`));
    let uri = new Buffer(bitmap).toString('base64');
    let ext = file.slice(-3).toLowerCase();
    let mime = ext == 'png' ? 'data:image/png;base64,' : ext == 'jpg' ?
      'data:image/jpeg;base64,' : 'data:image/svg+xml;base64,';
    return mime + uri;
  }
  async identify(url, data)
  {
    await this.detector.analyze(url, data)
    return this.apps;
  }
  regexMatches(string, reg)
  {
    return (string.match(reg) || []).map(e => e.replace(reg, '$1').replace(/\s+/gm, ' '))
  };
  async url(url)
  {
    let process = await fetch(url);
    let html = await process.text();
    let headers = await process.headers.raw();
    let cookie = await process.headers.get('set-cookie');
    let scriptsRegex = /(?:\<script.*?src=(?:\'|\")(.*?)(?:\'|\"))/igms;
    let scripts = this.regexMatches(html, scriptsRegex);
    return this.identify(url, { html, url, headers, cookie, scripts });
  }
}
module.exports = Detect;