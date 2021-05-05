import SvgIcon from '@material-ui/core/SvgIcon';

function ThreePoints(props:any) {
  return (
    <SvgIcon  {...props}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="1" fill="#DFDEDE"/>
<circle cx="20" cy="20" r="1" fill="#DFDEDE"/>
<circle cx="10" cy="20" r="1" fill="#DFDEDE"/>
<circle cx="10" cy="20" r="1" fill="#DFDEDE"/>
<circle cx="15" cy="10" r="1" fill="#DFDEDE"/>
<circle cx="15" cy="10" r="1" fill="#DFDEDE"/>
</svg>
    </SvgIcon>
    
  );
}

export default function ThreePointsIcon() {

  return (
      <ThreePoints viewBox="0 0 30 30"/>
  );
}