module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white_A700_7f: "#ffffff7f",
        black_900_7f: "#0000007f",
        deep_orange_A100: "#ffb573",
        bluegray_50: "#f1f1f1",
        white_A700_3f: "#ffffff3f",
        blue_A400: "#3377ff",
        light_blue_700: "#0071e3",
        blue_A200: "#407bff",
        black_900_3f: "#0000003f",
        gray_50_b2: "#f6fdffb2",
        red_A704: "#ec000a",
        green_A700: "#06c270",
        black_900_44: "#00000044",
        red_A701: "#cf0202",
        red_A700: "#db0000",
        red_A703: "#d61111",
        red_A702: "#d90e0e",
        gray_600: "#7a7a82",
        gray_400: "#bfbfbf",
        gray_202: "#eaeaea",
        gray_800: "#3a3a3c",
        gray_900_23: "#1d1d1f23",
        gray_200: "#f0f0f0",
        black_900_0c: "#0000000c",
        gray_201: "#ebebeb",
        indigo_A700: "#4441ff",
        blue_100: "#b2cff1",
        white_A700: "#ffffff",
        light_blue_A700_87: "#0070f387",
        gray_52: "#f9fff9",
        gray_51: "#fafafa",
        light_blue_A100_14: "#86e5ff14",
        blue_A700: "#015efe",
        amber_A400: "#fecc00",
        gray_50: "#fffafa",
        white_A700_33: "#ffffff33",
        black_900: "#000000",
        blue_700_4c: "#2674cf4c",
        deep_orange_400: "#ed893e",
        indigo_200_0c: "#8b9ee00c",
        deep_orange_A400: "#ff5300",
        gray_303: "#e3e3e3",
        gray_700: "#666666",
        gray_301: "#e0e0e0",
        gray_302: "#e6e6e6",
        gray_500: "#9c9c9d",
        gray_901: "#1a1a1a",
        gray_902: "#242425",
        gray_900: "#242424",
        bluegray_100: "#d9d9d9",
        orange_500: "#f99600",
        gray_101: "#f3f3f3",
        gray_300: "#dddddd",
        gray_100: "#f5f5f5",
        bluegray_900: "#263238",
        indigo_100: "#bfbbfb",
        orange_50: "#fffbd9",
        indigo_101: "#cad6f1",
        bluegray_500: "#6a6d9e",
        gray_900_7f: "#2424247f",
        bluegray_102: "#cdcdcd",
        bluegray_101: "#d8d5d5",
        indigo_A400: "#554dde",
        blue_400: "#4c95ea",
        indigo_900: "#27187e",
      },
      fontFamily: {
        roboto: "Roboto",
        montserrat: "Montserrat",
        poppins: "Poppins",
        mulish: "Mulish",
        arial: "Arial",
        arialunicodems: "Arial Unicode MS",
      },
      textShadow: { ts: "0px 4px  4px #0000003f" },
      boxShadow: {
        bs10: "1px 4px  4px 0px #ffffff3f",
        bs: "-1px 1px  2px 0px #ffffff33",
        bs6: "0px 1px  2px 0px #0000003f",
        bs4: "0px 1px  3px 0px #0000003f",
        bs5: "0px 1px  4px 0px #0000003f",
        bs1: "-1px 1px  2px 0px #0000003f",
        bs2: "-1px -1px  4px 0px #0000003f",
        bs11: "1px 1px  8px 0px #0000003f",
        bs3: "1px 4px  4px 0px #0000003f",
        bs9: "0px 21.41px  42px 0px #8b9ee00c",
        bs7: "0px 6.46px  8px 0px #0000000c",
        bs8: "0px 4.82px  7px 0px #00000044",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-textshadow")],
};