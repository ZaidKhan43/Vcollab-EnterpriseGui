import styles from './style';

export default function SideBarFooter(props : any) {

  const classes = styles();

  return (
      <div ref = { props.targetRef } className = { classes.sideBarFooter }>
        { props.children }
      </div>
  );
}
