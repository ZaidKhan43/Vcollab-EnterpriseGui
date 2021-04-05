import styles from './style';

export default function SideBarHeader(props : any) {

  const classes = styles();

  return (
        <div className = {classes.header}>

        <div className = {classes.headerLeftContent}>
            {props.leftIcon ?
                <div className = {classes.leftIcon}>
                    {props.leftIcon}
                </div>
                :null
            }


            {props.content ?
                <div className = {classes.content}>
                    {props.content}
                </div>
                :null
            }
        </div>

        {props.rightIcon ?
            <div className = {classes.rightIcon}>
                {props.rightIcon}
            </div>
            :null
        }
      </div>
  );
}
