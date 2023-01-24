# ar-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

Now you should be able to access the served files via the browser of your phone

## upload to test-environment:
`npm run build && rsync -ave ssh --delete dist/ localwdwrun:/u/data/testing_ar`


TODO:
api?
- pattern: url, id
- model: pattern-id, url, scale, position, rotation
import libraries