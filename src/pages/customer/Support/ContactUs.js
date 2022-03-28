import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const ContactUs = () => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            city: city,
            state: state,
            zip: zip
          }),
        });
        let resJson = await res.json();
        // if (res.status === 200) {
        //   setName("");
        //   setEmail("");
        //   setMessage("User created successfully");
        // } else {
        //   setMessage("Some error occured");
        // }
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="container">
      <form method="post" action="localhost:8080/" onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 mt-3">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              name="email"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <label for="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Rikin"
            name="firstname"
          />
        </div>
        <div className="form-group mt-3">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Patel"
            name="lastname"
          />
        </div>
        <div className="form-row mt-3">
          <div className="form-group col-md-6 mt-3">
            <label for="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" name="city"/>
          </div>
          <div className="form-group col-md-4 mt-3">
            <label for="inputState">State</label>
            <select id="inputState" className="form-control" name="state">
              <option selected>Select below</option>
              <option>NS</option>
              <option>PEI</option>
              <option>NB</option>
            </select>
          </div>
          <div className="form-group col-md-2 mt-3">
            <label for="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" name="zip"/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Send Request
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
