import React from "react";
// getting api from utils
import API from "../utils/API";

// class component 
class Users extends React.Component {
  //initiazing the state
  state = {
    users: [],
    searching: "",
    column: "",
    sort: "",
   
  };


// get array of user objects
// set return objects to state
  componentDidMount() {
    API.users()
      .then(res => {
        const usersArray = res.data.results.map(user => {
          return {
            profile: user.picture.medium,
            first: user.name.first,
            last: user.name.last,
            email: user.email,
            cell:user.cell,
            dob: user.dob.date,
            city: user.location.city,
           
          };
        });
        this.setState({ users: usersArray });
        console.log({ users: usersArray })
      })
      .catch(error => console.log(error));
  }
  //function to update searching state each time the user types a character
  handlesearching = e => {
    this.setState({ searching: e.target.value });
  };



//   this funtion will filler list to based on first name, last name or city
  searchingingUsers() {
    const searching = this.state.searching.toLowerCase();
    return this.state.users.filter(user => {
      return (
        user.first.toLowerCase().includes(searching) ||
        user.last.toLowerCase().includes(searching) || 
        user.city.toLowerCase().includes(searching)
      );
    });
  }

  //function to render a table of users
  renderingUsers = () => {
    return this.searchingingUsers()
      .sort(this.sortusers)
      .map((user, index) => {
        return (
          <tr key={index}>
            <td>
              <img src={user.profile} alt="pic not avaible"></img>
            </td>
            <td>{user.first}</td>
            <td>{user.last}</td>
            <td>{new Date(user.dob).toDateString()}</td>
            <td>{user.email}</td>
            <td>{user.cell}</td>
            <td>{user.city}</td>
          </tr>
        );
      });
  };

  //icon will show the sort direction
  headers = column => {
    return this.state.column === column
      ? `clickHeader ${this.state.sort}`
      : `clickHeader`;
  };

  // when a columnoum is click, this will set to the opposite direction 
  changesort = column => {
    this.state.column === column && this.state.sort === "AtoZ"
      ? this.setState({ sort: "ZtoA", column: column })
      : this.setState({ sort: "AtoZ", column: column });
  };

  //setting value for sorting direction
  sortusers = (up, down) => {
    if (up[this.state.column] < down[this.state.column]) {
      return this.state.sort === "AtoZ" ? -1 : 1;
    } else if (up[this.state.column] > down[this.state.column]) {
      return this.state.sort === "AtoZ" ? 1 : -1;
    }
    return 0;
  };

  //render searching box and the user container
  render() {
    return (
      <>
        <div className="input-group justify-content-end " >
          <div className="input-group-prepend"></div>
          <input
            onChange={this.handlesearching}
            type="searching"
            className="form-control m-4"
            placeholder="search users"
            aria-describedby="basic-addon2"
            aria-label="searchingBox"

            style={{
                width:"12px",
                display:"flex",
                color:"blue"
                // position:"absolute",
                // right:"20%"
                
            }}
     
          />
        </div>
        <div className="table m-4 " >
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="column">Profile picture</th>
                <th scope="column">
                  <span
                    className={this.headers("first")}
                    onClick={() => {
                      this.changesort("first");
                    }}
                  >
                    First Name
                  </span>
                </th>
                <th scope="column">
                  <span
                    className={this.headers("last")}
                    onClick={() => this.changesort("last")}
                  >
                    Last Name
                  </span>
                </th>
                <th scope="column">
                  <span
                    className={this.headers("dob")}
                    onClick={() => this.changesort("dob")}
                  >
                    DOB
                  </span>
                </th>
                <th scope="column">
                  <span
                    className={this.headers("email")}
                    onClick={() => this.changesort("email")}
                  >
                    Email
                  </span>
                </th>
                <th scope="column">
                  <span
                    className={this.headers("cell")}
                    onClick={() => this.changesort("cell")}
                  >
                Phone number
                  </span>
                </th>
                <th scope="column">
                  <span
                    className={this.headers("cell")}
                    onClick={() => this.changesort("cell")}
                  >
               City Name
                  </span>
                </th>
             
              </tr>
            </thead>
            <tbody style={{
                marginLeft:"2rem"
            }}>{this.renderingUsers()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Users;
