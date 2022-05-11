export function validate(routes) {
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
    const daysValid = routes[i].days.reduce(
      (prev, curr) => prev || curr,
      false
    );
    if (!daysValid) {
      errors.push('Must pick Days for route #' + (i + 1));
    }
  }
  return errors;
}
