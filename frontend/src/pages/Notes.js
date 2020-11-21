import React,{useState,useEffect} from "react";
import {isAuthenticated,getNotes} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import PinDropIcon from '@material-ui/icons/PinDrop';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import Bg from "../images/bg.png";


const useStyles = makeStyles((theme) => ({
heading:{
  marginTop:70,
  textAlign:"center",
  fontSize:30
},
icon:{
  textAlign:"right"
},
wanote: {
    width: 500,
    margin:20,
    padding:"30px 30px 10px 30px",
  backgroundColor:"#e2ffc7"
  },
  mesnote: {
      width: 500,
      margin:20,
      padding:"30px 30px 10px 30px",
    //backgroundColor:"#0a7af9"
    },
    meslink:{
      color:"#0099cc",
      fontSize:20
    },
    walink:{
      color:"#0099cc",
      fontSize:20
    },
    mestext:{
      //color:"#0a7af9"
    },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop:20,
    textAlign:"right"
  },


}));

const Notes=()=>{
const classes = useStyles();
const [history,setHistory]=useState([]);
const {user:{_id,username}}=isAuthenticated();
  const token = isAuthenticated().token;
const init=(userId,token)=>{
  getNotes(userId,token).then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      setHistory(data);
    }
  })
}
useEffect(()=>{
  init(_id,token);
},[]);

const showHistory=history=>{
  return(
    <div>
    <Grid container>
    <Grid item sm/>
    <Grid item sm>
    {
      history.slice(0).reverse().map((h,i)=>{
        if(h.source==="whatsapp"){
          if(h.isAttachment==="true"){
            return(
              <div>
              <Card className={classes.wanote} variant="outlined">


                  <CardContent>
                  <div className={classes.icon}>
                  <PinDropIcon color="primary"/>
                  <DeleteIcon style={{ color: red[900] }}/>
                  </div>
                  <CardActions>
               <a href={h.noteText} target="_blank" className={classes.walink}>{h.noteText}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div>
              <Card className={classes.wanote} variant="outlined">
                   <CardContent>
                   <div className={classes.icon}>
                   <PinDropIcon color="primary"/>
                   <DeleteIcon style={{ color: red[900] }}/>
                   </div>
                    <Typography variant="h6">
                       {h.noteText}
                     </Typography>
                     <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }
        }else{
          if(h.isAttachment==="true"){
            return(
              <div>
              <Card className={classes.mesnote} variant="outlined">

                  <CardContent>
                  <div className={classes.icon}>
                  <PinDropIcon color="secondary" />
                  <DeleteIcon style={{ color: red[900] }} />
                  </div>
                  <CardActions>
               <a href={h.noteText} target="_blank"className={classes.meslink}>{h.noteText}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div>
              <Card className={classes.mesnote} variant="outlined">
                   <CardContent>
                   <div className={classes.icon}>
                   <PinDropIcon color="secondary"/>
                   <DeleteIcon style={{ color: red[900] }} />
                   </div>
                    <Typography variant="h6" className={classes.mestext}>
                       {h.noteText}
                     </Typography>

                     <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }
        }

    })}

    </Grid>
    <Grid item sm/>
    </Grid>

    </div>
  )
}

return (<div style={{backgroundImage:`url(${Bg})`,width: '100vw',height: '100%'}}>
    <Navbar/>
  <div>


  <Typography className={classes.heading} color="primary" gutterBottom>
Your notes
  </Typography>
{showHistory(history)}
  </div>
  </div>
);
}

export default Notes;
