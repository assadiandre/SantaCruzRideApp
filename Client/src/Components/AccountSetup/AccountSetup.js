import React, { useContext } from 'react';
import { useState } from 'react';
import { myContext } from '../../Context';
import styles from './AccountSetup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';

export default function AccountSetup(){
    
    const userObject = useContext(myContext);
    console.log(userObject);

    const [userType, setUserType] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')

    const accountSetup =  (e) => {
        axios
        .put(
            'http://localhost:3001/account/setup',
            {
                setupFlag: true,
                userType: userType,
                phoneNumber: phone,
                bio: bio,
            },
            {
            withCredentials: true,
            }
        )
        .then((res) => {
            if (res.data) {
            //    console.log(userType);
            //   setUserObject(res.data); 
            }
        });
    };
    return (
        <div className={styles.loginPage}>
            <h1>Account Setup</h1>
            <form onSubmit={accountSetup}>
                <div  class="form-check-inline">
                    <input required class="form-check-input1" type="radio" name="type" id="rider" 
                    value = "Rider" 
                    checked={userType === 'Rider'} onChange={(e) => setUserType(e.target.value)}
                    ></input>
                    <label class="form-check-label" for="rider">
                        Rider
                    </label>

                    <input required class="form-check-input2" type="radio" name="type" id="driver" 
                     value = "Driver" 
                     checked={userType === 'Driver'} onChange={(e) => setUserType(e.target.value)}
                     ></input>
                    <label class="form-check-label" for="driver">
                        Driver
                    </label>
                </div>
                    
                <PhoneInput required defaultCountry="US" 
                value={phone} onChange={setPhone}  />

            <br></br>

                <p>Tell us more about you so that people know who you are!</p>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Bio</span>
                    </div>
                    <textarea class="form-control" aria-label="With textarea" 
                     value = {bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
      </div>
    );
  }
  