import { Component } from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
import ICatData from '../types/cat.type';

type Props = {};

type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.retrieveCats = this.retrieveCats.bind(this);
    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
    };
  }
  componentDidMount() {
    this.retrieveCats();
  }

  
  retrieveCats() {
   // CatDataService. findByCentre("Kowloon Centre")
     CatDataService. findByCentre("")
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
    const {  cats, currentCat, currentIndex } = this.state;

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
