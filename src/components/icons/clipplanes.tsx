import SvgIcon from '@material-ui/core/SvgIcon';

function Clipplanes(props:any) {
  return (
    <SvgIcon  {...props}>
      <path d="M5.28481 5.28564H1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M5.28613 1V20.7143H25.0003" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M20.7147 17.2857V5.28564H8.71387" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M20.7139 25.0001V20.7144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    </SvgIcon>
  );
}

export default function ClipplanesIcon() {

  return (
      <Clipplanes viewBox="0 0 26 26"/>
  );
}