import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../../Context';
import { validate } from './RouteValidator';
import { Button } from 'react-bootstrap';
import ScheduleRoute from './ScheduleRoute';
import styles from './Schedule.module.css';

export default function Schedule() {
  const [userObject, setUserObject] = useContext(myContext);
  const navigate = useNavigate();
  const [err, setErr] = useState([]);
  const [routes, setRoutes] = useState([
    {
      toCampus: false,
      days: Array(7).fill(false), // marked indices of days chosen
      time: '',
      offCampusLocation: '',
      onCampusLocation: '',
    },
  ]);

  // Get called on submit
  const schedule = (e) => {
    console.log('CALLED THIS METHOD');
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
  };

  return (
    <div className={`${styles.scheduleContent} bg-danger`}>
      <h1>YOUR SCHEDULE</h1>
      <form onSubmit={schedule}>
        <ul className="errorList">
          {err.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>

        <Button
          className={`${styles.buttons} mb-3`}
          type="button"
          variant="light"
          size="med"
          onClick={handleAddClick}
          active
        >
          + ADD ROUTE
        </Button>

        <div className="mb-3">
          {routes.map((routeData, routeNum) => (
            <ScheduleRoute
              routeData={routeData}
              routeNum={routeNum}
              handleToCampus={handleToCampus}
              handleOnCampusLocation={handleOnCampusLocation}
              handleOffCampusLocation={handleOffCampusLocation}
              handleTime={handleTime}
              handleAddDay={handleAddDay}
            />
          ))}
        </div>

        <Button
          className={`${styles.buttons} mb-3`}
          variant="light"
          size="lg"
          type="submit"
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
