//import React, { useContext } from 'react';
import { useState } from 'react';
//import { myContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
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
import TimePicker from 'react-bootstrap-time-picker';
import { DateTime } from 'react-datetime-bootstrap';
import { useContext } from 'react';
import { myContext } from '../../Context';

function validate(routes) {
  const errors = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].onCampusLocation.length === 0) {
      errors.push('Must pick Campus Location for route #' + (i + 1));
    }
    if (routes[i].offCampusLocation.length === 0) {
      errors.push('Must pick Off Campus Location for route #' + (i + 1));
    }
    if (routes[i].time.length === 0) {
      errors.push('Must pick Arrival Time for route #' + (i + 1));
    }
    if (routes[i].days.length === 0) {
      errors.push('Must pick Days for route #' + (i + 1));
    }
  }

  return errors;
}

export default function Schedule() {
  const [userObject, setUserObject] = useContext(myContext);
  console.log(userObject);

  const myDays = [0, 1, 2, 3, 4, 5, 6];
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]); //indices of marked days

  const navigate = useNavigate();
  const [err, setErr] = useState([]);
  const [routes, setRoutes] = useState([
    {
      toCampus: false,
      days: [false, false, false, false, false, false, false], // marked indices of days chosen
      time: '',
      offCampusLocation: '',
      onCampusLocation: '',
    },
  ]);

  const schedule = (e) => {
    e.preventDefault();
    setErr([]);

    // update every route number
    for (let i = 0; i < routes.length; i++) {
      updateDays(e, i);
    }
    const errors = validate(routes);
    if (errors.length > 0) {
      setErr(errors);
    } else {
      axios
        .put(
          '/account/addroute',
          {
            setupFlag: true,
            routes: [
              {
                toCampus: false,
                days: [1], // marked indices of days chosen
                time: new Date(), // change to int
                offCampusLocation: '1234',
                onCampusLocation: '1234',
              },
            ],
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            console.log(routes);
            //    console.log(userType);
            //   setUserObject(res.data);
            navigate('/feed');
          }
        });
    }
  };
  // update specific routes' days from true/false to numbers
  const updateDays = (e, index) => {
    const list = [...routes];
    const newList = [];
    for (let i = 0; i < 7; i++) {
      if (list[index].days[i] === true) {
        newList.push(i);
      }
    }
    list[index].days = newList;
    setRoutes(list);
  };

  // add route button
  const handleAddClick = (e) => {
    setRoutes([
      ...routes,
      {
        toCampus: false,
        days: [false, false, false, false, false, false, false], // marked indices of days chosen
        time: '',
        offCampusLocation: '',
        onCampusLocation: '',
      },
    ]);
  };

  const handleOnCampusLocation = (e, index) => {
    const list = [...routes];
    list[index].onCampusLocation = e.target.value;
    setRoutes(list);
  };

  const handleOffCampusLocation = (e, index) => {
    const list = [...routes];
    list[index].offCampusLocation = e.target.value;
    setRoutes(list);
  };

  const handleTime = (index, time) => {
    const list = [...routes];
    list[index].time = time;
    console.log(time);
    setRoutes(list);
  };

  const handleToCampus = (e, index, value) => {
    const list = [...routes];
    list[index].toCampus = value;
    setRoutes(list);
  };

  const handleAddDay = (e, index, idx) => {
    const list = [...routes];
    list[index].days[idx] = !list[index].days[idx];
    setRoutes(list);
    //setDays([...days.slice(0, idx), days[idx], ...days.slice(idx + 1)]);
  };
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="bg-danger pb-5">
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

        {routes.map((x, routeNum) => {
          return (
            <div className={styles.loginForm} key={routeNum}>
              <ol>
                <h2>Route #{routeNum + 1}</h2>
                <br></br>
                <DropdownButton
                  size="med"
                  id="dropdownr-basic-button"
                  title={
                    routes[routeNum].toCampus === false
                      ? 'To UCSC'
                      : 'From UCSC'
                  }
                >
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="To UCSC"
                    onClick={(e) => handleToCampus(e, routeNum, true)}
                  >
                    To UCSC
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="From UCSC"
                    onClick={(e) => handleToCampus(e, routeNum, false)}
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
                      value={routes[routeNum].onCampusLocation}
                      onChange={(e) => handleOnCampusLocation(e, routeNum)}
                    />
                  </InputGroup>
                </li>

                <li>
                  Off Campus Location
                  <InputGroup className={styles.inputs}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={routes[routeNum].offCampusLocation}
                      onChange={(e) => handleOffCampusLocation(e, routeNum)}
                    />
                  </InputGroup>
                </li>

                <li>
                  Arrival Time
                  <TimePicker
                    start="1:00"
                    end="23:00"
                    step={15}
                    selected={startDate}
                    onChange={(time) => handleTime(routeNum, time)}
                    value={routes[routeNum].time}
                  />
                </li>
                <li key={routeNum}>
                  Days<br></br>
                  <ButtonGroup className="mb-2">
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}0`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[0]}
                      onChange={(e) => handleAddDay(e, routeNum, 0)}
                    >
                      Mon
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}1`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[1]}
                      value="1"
                      onChange={(e) => handleAddDay(e, routeNum, 1)}
                    >
                      Tues
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}2`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[2]}
                      value="2"
                      onChange={(e) => handleAddDay(e, routeNum, 2)}
                    >
                      Wed
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}3`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[3]}
                      value="3"
                      onChange={(e) => handleAddDay(e, routeNum, 3)}
                    >
                      Thurs
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}4`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[4]}
                      value="4"
                      onChange={(e) => handleAddDay(e, routeNum, 4)}
                    >
                      Fri
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}5`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[5]}
                      value="5"
                      onChange={(e) => handleAddDay(e, routeNum, 5)}
                    >
                      Sat
                    </ToggleButton>
                    <ToggleButton
                      className="mb-2"
                      id={`toggle-check-${routeNum}6`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={routes[routeNum].days[6]}
                      value="6"
                      onChange={(e) => handleAddDay(e, routeNum, 6)}
                    >
                      Sun
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
