import { Component } from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
import ICatData from '../types/cat.type';
//import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

 

type Props = {};
type State = {
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
   // this.retrieveCats = this.retrieveCats.bind(this);
    this.state = {
      cats: [],
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

    CatDataService. findByCentre(currentUser.centre)
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

  setActiveCat(cat: ICatData, index: number) {
    this.setState({
      currentCat: cat,
      currentIndex: index
    });
  }

  render() {
    const {  cats, currentCat, currentIndex ,currentUser} = this.state;
    return (
      <div className="list row">
       
        <div className="col-md-6">
          <h4>Cats List</h4>
          <ul className="list-group">
            {cats &&
              cats.map((cat: ICatData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCat(cat, index)}
                  key={index}
                >
                  {cat.name}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentCat ? (
            <div>
              <h4>Cat</h4>
             
               <div>
                <label>
                  <strong>Image:</strong>
                </label>{" "}
                {currentCat.image}
              </div>
              
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCat.name}
              </div>

               <div>
                <label>
                  <strong>Centre:</strong>
                </label>{" "}
                {currentCat.centre}
              </div>

               <div>
                <label>
                  <strong>Breed:</strong>
                </label>{" "}
                {currentCat.breed}
              </div>

               <div>
                <label>
                  <strong>DOB:</strong>
                </label>{" "}
                {currentCat.DOB}
              </div>

              
               <div>
                <label>
                  <strong>Microchip no:</strong>
                </label>{" "}
                {currentCat.microchip}
              </div>

              
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCat.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/cats/" + currentCat.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Cat...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
