import MuiSvgIcon from '@material-ui/core/SvgIcon';

function Shade(props:any) {
  return (
    <MuiSvgIcon  {...props}>
      <path d="M0.5 14V5L8.375 9.5V18.5L0.5 14Z" fill="#DBDADA"/>
      <path d="M8.375 9.5L16.25 5V14L8.375 18.5V9.5Z" fill="#ACAAAA"/>
      <path d="M8.375 0.5L0.5 5L8.375 9.5L16.25 5L8.375 0.5Z" fill="white"/>
    </MuiSvgIcon>
  );
}

export default function Shaded() {

  return (
      <Shade viewBox="0 0 17 20"/>
  );
}