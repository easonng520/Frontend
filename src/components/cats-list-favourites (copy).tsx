import { Component } from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
import ICatData from '../types/cat.type';
//import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import FavouritesService from "../services/favourites.service";
import IUser from "../types/user.type";
type Props = {};
type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  //currentUserFavourites:string
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
       this.showAll = this.showAll.bind(this);

    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      //currentUserFavourites:"favourites"
    };
  }
  componentDidMount() {
     const currentUser = AuthService.getCurrentUser();
     if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  //console.log(currentUser.favourites);
   //  console.log(currentUser.centre);
    
    CatDataService.CatsListFavourites(currentUser.favourites)
      .then((response: any) => {
        this.setState({
          cats: response.data
        });      
      })
      .catch((e: Error) => {
        console.log(e);
      });
 }
/*
  componentWillUnmount() {
    window.location.reload();
  }
  */
  setActiveCat(cat: ICatData, index: number) {
    this.setState({
      currentCat: cat,
      currentIndex: index
    });
  }
   
  showAll() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });
    
    //var data = {
     // favourites: "1,2"
    //};
    var data="1,2"
    
    FavouritesService.update(this.state.currentUser.id, data)
      .then((response: any) => {
        this.setState({
          cats: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  
  render() {
    const {  showAll,cats, currentCat, currentIndex ,currentUser} = this.state;
    return (

           <div className="col-md-12">
             <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.showAll}
              >
                Show All
              </button>
             
             <div>List of Favourites</div>
             <div className="card-columns text-secondary">
          {cats &&
              cats.map((cat: ICatData, index: number) => (
          <Link  key={cat.id} className="text-secondary" to={"/cats/" + cat.id} >
                <div  className="card" >
                  
                <img className="card-img-top" src={'/images/' + cat.image} alt="Card image"></img>
    <div className="card-body">
      <h5 className="card-title">{cat.name+" "}  <i className=" fas fa-heart text-danger"></i></h5>
                    <i className="fas fa-map-marked-alt"></i>{' ' + cat.centre}<br />
                    <i className="fab fa-github"></i>{' ' + cat.breed}<br />
                    <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}<br />
                    <i className="fas fa-microchip"></i>{' ' + cat.microchip}
  </div>
     </div>
           </Link>  
              ))}

            
        </div>
        </div>

    );
  }
}
