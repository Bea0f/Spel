// Get  to DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  rockSelect = document.querySelector(".rockSelect"),
  paperSelect = document.querySelector(".paperSelect"),
  scissorsSelect = document.querySelector(".scissorsSelect");

  let chosenLanguage = localStorage.getItem("langSelect");
  chosenLanguage= "swe";
  let currentLanguage = chosenLanguage;

  const changeLanguage = function changeLanguage(language){
    switch (language) {
      case "eng":
        currentLanguage = "eng";
        result.innerHTML = "Let's play!!"
        rockSelect.innerHTML = "Rock"
        paperSelect.innerHTML = "Paper";
        scissorsSelect.innerHTML = "Scissor";
        break;
      case "swe":
        currentLanguage = "swe";
        result.innerHTML = "Låt oss spela!!"
        rockSelect.innerHTML = "Sten";
        paperSelect.innerHTML = "Påse";
        scissorsSelect.innerHTML = "Sax";
        break;

      default:
        currentLanguage = "eng";
        break;
    }
  }
changeLanguage(currentLanguage);
console.log(currentLanguage);

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "img/rock.png";
    if (currentLanguage=="eng") {
      result.textContent = "Wait...";
    }else{
      result.textContent = "Vänta...";
    }


    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];



      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      if (changeLanguage=="eng") {
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
      }else{
        result.textContent = userValue === cpuValue ? "Det blev oavgjort" : `${outComeValue} Vann!!`;
      }

    }, 2500);
  });
});
