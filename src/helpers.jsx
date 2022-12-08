// Adds a 0 before a number if it is single digit (useful for hours and minutes display)
const computeTwoDigitNumber = (value) => {
  return `0${value}`.slice(-2);
};

// Get crisis duration in minutes and hours
const getDuration = (start, end, format) => {
  {
    const startDateTimestamp = new Date(start).getTime();
    const endDateTimestamp = new Date(end).getTime();
    if (end !== null) {
      const diff = endDateTimestamp - startDateTimestamp;
      const hours = Math.floor(diff / 60 / 60 / 1000);
      const minutes = Math.floor(diff / 60 / 1000) - hours * 60;
      if (format && format === "short")
        return `${hours}h${computeTwoDigitNumber(minutes)}`;
      return `${hours} hours ${computeTwoDigitNumber(minutes)} minutes `;
    } else {
      const runningTime = Date.now() - startDateTimestamp;
      const hours = Math.floor(runningTime / 60 / 60 / 1000);
      const minutes = Math.floor(runningTime / 60 / 1000) - hours * 60;
      if (format && format === "short")
        return `Running for ${hours}h${computeTwoDigitNumber(minutes)}`;
      return `Running for ${hours} ${
        hours <= 1 ? "hour" : "hours"
      } ${computeTwoDigitNumber(minutes)} minutes `;
    }
  }
};

// Display date as human readable format (with or without hours)
const getHumanReadableDate = (date, format) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (format === "hours") options.weekday = "short";
  let readableDate = new Date(date).toLocaleDateString("en", options);
  if (format === "hours") {
    readableDate += ` - ${new Date(date).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  //   Display day as human readable format(in english)
  return readableDate;
};

// Provides description based on crisis intensity
const getIntensityDescription = (intensity) => {
  let intensityTitle = "";
  let intensityDescription = "";

  switch (Number(intensity)) {
    case 0:
      intensityTitle = "Pain free";
      intensityDescription = "No pain at all";
      break;
    case 1:
      intensityTitle = "Very mild pain";
      intensityDescription =
        "Barely noticeable pain. Most of the time you don't think about it.";
      break;
    case 2:
      intensityTitle = "Minor pain";
      intensityDescription =
        "Annoying and may have occasional stronger twinges.";
      break;
    case 3:
      intensityTitle = "Noticeable pain";
      intensityDescription =
        "Distracting, but you can get used to it and adapt.";
      break;
    case 4:
      intensityTitle = " Moderate pain";
      intensityDescription =
        "If you are deeply involved in an activity, it can be ignored for a period of time, but is still distracting.";
      break;
    case 5:
      intensityTitle = "Moderately strong pain";
      intensityDescription =
        "It can’t be ignored for more than a few minutes, but with effort you still can manage to work or participate in some social activities.";
      break;
    case 6:
      intensityTitle = "Moderately strong pain";
      intensityDescription =
        "Moderately strong pain that interferes with normal daily activities. Difficulty concentrating.";
      break;
    case 7:
      intensityTitle = "Severe pain";
      intensityDescription =
        "Dominates your senses and significantly limits your ability to perform normal daily activities or maintain social relationships. Interferes with sleep.";
      break;
    case 8:
      intensityTitle = "Intense pain";
      intensityDescription =
        "Physical activity is severely limited. Conversing requires great effort.";
      break;
    case 9:
      intensityTitle = "Excruciating pain";
      intensityDescription =
        "Unable to converse. Crying out and/or moaning uncontrollably.";
      break;
    case 10:
      intensityTitle = "Unspeakable pain";
      intensityDescription =
        "Bedridden and possibly delirious. Very few people will ever experience this level of pain.";
      break;
  }

  const intensityDetails = {
    title: intensityTitle,
    description: intensityDescription,
    icon: "Icon",
  };

  return intensityDetails;
};

export {
  computeTwoDigitNumber,
  getDuration,
  getIntensityDescription,
  getHumanReadableDate,
};
