import React, { Component } from "react";
import CatDataService from "../services/cat.service";
import { withRouter } from '../common/with-router';

import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

const centreList = ["Hong Kong Centre", "Kowloon Centre", "Mui Wo Clinic", "Sai Kung Centre"];
const breedList = ["Bengal Cross", "Chinchilla", "Domestic Short Hair", "Domestic Long Hair", "Scottish Fold"];
const sexList = ["Male", "Female"];

type Props = {};
type State = {
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  currentUserCentre:string
};




class Cat extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeMicrochip = this.onChangeMicrochip.bind(this);
    this.onChangeCentre = this.onChangeCentre.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeRemark = this.onChangeRemark.bind(this);
   
    this.getCat = this.getCat.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCat = this.updateCat.bind(this);
    this.deleteCat = this.deleteCat.bind(this);

    this.state = {
     userReady: false,
      currentUser: { accessToken: "" },
      currentUserCentre:"centre",
      
      currentCat: {
        id: null,
    name: "",
      sex:"",
      breed:"",
      DOB:"",   
      microchip:"",
      centre:"",
      status:"",        
      image: "",
      remark:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
 const currentUser = AuthService.getCurrentUser();
     if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    
    
    this.getCat(this.props.router.params.id);
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


  onChangeBreed(e) {
    const breed = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        breed: breed
      }
    }));
  }

  
 onChangeSex(e) {
    const sex = e.target.value;
    this.setState(function(prevState) {
      return {
        currentCat: {
          ...prevState.currentCat,
          sex: sex
        }
      };
    });
  }

  onChangeDOB(e) {
    const DOB = e.target.value;
    this.setState(function(prevState) {
      return {
        currentCat: {
          ...prevState.currentCat,
          DOB: DOB
        }
      };
    });
  } 

    onChangeMicrochip(e) {
    const Microchip = e.target.value;
    this.setState(function(prevState) {
      return {
        currentCat: {
          ...prevState.currentCat,
          Microchip: Microchip
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

  onChangeStatus(e) {
    const status = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        status: status
      }
    }));
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
  
   
  onChangeRemark(e) {
    const remark = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        remark: remark
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
      <div className="container">
        {currentCat ? (
          <div className="edit-form">
            <h4>Cat</h4>
            <form>
              
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
              <label htmlFor="sex">Sex</label>
        <select 
                 className="form-control"
               id="sex"
              value={currentCat.sex} 
              onChange={this.onChangeSex}
             >
             <option> - Please Select - </option>
             {sexList.map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </select>
            </div>


<div className="form-group">
  <label htmlFor="breed">Breed</label>
              <select 
                 className="form-control"
               id="breed"
              value={this.state.breed} 
              onChange={this.onChangeBreed}
              >
             <option> - Please Select - </option>
             {breedList.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          </div>


            <div className="form-group">
              <label htmlFor="DOB">DOB</label>
              <input
                type="date"
                className="form-control"
                id="DOB"
                value={currentCat.DOB}
                onChange={this.onChangeDOB}
                name="DOB"
              />
            </div>

            <div className="form-group">
              <label htmlFor="microchip">Microchip</label>
              <input
                type="number"
                className="form-control"
                id="microchip"
                
               
                onChange={this.onChangeMicrochip}
                name="microchip"
              />
            </div>    

  
                 <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                
                value={currentCat.image}
                onChange={this.onChangeImage}
                name="image"
              />
            </div>
          
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCat.published ? "Published" : "Pending"}
              </div>
            </form>

            {/*currentCat.published ? (
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
            )*/}

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