import {makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => createStyles(
    {
        displayModeList: {
            width: '100%',
        },
        accordian: {
            background: 'transparent'
        },
        accordianDetails: {
            flexDirection: 'column'
        }
    }
))

export default useStyles;