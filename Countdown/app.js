const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const giveaway = document.querySelector(".giveaway");
  const deadline = document.querySelector(".deadline");
  const items = document.querySelectorAll(".deadline-format h4");

  let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

  // let futureDate = new Date(2022, 4, 29, 17, 30, 0);
  
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  const date = futureDate.getDate();

  let month = futureDate.getMonth();

  const weekday = futureDate.getDay();

  giveaway.textContent = `giveaway ends on ${weekdays[weekday]} ${date} ${months[month]} ${year} ${hours}:${minutes}`;

  // future time in ms
  const futureTime = futureDate.getTime();

  function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;

    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    // set values array
    const values = [days, hours, minutes, seconds];

    function format(item) {
      if(item < 10) {
        return item = `0${item}`;
      }
      return item;
    }
    items.forEach(function(item, index) {
      item.innerHTML = format(values[index]);
    });

    if(t < 0) {
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">Sorry! The giveaway has expired.</h4>`;
    }
  }
  
  let countdown = setInterval(getRemainingTime, 1000);

  getRemainingTime();