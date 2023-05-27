import React, { Component, ChangeEvent } from "react";
import CatDataService from "../services/cat.service";
import MessageDataService from "../services/message.service";
import ICatData from '../types/cat.type';
import IMessageData from '../types/message.type';

const centreList = ["Hong Kong Centre", "Kowloon Centre", "Mui Wo Clinic", "Sai Kung Centre"];
const breedList = ["Bengal Cross", "Chinchilla", "Domestic Short Hair", "Domestic Long Hair", "Scottish Fold"];
type Props = {};
type State = {
  messages: Array<IMessageData>
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

    this.retrieveMessages = this.retrieveMessages.bind(this);

    
    this.searchName = this.searchName.bind(this);
    this.showAll = this.showAll.bind(this);
    this.searchCentre = this.searchCentre.bind(this);
    this.searchBreed = this.searchBreed.bind(this);
    this.state = {
      cats: [],
        messages: [],
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
     this.retrieveMessages();
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

  retrieveMessages() {
    MessageDataService.getAll()
      .then((response: any) => {
        this.setState({
          messages: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
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
    const { searchName,showAll, searchBreed, searchCentre, cats ,messages} = this.state;

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
                <div className="card-body p-3">
                <h5 className="card-title">{cat.name} {/*<i className="btn disabled far  fa-heart text-danger"></i>*/}</h5>

                  <div className="row">
  <div className="col-sm"><i className="fas fa-map-marked-alt"></i>{' ' + cat.centre}</div>
  <div className="col-sm"><i className="fab fa-github"></i>{' ' + cat.breed}</div>
                  </div>    
                  <div className="row">
                    <div className="col-sm"> <i className="fas fa-birthday-cake"></i>{' ' + cat.DOB}</div>
  <div className="col-sm"> <i className="fas fa-microchip"></i>{' ' + cat.microchip}</div>
</div>
                  

                  
                  </div> 
 

   {/*card-footer*/}
           <div className="card-footer mt-0 p-2" > 
           







             
             

  <button className="btn mt-0 p-0 btn-block text-info border-bottom" data-toggle="collapse" data-target={"#demo"+cat.id}>
  <i className='fas fa-comments'></i>   MESSAGE 
  </button>

             <div id={"demo"+cat.id} className="collapse container-fluid">

               
              {messages.map((message) => (
             <div  key={message.id} className="≈container-fluid">
                  {
               (() => {
                  //console.log(message.catid)
                
                    if(message.catid === cat.id) {
                            return (
                            <div>
                       
                           {message.message !=null &&

<div className="row pt-2 ">
                  <div className="col-sm-1 text-info"> <i className='far fa-comment-alt'></i></div>
  <div className="col-sm-7  text-start border bg-light">{message.message}</div>
                  
</div>

                             
      }
{message.reply !=null &&
  <div className="row pt-2 ">
                  <div className="col-sm-4"></div>
  <div className="col-sm-7 text-right border bg-light ">{message.reply}</div>
                   <div className="col-sm-1 "><i className='far fa-comment text-info'></i></div>
</div>
}

                              
                            
                            </div>                
                            
                            )



                      
                        }  
                })()  
            }  
           
             
             </div>
           )
                   )}
               

               
               
           
             <div className="input-group pt-2 ">
            <input
              type="text"
              name={"txt"+cat.id}
              className="form-control "
              placeholder="Message"
             
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.addMessage}
              >
                Send
              </button>
            </div> 
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
