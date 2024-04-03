const theme = {
  colors: {
    primary: "#2E86AB", // Azul primário
    secondary: "#01172F", // Azul secundário
    accent: "#C1292E", // Azul de destaque
    background: "#fff", // Fundo azul claro
    text: "#333", // Cor do texto padrão
    textSecondary: "#F5D491", // Cor do texto secundário
    border: "#ccd9e6", // Cor da borda
    buttonHover: "#0069d9",
    backgroundMenu: "#001f3f",
    headerTable: "#001f3f",
  },

  fonts: {
    primary: "Arial, sans-serif",
    secondary: "Georgia, serif",
  },
};

export default theme;

export type ThemeGlobalProps = typeof theme;
