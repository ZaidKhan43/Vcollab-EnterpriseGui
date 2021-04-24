import SvgIcon from '@material-ui/core/SvgIcon';

function More(props:any) {
  return (
    <SvgIcon  {...props}>
     <path d="M3.76923 15.7692C5.29863 15.7692 6.53846 14.5293 6.53846 12.9999C6.53846 11.4705 5.29863 10.2307 3.76923 10.2307C2.23983 10.2307 1 11.4705 1 12.9999C1 14.5293 2.23983 15.7692 3.76923 15.7692Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M3.76923 6.53846C5.29863 6.53846 6.53846 5.29863 6.53846 3.76923C6.53846 2.23983 5.29863 1 3.76923 1C2.23983 1 1 2.23983 1 3.76923C1 5.29863 2.23983 6.53846 3.76923 6.53846Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M3.76923 24.9999C5.29863 24.9999 6.53846 23.7601 6.53846 22.2307C6.53846 20.7013 5.29863 19.4614 3.76923 19.4614C2.23983 19.4614 1 20.7013 1 22.2307C1 23.7601 2.23983 24.9999 3.76923 24.9999Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function MoreIcon() {

  return (

      <More viewBox="0 0 8 26"/>
  );
}