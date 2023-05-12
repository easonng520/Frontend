import { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';

type Props = {};

type State = {
  cats: Array<ICatData>,
  currentCat: ICatData | null,
  currentIndex: number,
  searchTitle: string
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCats = this.retrieveCats.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      cats: [],
      currentCat: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCats();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
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



  searchTitle() {
    this.setState({
      currentCat: null,
      currentIndex: -1
    });

    CatDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle, cats } = this.state;

    return (
      <div className="list row">
        <div className="col-md-2">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ID"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>


        <div className="col-md-12">


          <div className="card-columns text-secondary">
            {cats.map((cat) => (
              <div key={cat.id} className="card ">
                <img className="card-img-top" loading="lazy" src={'/images/' + cat.id} alt="Card image"></img>
                <div className="card-body">
                  <h5 className="card-title">{cat.id}</h5>
                  <i className="fas fa-map-marker-alt"></i>{' ' + cat.id}<br />
                  <i className="fas fa-birthday-cake"></i>{' ' + cat.id}<br />
                  <i className="fas fa-microchip"></i>{' ' + cat.id}

                </div>
              </div>
            ))}
          </div>



        </div>

      </div>
    );
  }
}
