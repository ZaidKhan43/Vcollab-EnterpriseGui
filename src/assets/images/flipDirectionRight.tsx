import MuiSvgIcon from '@material-ui/core/SvgIcon';

function FlipDirectionRight(props:any) {
  return (
    <MuiSvgIcon  {...props}>
<svg width="61" height="90" viewBox="0 0 61 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 0L44 30V90L14 60V0Z" fill="currentColor" fill-opacity="0.5"/>
<path d="M1 43.5455C0.447715 43.5455 0 43.9932 0 44.5455C0 45.0978 0.447715 45.5455 1 45.5455V43.5455ZM17 43.5455H1V45.5455H17V43.5455Z"  fill="currentColor" fill-opacity="0.5"/>
<path d="M7.54545 38L1 44.5455L7.54545 51.0909" opacity="0.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M60 45.4545C60.5523 45.4545 61 45.0068 61 44.4545C61 43.9022 60.5523 43.4545 60 43.4545V45.4545ZM44 45.4545H60V43.4545H44V45.4545Z" fill="currentColor"/>
<path d="M53.4545 51L60 44.4545L53.4545 37.9091" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </MuiSvgIcon>
  );
}

export default function FlipDirectionRightIcon() {

  return (
      <FlipDirectionRight viewBox="0 0 61 90" style={{fontSize:"80px"}}/>
  );
}
