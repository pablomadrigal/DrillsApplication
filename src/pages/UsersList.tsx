import { DataGrid, GridColDef } from '@mui/x-data-grid';
import BasicLayout from '../components/layout/BasicLayout';
import { Box, Button, Container, Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import userSlice from '../store/slices/userSlice';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { useState } from 'react';
import SureDeleteModal from '../components/modals/SureDeleteModal';
import { UserInterface } from '../types/User';

const UsersList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector(userSlice.selectors.selectUserList);
  const [userForDelete, setUserForDelete] = useState<UserInterface | null>(null)

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('User.Name'), flex: 1, minWidth: 200 },
    { field: 'lastName', headerName: t('User.LastName'), flex: 1, minWidth: 200 },
    { field: 'email', headerName: t('User.Email'), flex: 1, minWidth: 200 },
    {
      field: 'delete',
      headerName: t('Table.Delete'),
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const currentRow: UserInterface = params.row;
          setUserForDelete(currentRow)
        };

        return <Button variant="outlined" color="error" onClick={onClick}>{t('Table.Delete')}</Button>;
      },
    },
    {
      field: 'action',
      headerName: t('Table.Edit'),
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const currentRow: UserInterface = params.row;
          return navigate(currentRow.id || "create");
        };

        return <Button onClick={onClick}>{t('Table.Edit')}</Button>;
      },
    },
  ];

  const createNewUser =()=>{
    dispatch(userSlice.actions.resetCurrentUser())
    navigate('create')
  }

  const deleteUser = () => {
    dispatch(userSlice.actions.deleteUser(userForDelete?.id))
    setUserForDelete(null)
  }

  return (
    <BasicLayout title={t('Table.Title')}>
      <Container>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}}>
          <Button variant='contained' onClick={createNewUser}>{t('Table.Create')}</Button>
        </Box>
        {userList && (
          <>
            <DataGrid
              autoHeight
              rows={userList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
              pageSizeOptions={[5, 25, 50, 100]}
              sx={{ overflowX: 'scroll' }}
            />
          </>
        )}
      </Container>
      <Dialog open={!!userForDelete} onClose={() => setUserForDelete(null)} fullWidth>
        <SureDeleteModal
          userName={`${userForDelete?.name} ${userForDelete?.lastName}`}
          onDelete={deleteUser}
          onCancel={() => setUserForDelete(null)}
        />
      </Dialog>
    </BasicLayout>
  );
};

export default UsersList;
