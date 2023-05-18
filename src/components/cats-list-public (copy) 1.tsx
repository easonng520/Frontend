import { Component, ChangeEvent ,useState} from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';



 
type Props = {};

type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  searchName: string,
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
  



  render() {
    
      const [ setCentre,setBreed] = useState(1);
const [centreFilter, breedFilter,setCentreFilter,setBreedFilter] = useState(3);
const centreList = ["Hong Kong Centre", "Kowloon Centre", "Mui Wo Clinic","Sai Kung Centre"];
const breedList = ["Bengal Cross","Chinchilla","Domestic Short Hair","Domestic Long Hair","Scottish Fold"];
  
 const centreFilterChange = (event) => {
    setCentreFilter(event.target.value);
    setCentre(1);
  };

  const breedFilterChange = (event) => {
    setBreedFilter(event.target.value);
    setBreed(1);
  };
    
    const { searchName, cats } = this.state;

    return (
      <div className="list row mt-3">

        { /*Centre */}
        
      <div className="col-md-4">
          <div className="input-group mb-3">
              {"Filter by centre: "}
          <select      className="form-control" onChange={centreFilterChange} value={centreList}>
            {centreList.map((centre) => (
              <option key={centre} value={centre}>
                {centre}
              </option>
            ))}
          </select>

          </div>
        </div>

           { /*Breed */}     
        <div className="col-md-4">
          <div className="input-group mb-3">
           
            
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
                <img className="card-img-top"  src={'/images/' + cat.image} alt="Card image"></img>
                <div className="card-body">
                  <h5 className="card-title">{cat.name}</h5>
                <i className="fas fa-map-marked-alt"></i>{' ' +cat.centre}<br />
                 <i className="fab fa-github"></i>{' ' + cat.breed}<br />
               <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}<br />
                 <i className="fas fa-microchip"></i>{' ' + cat.microchip}

                </div>
              </div>
            ))}
          </div>



        </div>

      </div>
    );
  }
}
