[![web-technology-detector](https://flat.badgen.net/npm/v/web-technology-detector)](https://www.npmjs.com/package/web-technology-detector) [![web-technology-detector](https://flat.badgen.net/packagephobia/install/web-technology-detector)](https://packagephobia.now.sh/result?p=web-technology-detector)
![web-technology-detector](https://img.shields.io/npm/dm/web-technology-detector.svg)


# web technology detection
This simple module can help you detect CDN, label scripts or styles, CMS and more

# installation
```npm i web-technology-detector```

# Usage
- load by URL
  ```javascript
    const detector   = require('web-technology-detector');

    let technologies = new detector().url('https://codeot.com');
  ```

- provide data (useful if using puppeteer fetch or any alternative which already provides data)
    ```javascript
    const detector   = require('web-technology-detector');
    let technologies = new detector().identify(url, {
      html,
      scripts,
      cookie,
      headers
    });
  ```
**Please note**
- scripts == array of script links
- html == plain text string html
- cookie == cookie string
- headers == array of headers


[Twitter](https://twitter.com/iMultiThinker) [Github](https://github.com/Multi-Thinker) [Codeot](https://codeot.com)
