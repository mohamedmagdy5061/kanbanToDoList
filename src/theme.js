import { createTheme } from '@mui/material/styles';

// Color tokens — a dark dispatch rack holding warm paper strips.
export const colors = {
      graphite: '#191D24',
      bay: '#232833',
      bayBorder: '#323A48',
      paper: '#F3EEDF',
      paperShadow: 'rgba(12, 14, 18, 0.55)',
      ink: '#20232B',
      inkMuted: 'rgba(32, 35, 43, 0.62)',
      textPrimary: '#EDEFF3',
      textMuted: '#8A93A6',
};

// Signal-light colors — one per station, matching the LED bar on each bay.
export const stationSignal = {
      backlog: '#5B8DEF',
      in_progress: '#E8A33D',
      review: '#9C8CF0',
      done: '#4FB477',
};

// Priority tab colors — the colored stub clipped to the left edge of a strip.
export const prioritySignal = {
      HIGH: '#E35A3A',
      MEDIUM: '#D9A441',
      LOW: '#7C8699',
};

export const stationLabels = {
      backlog: 'Backlog',
      in_progress: 'In progress',
      review: 'In review',
      done: 'Done',
};

export const stationCodes = {
      backlog: '01 · BKLG',
      in_progress: '02 · PROG',
      review: '03 · RVW',
      done: '04 · DONE',
};

const theme = createTheme({
      palette: {
            mode: 'dark',
            background: {
                  default: colors.graphite,
                  paper: colors.bay,
            },
            text: {
                  primary: colors.textPrimary,
                  secondary: colors.textMuted,
            },
            primary: {
                  main: stationSignal.in_progress,
            },
      },
      shape: {
            borderRadius: 10,
      },
      typography: {
            fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
            h6: {
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
            },
            subtitle2: {
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
            },
            button: {
                  textTransform: 'none',
                  fontWeight: 600,
            },
      },
      components: {
            MuiCssBaseline: {
                  styleOverrides: {
                        body: {
                              backgroundColor: colors.graphite,
                        },
                  },
            },
            MuiButton: {
                  styleOverrides: {
                        root: {
                              borderRadius: 8,
                        },
                  },
            },
            MuiTextField: {
                  defaultProps: {
                        variant: 'outlined',
                  },
            },
            MuiOutlinedInput: {
                  styleOverrides: {
                        root: {
                              backgroundColor: colors.bay,
                              borderRadius: 8,
                        },
                  },
            },
            MuiDialog: {
                  styleOverrides: {
                        paper: {
                              backgroundColor: colors.bay,
                              backgroundImage: 'none',
                              border: `1px solid ${colors.bayBorder}`,
                        },
                  },
            },
      },
});

export default theme;
