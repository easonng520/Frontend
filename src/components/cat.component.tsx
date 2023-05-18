import React, { Component } from "react";
import CatDataService from "../services/cat.service";
import { withRouter } from '../common/with-router';

class Cat extends Component {
  constructor(props) {
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
   // this.onChangeCentre = this.onChangeCentre.bind(this);
    //this.onChangeBreed = this.onChangeBreed.bind(this);
    this.getCat = this.getCat.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCat = this.updateCat.bind(this);
    this.deleteCat = this.deleteCat.bind(this);

    this.state = {
      currentCat: {
        id: null,
        image: "",
        name: "",
        centre:"",
        breed:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCat(this.props.router.params.id);
  }

    onChangeImage(e) {
    const image = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        image: image
      }
    }));
  }
  
  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCat: {
          ...prevState.currentCat,
          name: name
        }
      };
    });
  }


  onChangeCentre(e) {
    const centre = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        centre: centre
      }
    }));
  }

  
  onChangeBreed(e) {
    const breed = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        breed: breed
      }
    }));
  }

  
  getCat(id) {
    CatDataService.get(id)
      .then(response => {
        this.setState({
          currentCat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCat.id,
      image: this.state.currentCat.image,
      name: this.state.currentCat.name,
      centre: this.state.currentCat.centre,
      breed: this.state.currentCat.breed,
      published: status
    };

    CatDataService.update(this.state.currentCat.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCat: {
            ...prevState.currentCat,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCat() {
    CatDataService.update(
      this.state.currentCat.id,
      this.state.currentCat
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cat was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCat() {    
    CatDataService.delete(this.state.currentCat.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/cats');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCat } = this.state;

    return (
      <div>
        {currentCat ? (
          <div className="edit-form">
            <h4>Cat</h4>
            <form>
             
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  value={currentCat.image}
                  onChange={this.onChangeImage}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCat.name}
                  onChange={this.onChangeName}
                />
              </div>
             
          
   <div className="form-group">
                <label htmlFor="centre">Centre</label>
                <input
                  type="text"
                  className="form-control"
                  id="centre"
                  value={currentCat.centre}
                  onChange={this.onChangeCentre}
                />
              </div> 

                 <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  value={currentCat.breed}
                  onChange={this.onChangeBreed}
                />
              </div> 
              
              
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCat.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCat.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCat}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCat}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Cat...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Cat);