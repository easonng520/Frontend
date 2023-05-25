import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Contact from "./components/contact.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AddCat from "./components/add-cat.component";
import Cat from "./components/cat.component";

import CatsListCentre from "./components/cats-list-centre.component";
import CatsListFavourites from "./components/cats-list-favourites.component";
import CatsListStaff from "./components/cats-list-staff.component";
import CatsListUser from "./components/cats-list-user.component";
import CatsListPublic from "./components/cats-list-public.component";
import EventBus from "./common/EventBus";

import FileUpload from "./components/FileUpload";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
   return (
      <div>
      <nav className="navbar navbar-expand fixed-top border-bottom navbar-light bg-light p-2">
      {currentUser ? (
      <Link to={"/CatsListUser"} className="navbar-brand">loveCATS</Link>
       ) : (
       <Link to={"/"} className="navbar-brand">loveCATS</Link>
        )}

        <div className="navbar-nav mr-auto">
        {currentUser ? (
        
      <li className="nav-item">
                <Link to={"/CatsListUser"} className="nav-link">
                  Home
                </Link>
              </li>
        
          ) : (

     <li className="nav-item">
                <Link to={"/"} className="nav-link">
             Home
                </Link>
              </li>
          )}
            {/*
            <li className="nav-item">
              <Link to={"/FileUpload"} className="nav-link">
                Upload
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          */}
            
          
            

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
        
              <li className="nav-item">
                <Link to={"/CatsListfavourites"} className="nav-link">
                  My Favourite
                </Link>
              </li>
            )}


            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/CatsListCentre"} className="nav-link">
                   List of {currentUser.centre}
                </Link>
              </li>
            )
            
            }
            {showModeratorBoard && (
              <li className="nav-item">
               <Link to={"/add"} className="nav-link">
                Add Cat
              </Link>
              </li>
           )   
            }
            
          </div>

          {currentUser ? (
        
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                 <span  className="nav-link">
                  {currentUser.username}
                </span>
                {/*
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
                */}
              </li>
            

   <li className="nav-item">
                <a href="/contact" className="nav-link">
                  Contact Us
                </a>
              </li>

  <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
              
            </div>
          ) : (

        
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container pt-3 mt-5 pb-3 mb-5 " >
          <Routes>
            <Route path="/" element={<CatsListPublic />} />
             <Route path="/home" element={<CatsListPublic />} />
            <Route path="/FileUpload" element={<FileUpload />} />
              <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/CatsListFavourites" element={<CatsListFavourites />} />
            <Route path="/CatsListUser" element={<CatsListUser/>} />
             <Route path="/CatsListCentre" element={<CatsListCentre/>} />
            <Route path="/cats" element={<CatsListStaff/>} />
            <Route path="/add" element={<AddCat/>} />
            <Route path="/cats/:id" element={<Cat/>} />
            
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;