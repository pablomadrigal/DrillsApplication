import { useEffect } from 'react';
import BasicLayout from '../components/layout/BasicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks/useRedux';
import userSlice from '../store/slices/userSlice';
import { Button, Container, FormControl, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const User: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(userSlice.selectors.selectUser);
  

  useEffect(() => {
    if(id === 'create'){
      dispatch(userSlice.actions.resetCurrentUser())
    }
    else {
      dispatch(userSlice.actions.loadUser(id))
    }
  }, [dispatch, id])

  const saveUser = () => {
    if(id === 'create'){
      dispatch(userSlice.actions.setUser(null))
    } else {
      dispatch(userSlice.actions.setUser(id))
    }  
    navigate('/user')
  }
  
  return (
    <BasicLayout title={t('NavBar.Home')}>
      <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <FormControl fullWidth>
          <TextField
            label={t('User.Name')}
            value={currentUser?.name ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(userSlice.actions.setName( event.target.value ))
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={t('User.LastName')}
            value={currentUser?.lastName ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(userSlice.actions.setLastName( event.target.value ))
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={t('User.Email')}
            value={currentUser?.email ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(userSlice.actions.setEmail( event.target.value ))
            }}
          />
        </FormControl>
          <Button variant='contained' onClick={saveUser}>{id === 'create' ?   t('Create.Create') :  t('Create.Save')}</Button>
      </Container>
    </BasicLayout>
  );
};

export default User;
