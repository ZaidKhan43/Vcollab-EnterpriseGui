import {createStyles, makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => (
    createStyles({
        actionShow: {
            opacity:1
        },
        actionHide: {
            opacity:0.5
        },
        hightlight: {
            padding: theme.spacing(0.5),
            background: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.light,
        }
    })
));