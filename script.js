document.getElementById("submit-btn").addEventListener("click", function () {
  document.getElementById("year-result").textContent = "- -";
  document.getElementById("month-result").textContent = "- -";
  document.getElementById("day-result").textContent = "- -";

  document.getElementById("error-empty-day").style.display = "none";
  document.getElementById("error-input-day").style.display = "none";
  document
    .getElementById("day-input")
    .closest(".form-element")
    .classList.remove("error");

  document.getElementById("error-empty-month").style.display = "none";
  document.getElementById("error-input-month").style.display = "none";
  document
    .getElementById("month-input")
    .closest(".form-element")
    .classList.remove("error");

  document.getElementById("error-empty-year").style.display = "none";
  document.getElementById("error-input-year").style.display = "none";
  document
    .getElementById("year-input")
    .closest(".form-element")
    .classList.remove("error");

  document.getElementById("day-input").classList.remove("shake");

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Form Validation
  const dayInput = parseInt(document.getElementById("day-input").value.trim());
  const monthInput = parseInt(
    document.getElementById("month-input").value.trim(),
  );
  const yearInput = parseInt(
    document.getElementById("year-input").value.trim(),
  );

  let isFormValid = true;

  if (!dayInput) {
    document.getElementById("error-empty-day").style.display = "block";
    document
      .getElementById("day-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("day-input").classList.add("shake");
    isFormValid = false;
  } else if (dayInput > 31) {
    document.getElementById("error-input-day").style.display = "block";
    document
      .getElementById("day-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("day-input").classList.add("shake");
    isFormValid = false;
  } else {
    document
      .getElementById("day-input")
      .closest(".form-element")
      .classList.remove("error");
  }

  if (!monthInput) {
    document.getElementById("error-empty-month").style.display = "block";
    document
      .getElementById("month-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("month-input").classList.add("shake");
    isFormValid = false;
  } else if (monthInput > 12) {
    document.getElementById("error-input-month").style.display = "block";
    document
      .getElementById("month-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("month-input").classList.add("shake");
    isFormValid = false;
  } else {
    document
      .getElementById("month-input")
      .closest(".form-element")
      .classList.remove("error");
  }

  if (!yearInput) {
    document.getElementById("error-empty-year").style.display = "block";
    document
      .getElementById("year-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("year-input").classList.add("shake");
    isFormValid = false;
  } else if (yearInput > currentYear) {
    document.getElementById("error-input-year").style.display = "block";
    document
      .getElementById("year-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("year-input").classList.add("shake");
    isFormValid = false;
  } else {
    document
      .getElementById("year-input")
      .closest(".form-element")
      .classList.remove("error");
  }

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  if (
    ((monthInput === 4 ||
      monthInput === 6 ||
      monthInput === 9 ||
      monthInput === 11) &&
      dayInput > 30) ||
    (monthInput === 2 && dayInput > (isLeapYear(yearInput) ? 29 : 28))
  ) {
    document.getElementById("error-form").style.display = "block";
    document
      .getElementById("day-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("day-input").classList.add("shake");
    document
      .getElementById("month-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("month-input").classList.add("shake");
    document
      .getElementById("year-input")
      .closest(".form-element")
      .classList.add("error");
    document.getElementById("year-input").classList.add("shake");
    isFormValid = false;
  } else {
    document.getElementById("error-form").style.display = "none";
  }

  //animated numbers
  function animateNum(element, endValue, duration = 2000) {
    const startValue = 0;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const increment = endValue / totalFrames;

    let currentValue = startValue;
    let frame = 0;

    function updatedNum() {
      currentValue += increment;
      frame++;

      element.textContent = Math.floor(currentValue);

      if (frame < totalFrames) {
        requestAnimationFrame(updatedNum);
      } else {
        element.textContent = endValue;
      }
    }

    requestAnimationFrame(updatedNum);
  }

  // Calculate age
  if (isFormValid === true) {
    let yearResult = currentYear - yearInput;
    let monthResult = currentMonth - monthInput;
    let dayResult = currentDay - dayInput;

    if (dayResult < 0) {
      monthResult--;

      const prevMonth = currentMonth === 1 ? 12 : monthResult - 1;
      const daysInPrevMonth = new Date(currentYear, prevMonth, 0).getDate();
      dayResult += daysInPrevMonth;
    }

    if (monthResult < 0) {
      yearResult--;
      monthResult += 12;
    }

    animateNum(document.getElementById("year-result"), yearResult);
    animateNum(document.getElementById("month-result"), monthResult);
    animateNum(document.getElementById("day-result"), dayResult);
  }
});
