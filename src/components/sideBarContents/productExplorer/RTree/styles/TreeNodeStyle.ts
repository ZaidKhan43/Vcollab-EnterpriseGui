import {createStyles, makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles(() => (
    createStyles({
        actionShow: {
            opacity:1
        },
        actionHide: {
            opacity:0.5
        }
    })
));