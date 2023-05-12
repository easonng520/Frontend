import { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
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
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCat = this.setActiveCat.bind(this);
    this.removeAllCats = this.removeAllCats.bind(this);
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

  removeAllCats() {
    CatDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
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
    const { searchTitle, cats, currentCat, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
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
                  {cat.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCats}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCat ? (
            <div>
              <h4>Cat</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCat.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCat.description}
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
