import React, { useContext } from 'react';
import { useState } from 'react';
import { myContext } from '../../Context';
import styles from './Schedule.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  ToggleButton,
} from 'react-bootstrap';
function validate(userType, phone, bio) {
  const errors = [];
  if (userType.length === 0) {
    errors.push('Must pick rider or driver');
  }
  return errors;
}

export default function Schedule() {
  const userObject = useContext(myContext);
  console.log(userObject);

  const [toCampus, setToCampus] = useState(true);

  const [onCampusLocation, setOnCampusLocation] = useState('');
  const [offCampusLocation, setOffCampusLocation] = useState('');
  const [time, setTime] = useState('');
  const myDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
  const [days, setDays] = useState([false, false, false, false, false]); //indices of true days

  const [err, setErr] = useState([]);
  const [routes, setRoutes] = useState([
    {
      toCampus: false,
      days: [''],
      onCampusLocation: '',
      offCampusLocation: '',
      time: '',
    },
  ]);

  const schedule = (e) => {
    e.preventDefault();
    setErr([]);
    updateItem(e);
    const errors = validate();
    if (errors.length > 0) {
      setErr(errors);
    } else {
      axios
        .put(
          'http://localhost:3001/schedule',
          {
            setupFlag: true,
            time: time,
            toCampus: toCampus,
            onCampusLocation: onCampusLocation,
            offCampusLocation: offCampusLocation,
            days: myDays
              .from({ length: 5 }, (_, i) => (days[i] === true ? i : _))
              .filter((x) => x),
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            myDays
              .from({ length: 5 }, (_, i) => (days[i] === true ? i : _))
              .filter((x) => x)
              .forEach((x) => console.log(x));
            //    console.log(userType);
            //   setUserObject(res.data);
          }
        });
    }
  };
  // update specific routes
  const updateItem = (e, index) => {
    const list = routes;
    list[index] = {
      setupFlag: true,
      time: time,
      toCampus: toCampus,
      onCampusLocation: onCampusLocation,
      offCampusLocation: offCampusLocation,
      days: myDays
        .from({ length: 5 }, (_, i) => (days[i] === true ? i : _))
        .filter((x) => x),
    };
    setRoutes(list);
    handleAddDay(e);
  };
  // add route button
  const handleAddClick = (e) => {
    setRoutes([
      ...routes,
      {
        destination: 'To UCSC',
        offCampusLocation: '',
        onCampusLocation: '',
        time: '',
        days: [[false, false, false, false, false]],
      },
    ]);
  };
  const handleAddDay = (e) => {
    // set current day to days
    let idx = e.target.value;
    if (days[idx] === false) {
      days[idx] = true;
    } else {
      days[idx] = false;
    }
    console.log(idx, days[idx]);
    setDays([...days.slice(0, idx), days[idx], ...days.slice(idx + 1)]);
  };

  return (
    <div className={styles.loginPage}>
      <h1>YOUR SCHEDULE</h1>
      <form onSubmit={schedule}>
        <ul className="errorList">
          {err.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>

        {
          <Button
            type="button"
            variant="light"
            size="med"
            className={styles.buttons}
            onClick={handleAddClick}
            active
          >
            + ADD ROUTE
          </Button>
        }
        <br></br>
        <br></br>

        {routes.map((x, i) => {
          return (
            <div className={styles.loginForm}>
              <ol>
                <h2>Route #{i + 1}</h2>
                <br></br>
                <DropdownButton
                  size="med"
                  id="dropdownr-basic-button"
                  title={toCampus === true ? 'To UCSC' : 'From UCSC'}
                >
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="To UCSC"
                    onClick={(e) => setToCampus(true)}
                  >
                    To UCSC
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="From UCSC"
                    onClick={(e) => setToCampus(false)}
                  >
                    From UCSC
                  </Dropdown.Item>
                </DropdownButton>
                <br></br>

                <li>
                  Campus Location
                  <InputGroup className={styles.inputs}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={onCampusLocation}
                      onChange={(e) => setOnCampusLocation(e.target.value)}
                    />
                  </InputGroup>
                </li>

                <li>
                  Off Campus Location
                  <InputGroup className={styles.inputs}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={offCampusLocation}
                      onChange={(e) => setOffCampusLocation(e.target.value)}
                    />
                  </InputGroup>
                </li>

                <li>
                  Arrival Time
                  <InputGroup className={styles.inputs}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </InputGroup>
                </li>
                <li>
                  <ButtonGroup className="mb-2">
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-primary"
                      checked={days[0]}
                      value="0"
                      onChange={handleAddDay}
                    >
                      Mon
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check1"
                      type="checkbox"
                      variant="outline-primary"
                      checked={days[1]}
                      value="1"
                      onChange={handleAddDay}
                    >
                      Tues
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check2"
                      type="checkbox"
                      variant="outline-primary"
                      checked={days[2]}
                      value="2"
                      onChange={handleAddDay}
                    >
                      Wed
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check3"
                      type="checkbox"
                      variant="outline-primary"
                      checked={days[3]}
                      value="3"
                      onChange={handleAddDay}
                    >
                      Thurs
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check4"
                      type="checkbox"
                      variant="outline-primary"
                      checked={days[4]}
                      value="4"
                      onChange={handleAddDay}
                    >
                      Fri
                    </ToggleButton>
                  </ButtonGroup>
                </li>
              </ol>
            </div>
          );
        })}
        <br></br>
        <Button
          className={styles.buttons}
          type="submit"
          variant="light"
          size="lg"
          active
        >
          SUBMIT
        </Button>
      </form>

      <br></br>
    </div>
  );
}
