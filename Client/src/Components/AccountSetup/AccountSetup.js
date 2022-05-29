import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import styles from './AccountSetup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { Card, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import GPlace from '../Schedule/GPlace';

function validate(userType, phone, bio) {
  const errors = [];
  if (userType.length === 0) {
    errors.push('Must pick rider or driver');
  }
  return errors;
}
export default function AccountSetup() {
  const [userObject, setUserObject] = useUser();

  const [userType, setUserType] = useState('Rider');
  const [hiddenFlag, setHiddenFlag] = useState('No');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [err, setErr] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const [loadMap, setLoadMap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
    // if user has already setup, load their default values.
    const loadDefaults = userObject && userObject.setupFlag;
    if (loadDefaults) {
      setUserType(userObject.userType);
      setHiddenFlag(userObject.hiddenFlag ? 'Yes' : 'No');
      setPhone(userObject.phoneNumber);
      setBio(userObject.bio);
      setAddress(userObject.address.address);
    }
  }, [userObject]);

  const loadGoogleMapScript = (callback) => {
    if (
      typeof window.google === 'object' &&
      typeof window.google.maps === 'object'
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener('load', callback);
    }
  };

  const accountSetup = (e) => {
    e.preventDefault();
    setErr([]);

    const errors = validate(userType, phone, bio);
    if (errors.length > 0) {
      setIsShown((current) => true);
      setErr(errors);
    } else {
      axios
        .put(
          '/account/setup',
          {
            setupFlag: true,
            userType: userType,
            hiddenFlag: hiddenFlag === 'Yes' ? true : false,
            phoneNumber: phone,
            bio: bio,
            address: address,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            //    console.log(userType);
            if (!res.data.setupFlag) {
              setUserObject(res.data);
              navigate('/schedule');
            } else {
              navigate('/feed');
            }
          }
        });
    }
  };
  return (
    // #DC3545 is the hex code for bootstrap danger
    <div className={`${styles.loginPage} ${styles.background_height}`}>
      <h1>ACCOUNT INFO</h1>
      <div>
        <form onSubmit={accountSetup}>
          <div className={`${styles.loginForm}`}>
            <Card style={{ display: isShown ? 'block' : 'none' }}>
              <Card.Header as="h5" className={styles.errorHeader}>
                {err.length} Error{err.length > 1 ? 's' : ''}!
              </Card.Header>
              <Card.Body>
                <ul>
                  {err.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <ol>
              <li className="me-4 mb-2 mt-3">
                Phone number
                <PhoneInput
                  required
                  defaultCountry="US"
                  value={phone}
                  onChange={setPhone}
                />
                <p className="text-muted my-0">
                  Students will be able to view this to contact you.
                </p>
              </li>

              <li className="me-4 mb-2">
                <p> </p>
                Do you want to Drive or Ride?
                <DropdownButton
                  id="dropdownr-basic-button"
                  title={userType}
                  variant="danger"
                >
                  <Dropdown.Item
                    required
                    as="button"
                    type="button"
                    value="Rider"
                    onClick={(e) => setUserType(e.target.value)}
                  >
                    Rider
                  </Dropdown.Item>
                  <Dropdown.Item
                    required
                    as="button"
                    type="button"
                    value="Driver"
                    onClick={(e) => setUserType(e.target.value)}
                  >
                    Driver
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="me-4 mb-2">
                Hide my routes? (If you're not looking for matches at the
                moment)
                <DropdownButton
                  id="dropdownr-basic-button"
                  title={hiddenFlag}
                  variant="danger"
                >
                  <Dropdown.Item
                    required
                    as="button"
                    type="button"
                    value="Yes"
                    onClick={(e) => setHiddenFlag(e.target.value)}
                  >
                    Yes
                  </Dropdown.Item>
                  <Dropdown.Item
                    required
                    as="button"
                    type="button"
                    value="No"
                    onClick={(e) => setHiddenFlag(e.target.value)}
                  >
                    No
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              <li className="me-4 mb-2">
                About You
                <div className="input-group">
                  <div className="input-group-prepend"></div>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </li>

              <li className="me-4 mb-2">
                Home Address
                <div>
                  {loadMap ? (
                    <GPlace
                      onChange={(v) => setAddress(v)}
                      defaultValue={address}
                    />
                  ) : (
                    <>...</>
                  )}
                </div>
                <p className="text-muted my-0">
                  Students will never be able to see your home address.
                </p>
              </li>
            </ol>
          </div>
          <Button
            className={`${styles.buttons} mt-3 ms-2`}
            type="submit"
            variant="light"
            size="lg"
            active
          >
            {window.location.pathname.match('/profile') ? 'SAVE' : 'CONTINUE'}
          </Button>
        </form>
      </div>
      <br></br>
    </div>
  );
}
