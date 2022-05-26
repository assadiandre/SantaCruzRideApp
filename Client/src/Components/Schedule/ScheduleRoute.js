import TimePicker from 'react-bootstrap-time-picker';
import styles from './Schedule.module.css';
import GPlace from './GPlace';
import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  ToggleButton,
  CloseButton,
} from 'react-bootstrap';

export default function ScheduleRoute(props) {
  /* These are the props we pass to ScheduleRoute*/
  const {
    routeNum,
    routeData,
    handleToCampus,
    handleOnCampusLocation,
    handleOffCampusLocation,
    handleTime,
    handleAddDay,
    handleRemoveRoute,
    loadMap,
  } = props;
  const startDate = new Date();

  return (
    <div className={styles.loginForm} key={routeNum}>
      <ol>
        <div className={styles.routeHeader}>
          <h2 className={styles.routeHeaderText}>Route #{routeNum + 1}</h2>
          <CloseButton
            className="me-4"
            onClick={() => handleRemoveRoute(routeNum)}
          />
        </div>

        <DropdownButton
          size="med"
          id="dropdownr-basic-button"
          title={routeData.toCampus === false ? 'From UCSC' : 'To UCSC'}
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
          On Campus Location
          <DropdownButton
            size="med"
            id="dropdownr-basic-button"
            title={routeData.onCampusLocation}
          >
            <Dropdown.Item
              as="button"
              type="button"
              value="East Remote Parking Lot"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              East Remote Parking Lot
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="East Field House"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              East Field House
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Cowell/Stevenson"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Cowell/Stevenson
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Crown/Merill"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Crown/Merill
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="College 9/John R. Lewis"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              College 9/John R. Lewis
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Science Hill"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Science Hill
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Kresge"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Kresge
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Kerr Hall"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Kerr Hall
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Rachel Carson/Porter"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Rachel Carson/Porter
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              type="button"
              value="Oakes"
              onClick={(e) => handleOnCampusLocation(e, routeNum)}
            >
              Oakes
            </Dropdown.Item>
          </DropdownButton>
        </li>

        <li>
          Off Campus Location
          <div>
            {loadMap ? (
              <GPlace
                onChange={(v) => handleOffCampusLocation(v, routeNum)}
                defaultValue={routeData.offCampusLocation}
              />
            ) : (
              <>...</>
            )}
          </div>
          {/* <InputGroup className={styles.inputs}>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={routeData.offCampusLocation}
              onChange={(e) => handleOffCampusLocation(e, routeNum)}
            />
          </InputGroup> */}
        </li>

        <li>
          Arrival Time
          <TimePicker
            start="1:00"
            end="23:00"
            step={15}
            selected={startDate}
            onChange={(time) => handleTime(routeNum, time)}
            value={routeData.time}
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
              checked={routeData.days[0]}
              onChange={(e) => handleAddDay(e, routeNum, 0)}
            >
              Mon
            </ToggleButton>
            <ToggleButton
              className="mb-2"
              id={`toggle-check-${routeNum}1`}
              type="checkbox"
              variant="outline-primary"
              checked={routeData.days[1]}
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
              checked={routeData.days[2]}
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
              checked={routeData.days[3]}
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
              checked={routeData.days[4]}
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
              checked={routeData.days[5]}
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
              checked={routeData.days[6]}
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
}
