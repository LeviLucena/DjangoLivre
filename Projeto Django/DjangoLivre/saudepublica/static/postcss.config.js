const IN_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    IN_PRODUCTION &&
      require('@fullhuman/postcss-purgecss')({
        content: [`./src/**/*.vue`, `./node_modules/@govbr-ds/core/dist/components/menu/menu.js`],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
        // TODO: reavaliar essas regex
        safelist: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /data-.*/,
          /svg.*/,
          /fas.*/,
          /:host.*/,
        ],
      }),
  ],
}
