import { FC, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {AppBar, Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Toolbar, Typography} from '@mui/material';
import {
  Link as RouterLink
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BasicLayoutProps {
  title: string;
  loading?: boolean;
  children: React.ReactNode;
}

enum languagesEnum {
  en = 'en',
  es = 'es',
}

const BasicLayout: FC<BasicLayoutProps> = ({
  title,
  children,
  loading = false,
}) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<languagesEnum>(i18n.language as languagesEnum)

  const changeLanguage = (event: SelectChangeEvent) => {
    const lng = event.target.value as languagesEnum;
    i18n.changeLanguage(lng);
    setLanguage(lng)
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        flexDirection: 'column'
      }}
    >
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button  component={RouterLink} to="/" color="inherit">{t('NavBar.Home')}</Button>
          <Button  component={RouterLink} to="/user" color="inherit">{t('NavBar.Users')}</Button>
          <Button  component={RouterLink} to="/news" color="inherit">{t('NavBar.News')}</Button>
          <Box sx={{ minWidth: 65 }}>
            <FormControl fullWidth>
              <Select 
                
                sx={{ color: 'white', boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                value={language}
                onChange={changeLanguage}>
                {Object.keys(languagesEnum).map(language => <MenuItem key={language} value={language}>{language}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, width: '98vw' }}>{loading ? 'loading' : children}</Box>
        
    </Box>
  );
};

BasicLayout.defaultProps = {
  loading: false,
};

export default BasicLayout;
