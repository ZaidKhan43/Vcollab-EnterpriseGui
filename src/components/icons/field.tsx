import SvgIcon from '@material-ui/core/SvgIcon';

function Field(props:any) {
  return (
    <SvgIcon  {...props}>
    <path d="M2 3.66667V18.3333H18V20.1667H2C0.9 20.1667 0 19.3417 0 18.3333V3.66667H2ZM20 0H6C4.89 0 4 0.815833 4 1.83333V14.6667C4 15.675 4.9 16.5 6 16.5H20C21.11 16.5 22 15.6842 22 14.6667V1.83333C22 0.825 21.1 0 20 0ZM20 14.6667H6V1.83333H20V14.6667ZM10 11.9167H7V13.75H10V11.9167ZM14 11.9167H11V13.75H14V11.9167ZM10 9.16667H7V11H10V9.16667ZM14 9.16667H11V11H14V9.16667ZM10 6.41667H7V8.25H10V6.41667ZM14 6.41667H11V8.25H14V6.41667Z" fill="currentColor"/>
    </SvgIcon>
  );
}

export default function FieldIcon(props:any) {

  return (
      <Field viewBox="0 0 22 21" {...props}/>
  );
}