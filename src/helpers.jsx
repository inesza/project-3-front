// Adds a 0 before a number if it is single digit (useful for hours and minutes display)
const computeTwoDigitNumber = (value) => {
  return `0${value}`.slice(-2);
};

// Get crisis duration in minutes and hours
const getDuration = (start, end) => {
  {
    const startDateTimestamp = new Date(start).getTime();
    const endDateTimestamp = new Date(end).getTime();
    const diff = endDateTimestamp - startDateTimestamp;
    const hours = Math.floor(diff / 60 / 60 / 1000);
    const minutes = Math.floor(diff / 60 / 1000) - hours * 60;
    return `${hours} hours ${computeTwoDigitNumber(minutes)} minutes `;
  }
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

export { computeTwoDigitNumber, getDuration, getIntensityDescription };
