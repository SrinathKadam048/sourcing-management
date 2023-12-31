import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 p-4 border border-2 rounded">
        <form>
          <div className='mb-3'>
            <label className='form-label'>Email Addresses</label>
            <input type='email' className='form-control' id='emailID' aria-describedby="emailHelp"></input>
            <div id="emailHelp" className="form-text">For Demo Purpose only. Hit Submit</div>
          </div>
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
          </div>
          <div className="col-auto">
            <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"></input>
          </div>
          <div className="col-auto mb-3">
            <span id="passwordHelpInline" className="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
          {/* <button type="submit" className="btn btn-primary">Submit</button> */}
          <Link to="/Dashboard" className="btn btn-primary" type="submit">Submit</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;