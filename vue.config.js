module.exports = {
  pluginOptions: {
    electronBuilder: {
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
