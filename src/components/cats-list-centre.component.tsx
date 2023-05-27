import React, { Component, ChangeEvent }  from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
import ICatData from '../types/cat.type';
//import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import MessageDataService from "../services/message.service";
import IMessageData from '../types/message.type';

type Props = {};
type State = {
     messages: Array<IMessageData>,
cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  currentUserCentre:string
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    //this.retrieveCats = this.retrieveCats.bind(this);
this.retrieveMessages = this.retrieveMessages.bind(this);

    this.state = {
      cats: [],  
      messages: [],

      currentCat: null,
      currentIndex: -1,
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      currentUserCentre:"centre"
    };
  }
  componentDidMount() {
     const currentUser = AuthService.getCurrentUser();
     if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    this.retrieveMessages();

    CatDataService. findByCentre(currentUser.centre)
      .then((response: any) => {
        this.setState({
          cats: response.data
        });
        console.log(currentUser.centre);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 }

  retrieveMessages() {
    MessageDataService.getAll()
      .then((response: any) => {
        this.setState({
          messages: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
delMessage(){
  alert(`Message Deleted!`);  
}
  replyMessage(){
 alert(`Message Replied!`); 
    
  }
  
  setActiveCat(cat: ICatData, index: number) {
    this.setState({
      currentCat: cat,
      currentIndex: index
    });
  }

  render() {
    const {  cats, currentCat, currentIndex ,currentUser,messages} = this.state;
    return (

           <div className="col-md-12">
             <div>List of Centre</div>
             <div className="card-columns text-secondary">
          {cats &&
              cats.map((cat: ICatData, index: number) => (
          
                <div key={cat.id} className="card" >
                  
                <img className="card-img-top" src={'https://b.easonng520.repl.co/api/files/' + cat.image} alt="Card image"></img>
    <div className="card-body">
     <Link  key={cat.id} className="text-secondary" to={"/cats/" + cat.id} > <h5 className="card-title">{cat.name} <i className="btn disabled fas fa-edit "></i></h5> </Link>  


      
     <div className="row">
  <div className="col-sm"><i className="fas fa-map-marked-alt"></i>{' ' + cat.centre}</div>
  <div className="col-sm"><i className="fab fa-github"></i>{' ' + cat.breed}</div>
                  </div>    
                  <div className="row">
                    <div className="col-sm"> <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}</div>
  <div className="col-sm"> <i className="fas fa-microchip"></i>{' ' + cat.microchip}</div>
</div>

    
     
    
    </div>



   {/*card-footer*/}
           <div className="card-footer mt-0 p-2" > 
           







             
             

  <button className="btn mt-0 p-0 btn-block text-info border-bottom" data-toggle="collapse" data-target={"#demo"+cat.id}>
  <i className='fas fa-comments'></i>   MESSAGE 
  </button>

             <div id={"demo"+cat.id} className="collapse container-fluid">

               
              {messages.map((message) => (
             <div  key={message.id} className="≈container-fluid">
                  {
               (() => {
                  //console.log(message.catid)
                
                    if(message.catid === cat.id) {
                            return (
                            <div>
                       
                           {message.message !=null &&

<div className="row pt-2 ">
                            <div className="input-group pt-2 ">
           <div className="input-group-append">
              <button
                className="btn btn-outline-secondary "
                type="button"
                onClick={this.delMessage}
                
              >
                Delete
              </button>
            </div> 
               <input
              type="text"
              name={"txt"+cat.id}
              className="form-control "
              value={message.message}
             
            />
            
            </div>
                  
</div>
                             
      }

  <div className="row pt-2 ">
                 
                 <div className="input-group pt-2 ">
            <input
              type="text"
              name={"txt"+cat.id}
              className="form-control "
            
             value={message.reply}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.replyMessage}
              >
                Reply
              </button>
            </div> 
 </div>
    
    </div>


                              
                            
                            </div>                
                            
                            )



                      
                        }  
                })()  
            }  
           
             
             </div>
           )
                   )}
               

               
               
           

               
</div>
            
           </div>   
          {/*card-footer*/}   

                  
     </div>
          
              ))}

            
        </div>
        </div>

    );
  }
}
