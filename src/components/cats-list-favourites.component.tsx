import React, { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import FavouritesService from "../services/favourites.service";

import IUser from "../types/user.type";

const centreList = ["Hong Kong Centre", "Kowloon Centre", "Mui Wo Clinic", "Sai Kung Centre"];
const breedList = ["Bengal Cross", "Chinchilla", "Domestic Short Hair", "Domestic Long Hair", "Scottish Fold"];

type Props = {};
type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  searchName: string,
  showAll: string,
  searchCentre: string,
  searchBreed: string,
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchCentre = this.onChangeSearchCentre.bind(this);
    this.onChangeSearchBreed = this.onChangeSearchBreed.bind(this);
    this.retrieveCats = this.retrieveCats.bind(this);
    this.searchName = this.searchName.bind(this);
    this.showAll = this.showAll.bind(this);
    this.searchCentre = this.searchCentre.bind(this);
    this.searchBreed = this.searchBreed.bind(this);
    this.updateFavourites = this.updateFavourites.bind(this);

    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
      searchName: "",
      showAll:"",
      searchCentre: "",
      searchBreed: "",
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
     if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
 //console.log(currentUser.email);
   //  console.log(currentUser.username);
     //console.log(currentUser.id);
    this.retrieveCats();
  }

  updateFavourites(catid,userid,favourites){
   const array = JSON.parse("["+favourites+"]");
    //console.log(array)
let result = array.map(i=>Number(i));
    const arrayOfLetters = result;
const arrayWithoutD = arrayOfLetters.filter(function (letter) {
    return letter !== userid;
});

// arrayOfLetters is unchanged
console.log(arrayOfLetters); // ['a', 'b', 'c', 'd', 'e', 'f']
console.log(arrayWithoutD); // ['a', 'b', 'c', 'e', 'f']

  console.log('userid:'+userid);
  console.log('catid:'+catid);
  
    favourites=('favourites='+arrayWithoutD)
    console.log(favourites)
  //favourites=('favourites=1,2,3,4')
  
FavouritesService.update(catid,favourites )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cat was updated successfully!"
          
        });
      })
      .catch(e => {
        console.log(e);
      });
   alert(`Favourites Updated`); 
  window.location.reload();
  }

  //onChangeSearchName
  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }

  //onChangeSearchCentre
  onChangeSearchCentre(e: ChangeEvent<HTMLInputElement>) {
    const searchCentre = e.target.value;
    this.setState({
      searchCentre: searchCentre
    });
  }

  //onChangeSearchBreed
  onChangeSearchBreed(e: ChangeEvent<HTMLInputElement>) {
    const searchBreed = e.target.value;
    this.setState({
      searchBreed: searchBreed
    });
  }
  retrieveCats() {
    CatDataService.getAll()
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

  refreshList() {
    this.retrieveCats();
    this.setState({
      currentCat: null,
      currentIndex: -1
    });
  }

  setActiveCat(cat: ICatData, index: number) {
    this.setState({
      currentCat: cat,
      currentIndex: index
    });
  }


  //searchName
  searchName() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });

    CatDataService.findByName(this.state.searchName)
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

    //searchName
  showAll() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });

    CatDataService.getAll()
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

  
  //  searchCentre
  searchCentre() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });
    CatDataService.findByCentre(this.state.searchCentre)
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

  //searchBreed
  searchBreed() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });

    CatDataService.findByBreed(this.state.searchBreed)
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
    const { searchName,showAll, searchBreed, searchCentre, cats,currentUser ,favourites} = this.state;
    return (
     <div className="list row">
        {/* Select Centre */}
        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-control" onChange={this.onChangeSearchCentre}    value={searchCentre}>
<option  value=""> All Centre</option>
              {centreList.map((centre) => (
                <option key={centre} value={centre}>
                  {centre}
                </option>
              ))}

            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCentre}
              >
                Filter by Centre
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-control" onChange={this.onChangeSearchBreed}    value={searchBreed}>
            <option  value=""> All Breed</option>
              {breedList.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}

            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBreed}
              >
                Filter by Breed
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search by Name
              </button>
            </div>
          </div>
        </div>

<div className="col-md-3">
          <div className="input-group mb-3">
                       
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.showAll}
              >
                Show All
              </button>
           
          </div>
        </div>
        
        <div className="col-md-12">
           <div>List of My Favourite Cats</div>
          <div className="card-columns text-secondary">
            {cats.map((cat) => (
             <div key={cat.id} >
                  {
               (() => {
                   const array = JSON.parse("["+cat.favourites+"]");
    //console.log(array)
let result = array.map(i=>Number(i));
                  const isFavourites = array.includes(currentUser.id);
                    if(isFavourites) {
                            return (
              <div  className="card">
                <img className="card-img-top" src={'https://backend.easonng520.repl.co/api/files/' + cat.image} alt="Card image"></img>
                <div className="card-body ">
                <h5 className="card-title">{cat.name+" "}   
                               <i className="btn fas fa-heart text-danger"
                                 onClick=  {() => this.updateFavourites(cat.id,currentUser.id,cat.favourites)}
                               
                                 ></i>
                           </h5>
                <i className="fas fa-map-marked-alt"></i>{' ' + cat.centre}<br />
                <i className="fab fa-github"></i>{' ' + cat.breed}<br />
                <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}<br />
                <i className="fas fa-microchip"></i>{' ' + cat.microchip}
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
      </div>
    );
  }
}
