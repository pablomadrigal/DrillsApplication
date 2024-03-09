import {
    Button,
    Card,
  CardMedia,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Article } from '../../types/New';
import { useTranslation } from 'react-i18next';

interface SureDeleteModalProps {
  article: Article;
  handleClose: () => void;
}

const NewsModal: React.FC<SureDeleteModalProps> = ({ article, handleClose }: SureDeleteModalProps) => {
    const { t } = useTranslation();

    const handleOpenArticle = () => {
        window.open(article.url, '_blank');
        handleClose()
    }
    return (
        <Card>
            {article.urlToImage && 
            <CardMedia
                sx={{ height: 200 }}
                image={article.urlToImage}
                title={article.title}
            />
            }
            <DialogTitle variant='h5'>{article.title}</DialogTitle>
            <DialogContent>
                <DialogContentText variant="caption" color="text.secondary">
                    {article.author} • {article.publishedAt.split('T')[0]}
                </DialogContentText>
                <DialogContentText>
                {article.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleOpenArticle}>
                    {t("NewsDialog.GoToNews")}
                </Button>
                <Button onClick={handleClose} autoFocus>
                    {t("NewsDialog.Close")}
                </Button>
            </DialogActions>
        </Card>
    );
};

export default NewsModal;
