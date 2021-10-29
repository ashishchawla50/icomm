
import { createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";



const useStyles :any= makeStyles((theme: Theme) =>
  createStyles({
    filterWrapper:{
      border:'1px solid #bbb',
      borderRadius: 12,
      marginTop:16
    },
    errorSpace:{
      float: 'left', 
      height: 0,
      width: '100%'
    },
    datePicker:{
      
      "& .MuiFormControl-root":{
        width:"100%"
      }
    }
  }),
);
export default useStyles;
 