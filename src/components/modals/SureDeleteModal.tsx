import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SureDeleteModalProps {
  userName: string;
  onDelete: (result: boolean) => void;
  onCancel: () => void;
}

const SureDeleteModal: React.FC<SureDeleteModalProps> = ({
  userName,
  onDelete,
  onCancel,
}: SureDeleteModalProps) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    if (timeLeft > 0) setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }, [timeLeft]);
  const onDeleteHandler = () => {
    onDelete(true);
  };

  return (
    <>
      <DialogTitle>{t('DeleteModal.Delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {t('DeleteModal.AreYouSure')}{userName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={timeLeft > 0} onClick={onDeleteHandler} color="error">
        {t('DeleteModal.Delete')} {timeLeft > 0 ? `${timeLeft}s` : ''}
        </Button>
        <Button onClick={onCancel}>{t('DeleteModal.Cancel')}</Button>
      </DialogActions>
    </>
  );
};

export default SureDeleteModal;
