import { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';

type Props = {};

type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  searchName: string,
  filterCentre: string,
  filterBreed: string,
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    

    this.retrieveCats = this.retrieveCats.bind(this);
    this.searchName = this.searchName.bind(this);


    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
      searchName: "",
      filterCentre: "*",
      filterBreed:"*"
    };
  }

  componentDidMount() {
    this.retrieveCats();
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
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

  render() {
    const { searchName, cats } = this.state;

    return (
      <div className="list row">


              <div className="col-md-4">
          <div className="input-group mb-3">
  <label htmlFor="image">Filter by Centre :  </label>
<select className="form-control" >
  <option value="*">All Centre</option>
  <option value="Hong Kong Centre">Hong Kong Centre</option>
  <option value="Kowloon Centre">Kowloon Centre</option>
  <option value="Mui Wo Clinic">Mui Wo Clinic</option>
    <option value="Sai Kung Centre">Sai Kung Centre</option>
</select>
            
           
          </div>
        </div>
        
              <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ID"
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
        
        
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ID"
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


        <div className="col-md-12">
 <div className="card-columns text-secondary">
            {cats.map((cat) => (
              <div key={cat.id} className="card ">
                <img className="card-img-top" loading="lazy" src={'/images/' + cat.image} alt="Card image"></img>
                <div className="card-body">
                  <h5 className="card-title">{cat.name}</h5>
                  <i className="fas fa-map-marker-alt"></i>{' Location: ' + cat.centre}<br />
                  <i className="fas fa-birthday-cake"></i>{' Birthday: ' + cat.DOB}<br />
                  <i className="fas fa-microchip"></i>{' Microchip No.: ' + cat.microchip}

                </div>
              </div>
            ))}
          </div>



        </div>

      </div>
    );
  }
}
