export type MainMenuItem = {
    title: string,
    icon: JSX.Element,
    disabled: boolean,
    onClick: ()=> void,
    list:{
        title: string,
        onClick: ()=> void,
    }
}