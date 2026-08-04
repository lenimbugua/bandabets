const formatStuff = () => {
  const createStandardDateObject = (dateString) => {
    if (!dateString) {
      return;
    }
    //dateString must be of format e.g '2023-02-27 19:44:00';
    const dateParts = dateString.split(/[- :]/); // split the date string into an array
    const standardDate = new Date(
      dateParts[0],
      dateParts[1] - 1, //month is zero-indexed in JavaScript's Date object
      dateParts[2],
      dateParts[3],
      dateParts[4],
      dateParts[5]
    ); // create a new Date object
    return standardDate;
  };

  const addSecondsToTime = (time, seconds) => {
    if (!time || !seconds) {
      return;
    }
    const stdDate = createStandardDateObject(time);
    return stdDate.setSeconds(stdDate.getSeconds() + seconds);
  };

  const addSecondsToNow = (seconds) => {
    if (!seconds) {
      return;
    }
    const now = new Date();

    return now.setSeconds(now.getSeconds() + seconds);
  };

  const formatDateTime = (dateString) => {
    // Create a Date object from the string
    const dateObj = createStandardDateObject(dateString);

    // Format the date to "MM/DD h:mm a"
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  };

  const formatHomeTeamScore = (result) => {
    if (result === null) {
      return;
    } else {
      return result.substring(0, result.indexOf(":"));
    }
  };
  const formatAwayTeamScore = (result) => {
    if (result === null) {
      return;
    } else {
      return result.split(":")[1];
    }
  };
  const formatLiveDisplay = (status, statusDesc, periodicTime) => {
    if (status == 0) {
      return;
    } else {
      let live = periodicTime === "" ? "LIVE •" : "";
      let formatedDisplay = live;
      if (statusDesc !== null) {
        statusDesc = ` ${statusDesc}`;
        formatedDisplay = `${formatedDisplay} ${statusDesc}`;
      }
      if (periodicTime !== "") {
        periodicTime = `• ${periodicTime}'`;
        formatedDisplay = `${formatedDisplay} ${periodicTime}`;
      }
      return formatedDisplay.toUpperCase();
    }
  };

  const formClubLogo = (name, isHomeTeam, competitionId) => {
    if (!name) {
      return "";
    }
    const baseUrl = "https://veimu.info/v1/images?competition_id=";

    name = name.replace(/\s+/g, "");

    name = name.toLowerCase();

    if (isHomeTeam) {
      name = `${name}-h`;
    } else {
      name = `${name}-a`;
    }

    return `${baseUrl}${competitionId}&name=${name}.png`;
  };


  const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
    return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
  };
  const formCloudflareImage = (imageId, variant="public") => {
    return `https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/${imageId}/${variant}`;
  };

  const formattedNumber = (number) =>
    (number ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const slugify = (text) => {
     return text
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/[^\w-]+/g, "") // remove special chars
    .replace(/--+/g, "-") // collapse multiple hyphens
    .replace(/^-+/, "") // trim start
    .replace(/-+$/, ""); // trim end
};

  return {
    formClubLogo,
    formCustomId,
    formatDateTime,
    addSecondsToNow,
    addSecondsToTime,
    formatLiveDisplay,
    formatAwayTeamScore,
    formatHomeTeamScore,
    formattedNumber,
    formCloudflareImage,
    slugify,
    createStandardDateObject,
  };
};

export default formatStuff;
