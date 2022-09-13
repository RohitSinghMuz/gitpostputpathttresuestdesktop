import React, { Component } from "react";
import "./Apiget.css";
import { Modal } from "react-bootstrap";

class Apiget extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      status: "notdelete",
      postid: [],
      name: "",
      job: "",
      newuser: false,
      Sub: "",
      city: "",
      stateuser: "",
    };
  }

  //    display all users
  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  handleclose = () => {
    this.setState({
      show: false,
    });
  };


  handlpostclose = () => {
    this.setState({
      newuser: false,
    });
  };

  //    show new user
  newusermodal = (e) => {
    this.setState({
      newuser: true,
    });
  };

  //    start get method

  async componentDidMount() {
    const response = await fetch(
      "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
    );
    const mydata = await response.json();
    this.setState({ data: mydata.data });
    console.log(this.state.data);
  }

  //   END GET METHOD

  //  star delete method
  deletemethod = (_id) => {
    fetch(`https://api.instantwebtools.net/v1/passenger/${_id}`, {
      method: "DELETE",
    }).then(() => this.setState({ status: "Delete successful" }));
    this.deleteTask(_id);
  };

  deleteTask = (_id) => {
    console.log("delete", _id);
    const newTodos = [...this.state.data];
    const deleteindex = newTodos.findIndex((each) => {
      return each._id === _id;
    });

    newTodos.splice(deleteindex, 1);
    this.setState({
      data: newTodos,
    });
  };

  //   delete method end

  //  POST METHOD START
  postname = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  developerjob = (e) => {
    this.setState({
      job: e.target.value,
    });
  };
  mypostdata = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: this.state.name, job: this.state.job }),
    };
    fetch("https://reqres.in/api/users", requestOptions)
      .then((response) => response.json())

      .then(
        (response) => this.setState({ postid: response.data }),
        console.log("hello post", this.state.postid)
      );
      this.handlpostclose()
  };

  // post method end

  // PUT METHOD START

  putmethod = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Sub: "Reactjs" }),
    };
    fetch("https://reqres.in/api/users/2", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  //  start patch method

  patchmethod = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PATCH",
      body: JSON.stringify({
        city: this.state.city,
        mystate: this.state.mystate,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  render() {
    console.log(this.state.status);
    console.log(this.deletemethod);
    console.log({ mypostdata: this.mypostdata });
    console.log({ putmethod: this.putmethod });

    return (
      <>
        <div className="parentdiv">
          {/* post method */}
          <Modal show={this.state.newuser} onHide={this.state.close}>
            <Modal.Body>
              <button
                onClick={() => this.handlpostclose()}
                style={{ float: "right", margin: "0.4em" }}
              >
                close
              </button>
              <div>
                <div style={{ margin: "1em", outline: "none" }}>
                  <input
                    type="text"
                    placeholder="name"
                    value={this.state.name}
                    onChange={(e) => this.postname(e)}
                  ></input>
                </div>
                <div style={{ margin: "1em", outline: "none" }}>
                  <input
                    type="text"
                    placeholder="Job"
                    // value=""
                    onChange={(e) => this.developerjob(e)}
                  ></input>
                </div>

                <button
                  onClick={this.mypostdata}

                  style={{ outline: "none", marginLeft: "1em" }}
                >
                  Submittpost
                </button>
              </div>
            </Modal.Body>
          </Modal>

          <div className="parentdivofbutton">
            <div>
              <button
                className="creatdadata"
                onClick={(e) => {
                  this.showModal(e);
                  //   this.postmydata();
                }}
              >
                Get All Users
              </button>
            </div>

            <div>
              <button
                className="creatdadata"
                onClick={(e) => {
                  this.newusermodal();
                }}
              >
                Create New User
              </button>
            </div>
          </div>
          <div>
            <div>
              <Modal show={this.state.show} onHide={this.state.close}>
                <Modal.Body>
                  <button
                    onClick={() => this.handleclose()}
                    style={{ float: "right", margin: "0.4em" }}
                  >
                    close
                  </button>
                  {this.state.data.map((elem, index) => {
                    console.log(elem._id);

                    return (
                      <div key={index}>
                        <div className="elemdata">
                          <div>
                            <button
                              className="btnaddedit far fa-edit add-btn"
                              onClick={() => {
                                this.putmethod();
                                this.patchmethod();
                              }}
                            ></button>
                          </div>
                          <div className="eledatalist">{elem._id}</div>
                          <div>
                            <button
                              onClick={() => {
                                this.deletemethod(elem._id);
                              }}
                              className="btnaddedit far fa-trash-alt add-btn"
                            ></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Apiget;
