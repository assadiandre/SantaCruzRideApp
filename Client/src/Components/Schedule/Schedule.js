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
  InputGroup,
  FormControl,
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

  const [direction, setDirection] = useState('To UCSC');

  const [onCampusLocation, setOnCampusLocation] = useState('');
  const [offCampusLocation, setOffCampusLocation] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [days, setDays] = useState([]);

  const [err, setErr] = useState([]);
  const [inputList, setInputList] = useState([]);

  const schedule = (e) => {
    e.preventDefault();
    setErr([]);
    const errors = validate();
    if (errors.length > 0) {
      setErr(errors);
    } else {
      axios
        .put(
          'http://localhost:3001/schedule',
          {
            setupFlag: true,
            arrivalTime: arrivalTime,
            direction: direction,
            onCampusLocation: onCampusLocation,
            offCampusLocation: offCampusLocation,
            days: days,
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
    }
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleAddClick = (e) => {
    setInputList([
      ...inputList,
      {
        destination: 'To UCSC',
        offCampusLocation: '',
        onCampusLocation: '',
        arrivalTime: '',
        days: [],
      },
    ]);
  };
  const handleAddDay = () => {
    const items = days;
    setDays([...items, `item-${items.length}`]);
  };
  const handleRemoveDay = () => {
    const items = days;
    if (items.length > 0) {
      const lastIndex = items.length - 1;
      setDays(items.filter((item, index) => index !== lastIndex));
    }
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

        {inputList.map((x, i) => {
          return (
            <div className={styles.loginForm}>
              <ol>
                <br></br>
                <DropdownButton
                  size="med"
                  id="dropdownr-basic-button"
                  title={direction}
                >
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="To UCSC"
                    onClick={(e) => setDirection(e.target.value)}
                  >
                    To UCSC
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    type="button"
                    value="From UCSC"
                    onClick={(e) => setDirection(e.target.value)}
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
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                  </InputGroup>
                </li>
                <li>
                  <div class="btn-group">
                    <input
                      type="checkbox"
                      class="btn-check"
                      name="options"
                      id="Mon"
                      autoComplete="off"
                    ></input>
                    <label
                      class="btn btn-outline-dark"
                      for="check1"
                      onChange={(e) => setDays(e.target.value)}
                    >
                      Mon
                    </label>

                    <input
                      type="checkbox"
                      class="btn-check"
                      name="options"
                      id="Tues"
                      autoComplete="off"
                    ></input>
                    <label
                      class="btn btn-outline-dark"
                      for="check2"
                      onChange={(e) => setDays(e.target.value)}
                    >
                      Tues
                    </label>

                    <input
                      type="checkbox"
                      class="btn-check"
                      name="options"
                      id="Wed"
                      autoComplete="off"
                    ></input>
                    <label
                      class="btn btn-outline-dark"
                      for="check3"
                      onChange={(e) => setDays(e.target.value)}
                    >
                      Wed
                    </label>

                    <input
                      type="checkbox"
                      class="btn-check"
                      name="options"
                      id="Thurs"
                      autoComplete="off"
                    ></input>
                    <label
                      class="btn btn-outline-dark"
                      for="check4"
                      onChange={(e) => setDays(e.target.value)}
                    >
                      Thurs
                    </label>

                    <input
                      type="checkbox"
                      class="btn-check"
                      name="options"
                      id="Fri"
                      autoComplete="off"
                    ></input>
                    <label
                      class="btn btn-outline-dark"
                      for="check5"
                      onChange={(e) => setDays(e.target.value)}
                    >
                      Fri
                    </label>
                  </div>
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
