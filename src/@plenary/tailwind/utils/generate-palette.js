const chroma = require('chroma-js');
const _ = require('lodash');

const generatePalette = (config) => {
  const palette = {
    50: null,
    100: null,
    200: null,
    300: null,
    400: null,
    500: null,
    600: null,
    700: null,
    800: null,
    900: null,
  };

  if (_.isString(config)) {
    palette[500] = chroma.valid(config) ? config : null;
  }

  if (_.isPlainObject(config)) {
    if (!chroma.valid(config[500])) {
      throw new Error(
        'You must have a 500 hue in your palette configuration! Make sure the main color of your palette is marked as 500.'
      );
    }

    config = _.pick(config, Object.keys(palette));

    _.mergeWith(palette, config, (objValue, srcValue) =>
      chroma.valid(srcValue) ? srcValue : null
    );
  }

  const colors = Object.values(palette).filter((color) => color);

  colors.unshift(
    chroma
      .scale(['white', palette[500]])
      .domain([0, 1])
      .mode('lrgb')
      .colors(50)[1]
  );
  colors.push(
    chroma
      .scale(['black', palette[500]])
      .domain([0, 1])
      .mode('lrgb')
      .colors(10)[1]
  );

  const domain = [
    0,
    ...Object.entries(palette)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key) / 1000),
    1,
  ];

  const scale = chroma.scale(colors).domain(domain).mode('lrgb');

  return {
    50: scale(0.05).hex(),
    100: scale(0.1).hex(),
    200: scale(0.2).hex(),
    300: scale(0.3).hex(),
    400: scale(0.4).hex(),
    500: scale(0.5).hex(),
    600: scale(0.6).hex(),
    700: scale(0.7).hex(),
    800: scale(0.8).hex(),
    900: scale(0.9).hex(),
  };
};

module.exports = generatePalette;
