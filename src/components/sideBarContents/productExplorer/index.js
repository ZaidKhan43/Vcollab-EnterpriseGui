import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '../../../assets/images/back.svg';
import Search from '../../../assets/images/search.svg';
import styles from './style';

export default function ProductExplorer(){
    
    const classes = styles();
    //const dispatch = useAppDispatch();  

    const onClickBackIcon = () =>{

    }

    const getHeaderLeftIcon= () => {
      return (<IconButton
      className={classes.backIcon}
      onClick={() => onClickBackIcon()}><img src={ BackIcon } alt={'BackIcon'} /> </IconButton>);
    }

    const getHeaderContent = () => {
    return <Typography className={classes.heading} variant='h1' noWrap>
            Product Tree
          </Typography>;
    }

    const getHeaderRightIcon = () => {
      return (<IconButton
        className={classes.backIcon}
        onClick={() => onClickBackIcon()}><img src={ Search } alt={'Search'} /> </IconButton>);
    }

    const getBody = () => {
      return ('contents')          
    }

    const getFooter = () => {
        return (<div>Footer<br />Footer<br />Footer</div>)          
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}