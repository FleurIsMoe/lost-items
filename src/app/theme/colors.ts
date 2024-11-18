export interface ThemeColors {

    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    warning: string;
    error: string;
    success: string;
    background: string;
    text: string;
    border: string;
    highlight: string;

    buttonPrimary: string;
    buttonPrimaryForeground: string;
    buttonPrimaryHover: string;
    buttonDestructive: string;
    buttonDestructiveForeground: string;
    buttonDestructiveHover: string;
    buttonSecondary: string;
    buttonSecondaryForeground: string;
    buttonSecondaryHover: string;
    buttonOutlineBorder: string;
    buttonOutlineBackground: string;
    buttonOutlineHoverBackground: string;
    buttonOutlineHoverForeground: string;
    buttonGhostHoverBackground: string;
    buttonGhostHoverForeground: string;
    buttonLink: string;
    buttonLinkHover: string;

    calendarButtonHoverText: string;
    calendarMonthText: string;
    calendarDayNameText: string;
    calendarNotCurrentMonthText: string;
    calendarSelectedDayBackground: string;
    calendarSelectedDayText: string;
    calendarTodayBackground: string;
    calendarTodayText: string;
    calendarSpecialDateText: string;
    calendarDayHoverBackground: string;
    calendarButtonIconColor: string;
    calendarButtonHoverBackground: string;

  }
  
  interface Colors {
    white: ThemeColors;
    dark: ThemeColors;
  }
  
  const colors: Colors = {
    white: {

      primary: "#fe9d3a",
      primaryForeground: "#F3F2F1",
      secondary: "#ff73b4",
      secondaryForeground: "#F3F2F1",
      warning: "#B6A6E9",
      error: "#D13438",
      success: "#4394E5",
      background: "#F3F2F1",
      text: "#323130",
      border: "#E1DFDD",
      highlight: "#FFFF00",

      buttonPrimary: "#323130",
      buttonPrimaryForeground: "#F3F2F1",
      buttonPrimaryHover: "#fe9d3aE6",
      buttonDestructive: "#D13438",
      buttonDestructiveForeground: "#F3F2F1",
      buttonDestructiveHover: "#D13438E6",
      buttonSecondary: "#ff73b4",
      buttonSecondaryForeground: "#F3F2F1",
      buttonSecondaryHover: "#ff73b4CC",
      buttonOutlineBorder: "#E1DFDD",
      buttonOutlineBackground: "#F3F2F1",
      buttonOutlineHoverBackground: "#B6A6E9",
      buttonOutlineHoverForeground: "#323130",
      buttonGhostHoverBackground: "#B6A6E9",
      buttonGhostHoverForeground: "#323130",
      buttonLink: "#fe9d3a",
      buttonLinkHover: "#fe9d3a",

      calendarButtonHoverText: "#D1D5DB",
      calendarMonthText: "#F3F2F1",
      calendarDayNameText: "#9CA3AF",
      calendarNotCurrentMonthText: "#6B7280",
      calendarSelectedDayBackground: "#ff73b4",
      calendarSelectedDayText: "#F3F2F1",
      calendarTodayBackground: "#d8d8d8",
      calendarTodayText: "#374151",
      calendarSpecialDateText: "#F87171",
      calendarDayHoverBackground: "#374151",
      calendarButtonIconColor: "#9CA3AF",
      calendarButtonHoverBackground: "transparent",

    },
    dark: {

      primary: "#fe9d3a",
      primaryForeground: "#323130",
      secondary: "#ff73b4",
      secondaryForeground: "#323130",
      warning: "#B6A6E9",
      error: "#D13438",
      success: "#4394E5",
      background: "#323130",
      text: "#F3F2F1",
      border: "#E1DFDD",
      highlight: "#FFFF00",

      buttonPrimary: "#fe9d3a",
      buttonPrimaryForeground: "#F3F2F1",
      buttonPrimaryHover: "#fe9d3aE6",
      buttonDestructive: "#D13438",
      buttonDestructiveForeground: "#F3F2F1",
      buttonDestructiveHover: "#D13438E6",
      buttonSecondary: "#ff73b4",
      buttonSecondaryForeground: "#F3F2F1",
      buttonSecondaryHover: "#ff73b4CC",
      buttonOutlineBorder: "#E1DFDD",
      buttonOutlineBackground: "#F3F2F1",
      buttonOutlineHoverBackground: "#B6A6E9",
      buttonOutlineHoverForeground: "#F3F2F1",
      buttonGhostHoverBackground: "#B6A6E9",
      buttonGhostHoverForeground: "#F3F2F1",
      buttonLink: "#fe9d3a",
      buttonLinkHover: "#fe9d3a",

      calendarButtonHoverText: "#D1D5DB",
      calendarMonthText: "#F3F2F1",
      calendarDayNameText: "#9CA3AF",
      calendarNotCurrentMonthText: "#6B7280",
      calendarSelectedDayBackground: "#ff73b4",
      calendarSelectedDayText: "#323130",
      calendarTodayBackground: "#F3F2F1",
      calendarTodayText: "#374151",
      calendarSpecialDateText: "#F87171",
      calendarDayHoverBackground: "#374151",
      calendarButtonIconColor: "#9CA3AF",
      calendarButtonHoverBackground: "transparent",

    }
  };
  
  export default colors;
