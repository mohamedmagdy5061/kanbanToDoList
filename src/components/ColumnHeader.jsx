import { Box, Typography } from '@mui/material';
import { colors, stationLabels, stationCodes } from '../theme';

export default function ColumnHeader({ column, count }) {
      return (
            <Box display="flex" alignItems="baseline" justifyContent="space-between" mb={2}>
                  <Box>
                        <Typography
                              sx={{
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.1em',
                                    color: colors.textMuted,
                              }}
                        >
                              {stationCodes[column]}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: colors.textPrimary, textTransform: 'uppercase', fontSize: '1.05rem' }}>
                              {stationLabels[column]}
                        </Typography>
                  </Box>
                  <Typography
                        sx={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.75rem',
                              color: colors.textMuted,
                              border: `1px solid ${colors.bayBorder}`,
                              borderRadius: 1,
                              px: 0.8,
                              py: 0.1,
                        }}
                  >
                        {count}
                  </Typography>
            </Box>
      );
}
