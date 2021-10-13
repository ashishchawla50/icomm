
import { createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";



const useStyles :any= makeStyles((theme: Theme) =>
  createStyles({
    filterWrapper:{
      border:'1px solid #bbb',
      borderRadius: 12,
      marginTop:16
    }
  }),
);
export default useStyles;
