import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../Context';
import styles from './AccountSetup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import { DropdownButton, Dropdown, Button, InputGroup, FormControl, Container} from 'react-bootstrap';

function validate (userType, phone, bio){
    const errors = [];
    if (userType.length === 0){
        errors.push("Must pick rider or driver");
    }
    return errors;
}
export default function AccountSetup(){
    const userObject = useContext(myContext);
    console.log(userObject);
    
    const [userType, setUserType] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [address, setAddress] = useState('')
    const [err, setErr] = useState([])

    const navigate = useNavigate();

    const accountSetup =  (e) => {
        e.preventDefault();
        setErr([])
        const errors = validate(userType, phone, bio);
        if (errors.length>0) {
            setErr(errors)
        }
        else{
            axios
            .put(
                'http://localhost:3001/account/setup',
                {
                    setupFlag: true,
                    userType: userType,
                    phoneNumber: phone,
                    bio: bio,
                    address: address
                },
                {
                withCredentials: true,
                }
            )
            .then((res) => {
                if (res.data) {
                //    console.log(userType);
                //   setUserObject(res.data); 
                //    navigate('/schedule');
                }
            });
        }
    };
    return (
        <div className={styles.loginPage}>
            <h1>ACCOUNT SETUP</h1>
            <div>
	</div>
            <div>
                <form onSubmit={accountSetup}>
                    <div class={styles.loginForm}>
                        <ul className={styles.errorList}>
                        {err.map(
                                (error => 
                                    <li key={error}>
                                        {error}
                                    </li>
                                )
                            )}
                        </ul>
                        <ol>
                            <li>Phone number
                                <PhoneInput required defaultCountry="US" 
                                value={phone} onChange={setPhone}  />
                                <p class="text-muted">Students will be able to view this to contact you.</p>
                            </li>
                            <br></br>

                            <li>Do you want to Drive or Ride?
                                <DropdownButton id="dropdownr-basic-button" title={userType}>
                                    <Dropdown.Item required as="button"  type="button" value = "Rider" onClick={(e) => setUserType(e.target.value)}>Rider</Dropdown.Item>
                                    <Dropdown.Item required as="button"  type="button" value = "Driver" onClick={(e) => setUserType(e.target.value)}>Driver</Dropdown.Item>
                                </DropdownButton>
                            </li>
                            <br></br>

                            <li>About You
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                        </div>
                                        <textarea class="form-control" aria-label="With textarea" 
                                        value = {bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                                    </div>
                            </li>
                            <li>Home Address
                            <InputGroup className="mb-3">
                                <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default" 
                                value = {address} onChange={(e) => setAddress(e.target.value)} 
                                />
                            </InputGroup>
                            </li>
                            <br></br>
                        </ol>
                    </div>
                    <br></br>
                    <Button className={styles.buttons} type="submit" variant="light" size="lg" active>CONTINUE
                    </Button>
                </form>
                
            </div>
            <br></br>
            
      </div>
    );
  }
  