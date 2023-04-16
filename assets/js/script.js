// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // console.log("funtcion start");
  var byHour = [
    {
      id: "0",
      hour: "9",
      time: "09",
      meridiem: "am",
      todo: ""
    },
    {
      id: "1",
      hour: "10",
      time: "10",
      meridiem: "am",
      todo: ""
    },
    {
      id: "2",
      hour: "11",
      time: "11",
      meridiem: "am",
      todo: ""
    },
    {
      id: "3",
      hour: "12",
      time: "12",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "4",
      hour: "1",
      time: "13",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "5",
      hour: "2",
      time: "14",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "6",
      hour: "3",
      time: "15",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "7",
      hour: "4",
      time: "16",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "8",
      hour: "5",
      time: "17",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "9",
      hour: "6",
      time: "18",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "10",
      hour: "7",
      time: "19",
      meridiem: "pm",
      todo: ""
    },
    {
      id: "11",
      hour: "8",
      time: "20",
      meridiem: "pm",
      todo: ""
    },
    
  ]


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  byHour.forEach(function(thisHour) {

    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container-fluid").append(hourRow);

    var hourDiv = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    var hourToDo = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourToDo.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < dayjs().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === dayjs().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > dayjs().format("HH")) {
        planData.attr({
            "class": "future"
        })
    } 

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var saveHourToDo = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    saveHourToDo.append(saveButton);
    hourRow.append(hourDiv, hourToDo, saveHourToDo);
})

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function saveToDo() {
    localStorage.setItem("byHour", JSON.stringify(byHour));
  }

  function toDoDisplay() {
    byHour.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.todo);
    })
  }

  function init() {
    var storedDay = JSON.parse(localStorage.getItem("byHour"));

    if (storedDay) {
        byHour = storedDay;
    }

    saveToDo();
    toDoDisplay();
  }

  $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveLocalToDo = $(this).siblings(".description").children(".future").attr("id");
    byHour[saveLocalToDo].todo = $(this).siblings(".description").children(".future").val();
    // console.log(saveLocalToDo);
    saveToDo();
    toDoDisplay();
})

  // TODO: Add code to display the current date in the header of the page.
  var timeDisplayEl = $('#time-display');

  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
  
  displayTime();
  setInterval(displayTime, 1000);

  
  init();
  
});
