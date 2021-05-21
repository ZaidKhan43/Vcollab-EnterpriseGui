import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tree: {
        '& .rs-tree': {
          background: theme.palette.type === 'dark' ? '#424242 !important':'#fff',
          width:'280px',
          overFlow:'scroll'
        },
        '& .rs-dropdown': {
          color: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.1)':'rgba(25, 25, 25, 0.1)',
          background: theme.palette.type === 'dark' ? '#424242 !important':'#fff'
  
        },
        '& .rs-dropdown-menu': {
          background: theme.palette.type === 'dark' ? '#424242':'#fff',
        },
        '& .rs-dropdown-menu .rs-dropdown-item-content':{
          color: theme.palette.type === 'dark' ? '#fff':'#424242'
        },
        '& .rs-picker-default .rs-picker-toggle.rs-btn':{
          background: theme.palette.type === 'dark' ? '#424242 !important':'#fff',
          color: theme.palette.type === 'dark' ? '#fff':'#424242',
  
        },
        '& .rs-picker-has-value .rs-btn .rs-picker-toggle-value, .rs-picker-has-value .rs-picker-toggle .rs-picker-toggle-value' :{
          color: theme.palette.type === 'dark' ? '#424242':'#fff',
          background: theme.palette.type === 'dark' ? '#424242 !important':'#fff',
        },
       
        '& .rs-tree-nodes':{
          color: theme.palette.type === 'dark' ? '#fff':'#424242',
        },
        '& .rs-dropdown-menu .rs-dropdown-menu':{
          background: theme.palette.type === 'dark' ? '#424242':'#fff'
  
        },
      
    },
    '.rs-tree':{
      background: theme.palette.type === 'dark' ? '#424242 !important':'#fff ',
      color: theme.palette.type === 'dark' ? '#fff':'#424242',
  
      width:'280px',
      overflow: 'scroll'
    },
}));
  
