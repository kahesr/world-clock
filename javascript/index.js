function updateTime() {
  let cities = document.querySelectorAll(".city");

  cities.forEach((city) => {
    let timezone = city.dataset.timezone; //Australia/Sydney

    let localTime = moment().tz(timezone);

    let date = localTime.format("dddd Do YYYY");
    let time = localTime.format("h:mm:ss [<small]>A[</small]");

    city.querySelector(".date").innerHTML = date;
    city.querySelector(".time").innerHTML = time;
  });
}

updateTime();
setInterval(updateTime, 1000);
