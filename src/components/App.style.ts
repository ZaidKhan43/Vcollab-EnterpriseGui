import { makeStyles } from "@material-ui/core/styles";


export const topbarHeight = 48;

export const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: topbarHeight, 
  },
  content: {
    flexGrow: 1,
  },
  viewerContainer: {
    width: "100%",
    height: `calc(100vh - ${topbarHeight}px)`,
    display: "flex",
    zIndex: 1000,
    background: "linear-gradient(#a0a0ff, white)"
  },
}));
