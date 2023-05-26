import React, { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';
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
    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
      searchName: "",
      showAll:"",
      searchCentre: "",
      searchBreed: ""
    };
  }

  componentDidMount() {
    this.retrieveCats();
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
    const { searchName,showAll, searchBreed, searchCentre, cats } = this.state;

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
           
          <div className="card-columns text-secondary">
            {cats.map((cat) => (
              <div key={cat.id} className="card ">
                <img className="card-img-top" src={'https://backend.easonng520.repl.co/api/files/' + cat.image} alt="Card image"></img>
                <div className="card-body container-fluid">
                <h5 className="card-title">{cat.name} {/*<i className="btn disabled far  fa-heart text-danger"></i>*/}</h5>
                <i className="fas fa-map-marked-alt"></i>{' ' + cat.centre}<br />
                <i className="fab fa-github"></i>{' ' + cat.breed}<br />
                <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}<br />
                <i className="fas fa-microchip"></i>{' ' + cat.microchip}<br/>

                  </div> 
                {/*card-footer*/}
           <div className="card-footer">Messages 
           
           
           <button data-bs-toggle="collapse" className="btn-block mt-3" data-bs-target={'#collapse'+cat.id}>
                    Message<span className=" badge rounded-pill bg-danger"> 9</span> </button>
<div id={'collapse'+cat.id} className="collapse">
Lorem ipsum dolor text....
 </div>


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
                Send
              </button>
            </div> 
 </div>

             
           </div>   
          {/*card-footer*/}     
              
              
              
              </div>

  
            ))}
          </div>
        </div>

        
      </div>
    );
  }
}
