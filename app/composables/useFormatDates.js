export function useFormatDates() {
  //   function formatDateWithTime(inputDate) {
  //     const year = inputDate.getFullYear();
  //     const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  //     const day = String(inputDate.getDate()).padStart(2, "0");

  //     let hours = inputDate.getHours();
  //     const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  //     const ampm = hours >= 12 ? "PM" : "AM";

  //     // Convert 24-hour time to 12-hour time
  //     hours = hours % 12 || 12; // If hours is 0, display 12 instead

  //     return `${year}-${month}-${day} at ${hours}:${minutes} ${ampm}`;
  //   }

  function formatDateWithTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // formats to e.g hh:mm PM
  function getTimeFromDate(dateString) {
    const date = new Date(dateString);

    const hours = date.getHours();

    const minutes = date.getMinutes();

    const meridian = date.getHours() >= 12 ? "PM" : "AM";

    // Display the time with AM/PM
    return `${hours}:${minutes.toString().padStart(2, "0")} ${meridian}`; // Outputs: 12:55 PM
  }

  // yyyy/mm/dd hh:mm
  function formatDate(dateString) {
    const date = new Date(dateString);

    // const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

    const hours = date.getHours().toString().padStart(2, "0"); // Add leading zero for single-digit hours
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero for single-digit minutes

    return `${month}/${day} ${hours}:${minutes}`;
  }

  function generateNextFourDays() {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const result = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

      result.push({
        day: i === 0 ? "Today" : dayOfWeek,
        date: formattedDate,
      });
    }

    return result;
  }

  //   function humanFriendlyDate(dateString) {
  //     const daysOfWeek = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];

  //     // Parse the input date and get the current date
  //     const inputDate = new Date(dateString);
  //     const currentDate = new Date();

  //     // Clear the time part of both dates to compare only the date part
  //     const inputDateOnly = new Date(
  //       inputDate.getFullYear(),
  //       inputDate.getMonth(),
  //       inputDate.getDate()
  //     );
  //     const currentDateOnly = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       currentDate.getDate()
  //     );

  //     // Get the time difference in milliseconds and convert to days
  //     const timeDifference = inputDateOnly - currentDateOnly;
  //     const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Days difference

  //     // Get the hours and minutes
  //     let hours = inputDate.getHours();
  //     const minutes = inputDate.getMinutes().toString().padStart(2, "0");

  //     // Determine AM or PM
  //     const ampm = hours >= 12 ? "PM" : "AM";
  //     hours = hours % 12 || 12; // Convert to 12-hour format, treat 0 as 12

  //     // Handle "Today" or "Tomorrow"
  //     if (daysDifference === 0) {
  //       return `Today at ${hours}:${minutes} ${ampm}`;
  //     } else if (daysDifference === 1) {
  //       return `Tomorrow at ${hours}:${minutes} ${ampm}`;
  //     }

  //     // If the date is more than 7 days ago or in the future, return the date in "YYYY-MM-DD" format
  //     if (Math.abs(daysDifference) > 6) {
  //       return formatDateWithTime(inputDate); // Returns date part in YYYY-MM-DD format
  //     }

  //     // Otherwise, return the day of the week and time
  //     const dayOfWeek = daysOfWeek[inputDate.getDay()];
  //     return `${dayOfWeek} at ${hours}:${minutes} ${ampm}`;
  //   }

  function humanFriendlyDate(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Parse the input date and get the current date
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    // Clear the time part of both dates to compare only the date part
    const inputDateOnly = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );
    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Get the time difference in milliseconds and convert to days
    const timeDifference = inputDateOnly - currentDateOnly;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Days difference

    // Get the hours and minutes in 24-hour format
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");

    // Handle "Today" or "Tomorrow"
    if (daysDifference === 0) {
      return `Today at ${hours}:${minutes}`;
    } else if (daysDifference === 1) {
      return `Tomorrow at ${hours}:${minutes}`;
    }

    // If the date is more than 7 days ago or in the future, return the date in "YYYY-MM-DD" format
    if (Math.abs(daysDifference) > 6) {
      return formatDateWithTime(inputDate); // Returns date part in YYYY-MM-DD format
    }

    // Otherwise, return the day of the week and time
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    return `${dayOfWeek} at ${hours}:${minutes}`;
  }

  return {
    generateNextFourDays,
    humanFriendlyDate,
    getTimeFromDate,
    formatDate,
  };
}

// function getCurrentDayInFormat() {
//   // Format: YYYY-MM-DD
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//   const day = String(today.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }
