import { createRef, useLayoutEffect, useState } from 'react';

import styles from './style';
import SideBarHeader from './sideBarHeader'
import SideBarBody from './sideBarBody'
import SideBarFooter from './sideBarFooter'
import { sideBarHeaderHeight } from '../../../../config';

export default function SideBarContainer(props : any) {

  const classes = styles();
  const targetRef = createRef<HTMLDivElement>();
  const [bodyHeight, setbodyHeight] = useState(sideBarHeaderHeight)

  useLayoutEffect(() => {
    if (targetRef?.current?.clientHeight) {
      const height = targetRef.current.clientHeight;
      setbodyHeight(height + sideBarHeaderHeight);
    }
   else
    {
      setbodyHeight(sideBarHeaderHeight);
    }
  }, [targetRef, setbodyHeight] );



  
  return (
    <div className={classes.sideBarContainer}>
      <SideBarHeader leftIcon = {props.headerLeftIcon}  content = {props.headerContent} rightIcon = {props.headerRightIcon} action = {props.headerAction}/>
      <div className={classes.divider}></div>

      <div  className={classes.sideBarContainer}>
        <SideBarBody height = { bodyHeight } >  {props.body} </SideBarBody>
        <SideBarFooter targetRef = { targetRef } >{props.footer}</SideBarFooter>
      </div>
    </div>
  );
}
