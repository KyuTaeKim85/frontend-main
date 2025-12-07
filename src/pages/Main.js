import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Box,
  Paper
} from '@mui/material';

const systems = [
  { name: '민원관리시스템', url: '/sub/minwon' },
  { name: '정산통계시스템', url: '/sub/settlement' },
  { name: '추심시스템', url: '/sub/debt' },
  { name: '예산시스템', url: '/sub/budget' },
  { name: '대사시스템', url: '/sub/reconciliation' }
];

function Main() {
  return (
    <>
      <CssBaseline />

      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            HIMS - Main Page
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            시스템 메뉴
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Welcome! You are logged in. 아래 메뉴를 선택하여 각 시스템으로 이동할 수 있습니다.
          </Typography>
        </Box>

        <List sx={{ p: 0 }}>
          {systems.map((system) => (
            <ListItem key={system.name} disablePadding sx={{ mb: 2 }}>
              <Paper
                elevation={2}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <ListItemButton
                  component="a"
                  href={system.url}
                  sx={{
                    py: 2,
                    px: 3,
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemText
                    primary={system.name}
                    primaryTypographyProps={{
                      variant: 'h6',
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Main;
