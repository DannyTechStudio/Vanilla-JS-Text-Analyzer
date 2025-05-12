
/*--------------------- CONSTANTS -----------------------------*/

const body = document.getElementById("body");
const lightModeBtn = document.getElementById("light-mode-btn");
const darkModeBtn = document.getElementById("dark-mode-btn");
const checkBoxWithSpace = document.getElementById("checkbox-with-space");
const checkBoxWithoutSpace = document.getElementById("checkbox-without-space");
const readTimeDisplay = document.getElementById("reading-time-display")
const textInput = document.getElementById("text-input");
const modalAlert = document.querySelector(".modal");
const counterBtn = document.getElementById("counter-btn");
const counterResetBtn = document.getElementById("counter-reset-btn");
const totalChars = document.getElementById("total-chars");
const totalWords = document.getElementById("total-words");
const totalSentences = document.getElementById("total-sentences");
const mostFreqChar = document.getElementById("most-freq-char");

/*--------------------- Function to apply dark mode -----------------------------*/
darkModeBtn.addEventListener('click', () => {
    body.setAttribute('data-theme', 'dark-mode');
});

/*--------------------- Function to apply light mode -----------------------------*/
lightModeBtn.addEventListener('click', () => {
    body.setAttribute('data-theme', 'light-mode');
});

/*--------------------- Function to display approximate reading time -----------------------------*/
function getReadingTime() {

    /*
        Based on research, the average reading is between 200-250 words in a minute\
        Formula:
            readingTime = totalWords / averageReadingSpeed (in minutes)
    */
    
    const averageReadingSpeed = 250;
    const totalWords = textInput.value.split(/\s+/).filter(word => word !== "").length;

    totalReadTime = totalWords / averageReadingSpeed;
    totalReadTimeInSecs = totalReadTime * 60;
    readTimeDisplay.innerText = `${totalReadTimeInSecs.toFixed(2)} secs`;
}

/*--------------------- Function to show  modal -----------------------------*/
function showModal(message) {
    modalAlert.textContent = message;
    modalAlert.style.display = "block";
    modalAlert.classList.add('active');

    setTimeout(() => {
        modalAlert.classList.add('active');
    }, 10);

    setTimeout(() => {
        modalAlert.style.display = 'none';
        modalAlert.classList.remove('active');
    }, 3000);
}

/*--------------------- Click event for the Counter button -------------------*/
counterBtn.addEventListener("click", () => {
    if (textInput.value === "") {
        showModal("Please enter/paste text")

        totalChars.innerText = "0";
        totalWords.innerText = "0";
        totalSentences.innerText = "0";
        mostFreqChar.innerText = "N/A";
        return;
    }

    /*------------------ Calling getReadingTime function----------------------*/
    getReadingTime();

    /*------------------ Counting total characters --------------------------*/
    if (checkBoxWithSpace.checked) {
        checkBoxWithoutSpace.checked = false;
        totalChars.textContent = textInput.value.length;
    }
    else if (checkBoxWithoutSpace.checked) {
        checkBoxWithSpace.ckecked = false;
        totalChars.textContent = textInput.value.replace(/\s/g, "").length;
    }
    else {
        totalChars.textContent = textInput.value.length; // Default behavior if no box is checked
    }

    /*------------------------ Count total words --------------------------*/
    totalWords.textContent = textInput.value.split(/\s+/).filter(word => word !== "").length;

    /*------------------------ Count total sentences --------------------------*/
    totalSentences.textContent = textInput.value.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length;

    /*------------------------ Count the most frequent character --------------------------*/
    const charCount = {};
    let maxChar = "";
    let maxCount = 0;

    for (let char of textInput.value.replace(/\s/g, "")) {
        charCount[char] = (charCount[char] || 0) + 1;
        if (charCount[char] > maxCount) {
            maxChar = char;
            maxCount = charCount[char];
        }
    }

    mostFreqChar.textContent = maxChar ? `'${maxChar}' (${maxCount} times)` : "N/A";
    maxCount.style.fontSize = '8px';
});

/*--------------------- Reset the counter -----------------------------*/
counterResetBtn.addEventListener("click", () => {
    readTimeDisplay.innerText = "0";
    textInput.value = "";
    checkBoxWithSpace.checked = false;
    checkBoxWithoutSpace.checked = false;
    totalChars.textContent = "0";
    totalWords.textContent = "0";
    totalSentences.textContent = "0";
    mostFreqChar.textContent = "0";
    if (modalAlert) modalAlert.style.display = "none";
});



