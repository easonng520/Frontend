import { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import ICatData from '../types/cat.type';
import * as Yup from "yup";
const centreList = ["Hong Kong Centre", "Kowloon Centre", "Mui Wo Clinic", "Sai Kung Centre"];
const breedList = ["Bengal Cross", "Chinchilla", "Domestic Short Hair", "Domestic Long Hair", "Scottish Fold"];
const sexList = ["Male", "Female"];
type Props = {};

type State = ICatData & {
  submitted: boolean
};

export default class AddCat extends Component<Props, State> {
  constructor(props: Props) {
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
    
    this.saveCat = this.saveCat.bind(this);
    this.newCat = this.newCat.bind(this);

    this.state = {
      id: null,
      published: false,
      name: "",
      sex:"",
      breed:"",
      DOB:"",   
      microchip:"",
      centre:"",
      status:"",        
      image: "",
      remark:"", 
      submitted: false
    };
  }
 onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSex(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      sex: e.target.value
    });
  }

    onChangeBreed(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      breed: e.target.value
    });
  }

    onChangeDOB(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      DOB: e.target.value
    });
  }

  onChangeMicrochip(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      microchip: e.target.value
    });
  }
  
  onChangeCentre(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      centre: e.target.value
    });
  }
  onChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      status: e.target.value
    });
  }
    onChangeImage(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      image: e.target.value
    });
  }
    onChangeRemark(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      remark: e.target.value
    });
  }
  
  saveCat() {
    const data: ICatData = {
    name: this.state.name,
    sex: this.state.sex,
    breed: this.state.breed,
    DOB: this.state.DOB,
    microchip: this.state.microchip,
    centre: this.state.centre,
    status: this.state.status,
    image: this.state.image,
    remark: this.state.remark,
    };

    CatDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          published: response.data.published,
          name: response.data.name,
          sex: response.data.sex,
          breed: response.data.breed,
          DOB: response.data.DOB,
          microchip: response.data.microchip,
          centre: response.data.centre,
          status: response.data.status,
          image: response.data.image,
          remark: response.data.remark,
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
      published: false,
      name: "",
      sex: "",
      breed: "",
      DOB: "",
      microchip: "",
      centre: "",
      status: "",
      image: "",
      remark: "",
      submitted: false
    });
  }

  render() {
    const { submitted,  name, sex, breed,DOB,microchip,centre,status,image,remark} = this.state;

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
              <label htmlFor="name">Name</label>
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
              <label htmlFor="sex">Sex</label>
        <select 
                 className="form-control"
               id="sex"
              value={this.state.sex} 
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
                
                value={DOB}
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
                
                value={microchip}
                onChange={this.onChangeMicrochip}
                name="microchip"
              />
            </div>

               <div className="form-group">
              <label htmlFor="centre">Centre</label>
                  <select 
                 className="form-control"
               id="breed"
              value={this.state.centre} 
              onChange={this.onChangeCentre}
               
             >
             <option> - Please Select - </option>
             {centreList.map((centre) => (
              <option key={centre} value={centre}>
                {centre}
              </option>
            ))}
          </select>
            </div>

            
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                
                value={image}
                onChange={this.onChangeImage}
                name="image"
              />
            </div>

            <div className="form-group">
              <label htmlFor="remark">Remark</label>
              <input
                type="text"
                className="form-control"
                id="remark"
                
                value={remark}
                onChange={this.onChangeRemark}
                name="remark"
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
