import { Component } from "react";
import CatDataService from "../services/cat.service";
import { Link } from "react-router-dom";
import ICatData from '../types/cat.type';
//import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
type Props = {};
type State = {
 
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  currentUserCentre:string
};

export default class CatsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
          redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      currentUserCentre:"centre"
    };
  }
  componentDidMount() {
     const currentUser = AuthService.getCurrentUser();
     if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
 }

 
  render() {
    const { currentUser} = this.state;
    return (

           <div className="col-md-12">Contact Us
             <div className="card-columns text-secondary">
     

            
        </div>
        </div>

    );
  }
}
