import { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';

type Props = {};

type State = ICatData & {
  submitted: boolean
};

export default class AddCat extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);

    this.saveCat = this.saveCat.bind(this);
    this.newCat = this.newCat.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

       name: "",
       breed: "",
         
      submitted: false
     
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }
  
    onChangeBreed(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      breed: e.target.value
    });
  }
  
  saveCat() {
    const data: ICatData = {
    title: this.state.title,
    description: this.state.description,
    
    name: this.state.name,
    breed: this.state.breed
    };

    CatDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          name: response.data.name,
          breed: response.data.breed,

          
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newCat() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      name: "",
      breed: "",
      
      submitted: false
    });
  }

  render() {
    const { submitted, title, description, name, breed, } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCat}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

           
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>


            <div className="form-group">
              <label htmlFor="catname">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                
                value={name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                className="form-control"
                id="breed"
                
                value={breed}
                onChange={this.onChangeBreed}
                name="breed"
              />
            </div>

            
            <button onClick={this.saveCat} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
