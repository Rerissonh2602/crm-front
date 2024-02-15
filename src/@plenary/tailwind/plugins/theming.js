const chroma = require('chroma-js');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;
const generateContrasts = require(path.resolve(
  __dirname,
  '../utils/generate-contrasts'
));
const jsonToSassMap = require(path.resolve(
  __dirname,
  '../utils/json-to-sass-map'
));

const normalizeTheme = (theme) => {
  return _.fromPairs(
    _.map(
      _.omitBy(
        theme,
        (palette, paletteName) =>
          paletteName.startsWith('on') || _.isEmpty(palette)
      ),
      (palette, paletteName) => [
        paletteName,
        {
          ...palette,
          DEFAULT: palette['DEFAULT'] || palette[500],
        },
      ]
    )
  );
};

const theming = plugin.withOptions(
  (options) =>
    ({ addComponents, e, theme }) => {
      const userThemes = _.fromPairs(
        _.map(options.themes, (theme, themeName) => [
          themeName,
          _.defaults({}, theme, options.themes['default']),
        ])
      );

      let themes = _.fromPairs(
        _.map(userThemes, (theme, themeName) => [
          themeName,
          normalizeTheme(theme),
        ])
      );

      themes = _.fromPairs(
        _.map(themes, (theme, themeName) => [
          themeName,
          _.pick(
            _.fromPairs(
              _.map(theme, (palette, paletteName) => [
                paletteName,
                {
                  ...palette,
                  contrast: _.fromPairs(
                    _.map(generateContrasts(palette), (color, hue) => [
                      hue,
                      _.get(userThemes[themeName], [
                        `on-${paletteName}`,
                        hue,
                      ]) || color,
                    ])
                  ),
                },
              ])
            ),
            ['primary', 'accent', 'warn']
          ),
        ])
      );

      themes = _.fromPairs(
        _.map(themes, (theme, themeName) => [
          themeName,
          {
            selector: `".theme-${themeName}"`,
            ...theme,
          },
        ])
      );

      const sassMap = jsonToSassMap(JSON.stringify({ 'user-themes': themes }));

      const filename = path.resolve(__dirname, '../../styles/user-themes.scss');

      let data;
      try {
        data = fs.readFileSync(filename, { encoding: 'utf8' });
      } catch (err) {
        console.error(err);
      }

      if (data !== sassMap) {
        try {
          fs.writeFileSync(filename, sassMap, { encoding: 'utf8' });
        } catch (err) {
          console.error(err);
        }
      }

      addComponents(
        _.fromPairs(
          _.map(options.themes, (theme, themeName) => [
            themeName === 'default'
              ? 'body, .theme-default'
              : `.theme-${e(themeName)}`,
            _.fromPairs(
              _.flatten(
                _.map(
                  flattenColorPalette(
                    _.fromPairs(
                      _.flatten(
                        _.map(normalizeTheme(theme), (palette, paletteName) => [
                          [e(paletteName), palette],
                          [
                            `on-${e(paletteName)}`,
                            _.fromPairs(
                              _.map(
                                generateContrasts(palette),
                                (color, hue) => [
                                  hue,
                                  _.get(theme, [`on-${paletteName}`, hue]) ||
                                    color,
                                ]
                              )
                            ),
                          ],
                        ])
                      )
                    )
                  ),
                  (value, key) => [
                    [`--plenary-${e(key)}`, value],
                    [`--plenary-${e(key)}-rgb`, chroma(value).rgb().join(',')],
                  ]
                )
              )
            ),
          ])
        )
      );

      const schemeCustomProps = _.map(['light', 'dark'], (colorScheme) => {
        const isDark = colorScheme === 'dark';
        const background = theme(
          `plenary.customProps.background.${colorScheme}`
        );
        const foreground = theme(
          `plenary.customProps.foreground.${colorScheme}`
        );
        const lightSchemeSelectors = 'body.light, .light, .dark .light';
        const darkSchemeSelectors = 'body.dark, .dark, .light .dark';

        return {
          [isDark ? darkSchemeSelectors : lightSchemeSelectors]: {
            ...(!isDark ? { '--is-dark': 'false' } : {}),

            ..._.fromPairs(
              _.flatten(
                _.map(background, (value, key) => [
                  [`--plenary-${e(key)}`, value],
                  [`--plenary-${e(key)}-rgb`, chroma(value).rgb().join(',')],
                ])
              )
            ),
            ..._.fromPairs(
              _.flatten(
                _.map(foreground, (value, key) => [
                  [`--plenary-${e(key)}`, value],
                  [`--plenary-${e(key)}-rgb`, chroma(value).rgb().join(',')],
                ])
              )
            ),
          },
        };
      });

      const schemeUtilities = (() => {
        return {};
      })();

      addComponents(schemeCustomProps);
      addComponents(schemeUtilities);
    },
  (options) => {
    return {
      theme: {
        extend: {
          colors: _.fromPairs(
            _.flatten(
              _.map(
                _.keys(
                  flattenColorPalette(normalizeTheme(options.themes.default))
                ),
                (name) => [
                  [name, `rgba(var(--plenary-${name}-rgb), <alpha-value>)`],
                  [
                    `on-${name}`,
                    `rgba(var(--plenary-on-${name}-rgb), <alpha-value>)`,
                  ],
                ]
              )
            )
          ),
        },
        plenary: {
          customProps: {
            background: {
              light: {
                'bg-app-bar': '#FFFFFF',
                'bg-card': '#FFFFFF',
                'bg-default': '#F9F9F9',
                'bg-sidebar': '#FFFFFF',
                'bg-dialog': '#FFFFFF',
                'bg-contrast': '#F4F6F8',
                'bg-hover': chroma(colors.slate[400]).alpha(0.12).css(),
              },
              dark: {
                'bg-app-bar': '#101010',
                'bg-card': '#101010',
                'bg-sidebar': '#101010',
                'bg-default': '#101010',
                'bg-dialog': '#252525',
                'bg-contrast': '#303030',
                'bg-hover': '#303030',
              },
            },
            foreground: {
              light: {
                'text-default': '#37414B',
                'text-secondary': '#627588',
                'text-hint': '#7A8999',
                'text-disabled': '#7A8999',
                border: '#DCE0E4',
                divider: '#DCE0E4',
                icon: '#7B8189',
                'mat-icon': '#7B8189',
              },
              dark: {
                'text-default': '#FFFFFF',
                'text-secondary': '#A5A5A5',
                'text-hint': colors.slate[500],
                'text-disabled': colors.slate[600],
                border: '#404040',
                divider: '#404040',
                icon: '#7B8189',
                'mat-icon': '#7B8189',
              },
            },
          },
        },
      },
    };
  }
);

module.exports = theming;
