import React, { Component } from "react";
import CatDataService from "../services/cat.service";
import { withRouter } from '../common/with-router';

class Cat extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCat = this.getCat.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCat = this.updateCat.bind(this);
    this.deleteCat = this.deleteCat.bind(this);

    this.state = {
      currentCat: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCat(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCat: {
          ...prevState.currentCat,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCat: {
        ...prevState.currentCat,
        description: description
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
      title: this.state.currentCat.title,
      description: this.state.currentCat.description,
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
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCat.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCat.description}
                  onChange={this.onChangeDescription}
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