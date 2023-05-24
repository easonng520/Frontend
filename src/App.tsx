import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AddCat from "./components/add-cat.component";
import Cat from "./components/cat.component";
import CatsList from "./components/cats-list.component";
import CatsListPublic from "./components/cats-list-public.component";
import EventBus from "./common/EventBus";

import Upload from "./components/upload.component";

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
          <Link to={"/Home"} className="navbar-brand">
            loveCATS
          </Link>
          <div className="navbar-nav mr-auto">
           
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
 
            <li className="nav-item">
              <Link to={"/upload"} className="nav-link">
                Upload
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/cats"} className="nav-link">
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
            

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/Favourite"} className="nav-link">
                  My Favourite
                </Link>
              </li>
            )}
            
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>

   <li className="nav-item">
                <a href="/contactUs" className="nav-link" onClick={this.logOut}>
                  Contact Us
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
             <Route path="/uplaod" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
           <Route path="/favourite" element={<CatsListPublic />} />

            <Route path="/" element={<CatsList/>} />
            <Route path="/cats" element={<CatsList/>} />
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