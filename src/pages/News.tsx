import BasicLayout from '../components/layout/BasicLayout';
import { useGetNewsListQuery } from '../store/slices/newsApi';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Container, Dialog, FormControl, Grid, InputAdornment, Pagination, Skeleton, TextField, Typography } from '@mui/material';
import { Article } from '../types/New';
import NewsModal from '../components/modals/NewsModal';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

const NewsList: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const { data, isLoading, error } = useGetNewsListQuery({page, search: searchValue});

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchValue(search)
    }, 1500)
    return () => clearTimeout(delayDebounceFn)
  }, [search])

  const trimText = ( text: string, length: number) => {
    return text.length > length ? 
      text.substring(0, length - 3) + "..." : 
      text;
  }

  const changePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }
  
  return (
    <BasicLayout title={t('NavBar.News')}>
      <Container>
      <FormControl fullWidth sx={{ marginBottom: 5 }}>
          <TextField
            placeholder={t('News.Search')}
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch( event.target.value )
            }}
            InputProps={{
              startAdornment: 
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
            }}
          />
        </FormControl>
        {isLoading &&
          <Grid spacing={2} container>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => 
              <Grid item xs={12} sm={6}  md={4} lg={3} key={item}>
                <Skeleton variant="rectangular" height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
            )}
          </Grid>
        }
        {data && !isLoading && !error &&
        <>
          <Grid spacing={2} container>
            {data.articles.map((item) =>
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.url} onClick={() => setCurrentArticle(item)}>
                <img
                  style={{ width: '100%', height: '118px', objectFit: 'cover' }}
                  alt={item.title}
                  src={item.urlToImage ?? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}
                />
                <Box sx={{ pr: 2 }}>
                  <Typography gutterBottom variant="body2" noWrap>
                    {item.title}
                  </Typography>
                  <Typography 
                    display="block" 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      height: '60px'
                    }}>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`${trimText(item.author ?? '', 15)} • ${item.publishedAt.split('T')[0]}`}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
            {Math.trunc(data.totalResults / 12) > 1 && <Box sx={{display: 'flex', justifyContent: 'center', mt: 5}}>
              <Pagination 
                page={page} 
                count={Math.trunc(data.totalResults / 12) - 1} 
                onChange={changePage}
                variant="outlined"
                size="large"/>
            </Box>}
        </>
        }
        {error && <Typography>Error with the API</Typography>}
        
      </Container>
      {currentArticle &&
        <Dialog open={!!currentArticle} onClose={() => setCurrentArticle(null)} fullWidth>
          <NewsModal article={currentArticle} handleClose={() => setCurrentArticle(null)}/>
        </Dialog>
      }
    </BasicLayout>
  );
};

export default NewsList;
