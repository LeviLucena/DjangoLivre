const sharedConfig = require('@govbr-ds/release-config')

module.exports = {
  branches: [...sharedConfig.branches],
  plugins: [
    sharedConfig.plugins.commitAnalyzer,
    sharedConfig.plugins.releaseNotes,
    sharedConfig.plugins.changelog,
    sharedConfig.plugins.npm,
    sharedConfig.plugins.git,
    sharedConfig.plugins.gitlab,
    [
      'semantic-release-discord',
      {
        notifyOnFail: false,
        onSuccessTemplate: {
          content:
            'A versão v$npm_package_version do nosso pacote $package_name já está disponível no [NPMJS](https://www.npmjs.com/package/$package_name \'Acessar página do pacote NPM\')! :partying_face: \n\n Para conhecer melhor as novidades: \n\n :book: [Página de releases]($repo_url/-/releases "Releases") \n\n :computer: [Repositório no Gitlab]($repo_url) \n\n Deseja contribuir com o Design System? Consulte a nossa [wiki](https://gov.br/ds/wiki/ "Wiki GOVBR-DS") para mais detalhes.',
          embeds: [
            {
              color: 16736031,
              description: '$release_notes',
              title: 'RELEASE NOTES',
              url: '$repo_url/-/releases/v$npm_package_version',
            },
          ],
          threadName: 'GOVBR-DS - Web Components v$npm_package_version',
          username: 'GOVBR-DS',
        },
      },
    ],
  ],
}
