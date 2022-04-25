import React, { useContext } from 'react';
import { useState } from 'react';
import { myContext } from '../../Context';
import styles from './AccountSetup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function AccountSetup() {
  const userObject = useContext(myContext);
  console.log(userObject);
  const [value, setValue] = useState();
  return (
    <div className={styles.loginPage}>
      <form>
        <h1>Account Setup</h1>

        <div class="form-check-inline">
          <input
            required
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="option1"
          ></input>
          <label class="form-check-label" for="exampleRadios1">
            Rider
          </label>
        </div>

        <div class="form-check-inline">
          <input
            required
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
          ></input>
          <label class="form-check-label" for="exampleRadios2">
            Driver
          </label>
        </div>

        <PhoneInput
          required
          defaultCountry="US"
          value={value}
          onChange={setValue}
        />
        <br></br>
        <p>Tell us more about you so that people know who you are!</p>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Bio</span>
          </div>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
