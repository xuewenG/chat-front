/* eslint-disable */
const path = require('path')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.ts',
      rendererProcessFile: 'src/render/index.ts',
      mainProcessWatch: ['src/main/**/*.ts'],
      chainWebpackMainProcess: config => {
        config.resolve.alias.set('@main', path.resolve('src/main/'))
      },
      chainWebpackRendererProcess: config => {
        config.resolve.alias.set('@render', path.resolve('src/render/'))
      },
      builderOptions: {
        artifactName: '${productName}-${version}-${os}.${ext}',
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
}
