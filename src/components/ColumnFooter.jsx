import { Box, Button } from '@mui/material';
import { colors } from '../theme';

export default function ColumnFooter({ signal, onAddTask }) {
      return (
            <Box
                  sx={{
                        flexShrink: 0,
                        p: 2,
                        borderTop: `1px solid ${colors.bayBorder}`,
                  }}
            >
                  <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                              borderStyle: 'dashed',
                              borderColor: colors.bayBorder,
                              color: colors.textMuted,
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.8rem',
                              letterSpacing: '0.06em',
                              '&:hover': { borderColor: signal, color: colors.textPrimary },
                        }}
                        onClick={onAddTask}
                  >
                        + ADD TASK
                  </Button>
            </Box>
      );
}
