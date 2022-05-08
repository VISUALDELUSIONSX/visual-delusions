import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    pink: Palette['primary'];
  }
  interface PaletteOptions {
    pink?: PaletteOptions['primary'];
  }
}
