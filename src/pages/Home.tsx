import Box from '@mui/material/Box';
import BasicLayout from '../components/layout/BasicLayout';
import { Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BasicLayout title={t('NavBar.Home')}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} sx={{width: '100%'}}>
          <Typography variant="h3" align='center'>Home</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Card sx={{width: '100%'}}>
                <CardActionArea component={RouterLink} to={'user'}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                    {t('NavBar.Users')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Card>
                <CardActionArea component={RouterLink} to={'news'}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                    {t('NavBar.News')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </BasicLayout>
  );
};

export default Home;
