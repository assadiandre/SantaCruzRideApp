import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../../Context';
import { validate } from './RouteValidator';
import { Button } from 'react-bootstrap';
import ScheduleRoute from './ScheduleRoute';
import styles from './Schedule.module.css';
import { useEffect } from 'react';

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

  // Will pull user data if it already exists and the user is already setup
  useEffect(() => {
    if (userObject && userObject.setupFlag) {
      console.log(userObject);
      const storedRoutes = userObject.routes.map((route) => {
        return {
          toCampus: route.toCampus,
          time: route.time,
          offCampusLocation: route.offCampusLocation,
          onCampusLocation: route.onCampusLocation,
          days: covertDaysToBooleans(route.days),
        };
      });
      setRoutes(storedRoutes);
    }
  }, [userObject]);

  // Given a list of days, it converts the days to booleans
  const covertDaysToBooleans = (days) => {
    const arr = Array(7).fill(false);
    for (const day of days) {
      arr[day] = true;
    }
    return arr;
  };

  // Given a list of routes, in converts the days property for each one
  const convertDaysForRoutesToNumbers = (routes) => {
    const list = [...routes];
    for (let i = 0; i < list.length; i++) {
      const days = list[i].days;
      const newDays = [];
      for (let j = 0; j < days.length; j++) {
        if (days[j]) {
          newDays.push(j);
        }
      }
      list[i].days = newDays;
    }
    return list;
  };

  // Get called on submit
  const schedule = (e) => {
    e.preventDefault();
    setErr([]);
    const errors = validate(routes);
    const updatedRoutes = convertDaysForRoutesToNumbers(routes);
    if (errors.length > 0) {
      setErr(errors);
    } else {
      axios
        .put(
          '/account/addroute',
          {
            setupFlag: true,
            routes: updatedRoutes,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) {
            console.log(routes);
            navigate('/feed');
          }
        });
    }
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

  const handleRemoveRoute = (index) => {
    const list = [...routes];
    list.splice(index, 1);
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
              key={`${routeNum},${routeData.time}`}
              routeData={routeData}
              routeNum={routeNum}
              handleToCampus={handleToCampus}
              handleOnCampusLocation={handleOnCampusLocation}
              handleOffCampusLocation={handleOffCampusLocation}
              handleTime={handleTime}
              handleAddDay={handleAddDay}
              handleRemoveRoute={handleRemoveRoute}
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
