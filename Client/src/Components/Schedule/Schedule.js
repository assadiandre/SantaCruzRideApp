import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from '../../Context';
import { validate } from './RouteValidator';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import ScheduleRoute from './ScheduleRoute';
import styles from './Schedule.module.css';
import { useEffect, useState, useContext } from 'react';

export default function Schedule() {
  // API key of the google map
  const [loadMap, setLoadMap] = useState(false);
  const [userObject, setUserObject] = useContext(myContext);
  const navigate = useNavigate();
  const [err, setErr] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [routes, setRoutes] = useState([
    {
      toCampus: false,
      days: Array(7).fill(false), // marked indices of days chosen
      time: '',
      offCampusLocation: '',
      onCampusLocation: 'East Remote Parking Lot',
    },
  ]);

  // Will pull user data if it already exists and the user is already setup
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
    if (userObject && userObject.setupFlag) {
      const storedRoutes = userObject.routes.map((route) => {
        console.log(route.onCampusLocation.address);
        console.log(route.offCampusLocation.address);
        return {
          toCampus: route.toCampus,
          time: route.time,
          offCampusLocation: route.offCampusLocation.address,
          onCampusLocation: route.onCampusLocation.address,
          days: covertDaysToBooleans(route.days),
        };
      });
      setRoutes(storedRoutes);
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
    const list = JSON.parse(JSON.stringify(routes));
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
    if (errors.length > 0) {
      setIsShown(true);
      setErr(errors);
    } else {
      const updatedRoutes = convertDaysForRoutesToNumbers(routes);
      //console.log(updatedRoutes);
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
            setUserObject(res.data);
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

  const handleOffCampusLocation = (v, index) => {
    const list = [...routes];
    list[index].offCampusLocation = v;
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
              loadMap={loadMap}
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
