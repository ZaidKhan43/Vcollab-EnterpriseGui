import SvgIcon from '@material-ui/core/SvgIcon';

function HiddenLine(props:any) {
  return (
    <SvgIcon  {...props}>
    <path fill="none" d="M8.64655 9.5L8.55361 18.5" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill="none" d="M16.6073 13.6435V5.35655C16.6073 5.23253 16.5744 5.11074 16.5119 5.00362C16.4494 4.8965 16.3595 4.8079 16.2516 4.74688L8.89824 0.590647C8.79312 0.531227 8.67441 0.5 8.55365 0.5C8.43289 0.5 8.31418 0.531227 8.20905 0.590647L0.855721 4.74688C0.747756 4.8079 0.657932 4.8965 0.595433 5.00362C0.532933 5.11074 0.5 5.23253 0.5 5.35655V13.6435C0.5 13.7675 0.532933 13.8893 0.595432 13.9964C0.657932 14.1035 0.747756 14.1921 0.855721 14.2531L8.20905 18.4094C8.31418 18.4688 8.43289 18.5 8.55365 18.5C8.67441 18.5 8.79312 18.4688 8.89824 18.4094L16.2516 14.2531C16.3595 14.1921 16.4494 14.1035 16.5119 13.9964C16.5744 13.8893 16.6073 13.7675 16.6073 13.6435V13.6435Z" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill="none" d="M16.5114 5.00292L8.64668 9.50009L0.596626 5.00195" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

export default function HiddenLineIcon() {

  return (
      <HiddenLine viewBox="0 0 17 20"/>
  );
}