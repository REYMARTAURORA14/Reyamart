setTimeout(function() {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}, 5000); // 4000 milliseconds = 4 seconds


function toggleMenu() {
    const menu = document.getElementById('slidingMenu');
    menu.classList.toggle('show'); // Toggle the 'show' class for sliding in and out
}

function closeMenu() {
    document.getElementById('slidingMenu').classList.remove('show'); // Remove the 'show' class to close the menu
}

// PLANTS DISEASES POP UP
function openModal(imgElement, details) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalSolution = document.getElementById("modal-solution");

    // Split the details into components
    const [title, description, solution] = details.split('|');

    // Set the modal content
    modalImage.src = imgElement.src; // Set modal image to the clicked image
    modalTitle.textContent = title.trim(); // Set the title for the plant name
    modalDescription.textContent = description.trim(); // Set the description text
    modalSolution.textContent = solution.trim(); // Set the solution text

    // Display the modal
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Hide the modal
}

// Close the modal when clicking outside of the image
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}

// SOIL TYPE
// Function to open the soil modal with soil details and plant suggestions
function openSoilModal(imageElement, details, suggestions) {
    // Split details to get title, description, and solution
    const [title, description, solution] = details.split('|');
    
    // Set modal elements with the soil information
    document.getElementById("soil-modal-image").src = imageElement.src;
    document.getElementById("soil-modal-title").textContent = title;
    document.getElementById("soil-modal-description").textContent = description;
    document.getElementById("soil-modal-solution").textContent = solution;
    
    // Show the modal
    const soilModal = document.getElementById("soilModal");
    soilModal.style.display = "block";

    // Populate plant suggestions dynamically
    suggestions.forEach((suggestion, index) => {
        document.getElementById(`suggestion-img${index + 1}`).src = suggestion.img;
        document.getElementById(`suggestion-name${index + 1}`).textContent = suggestion.name;
    });

    // Add an event listener to close the modal when clicking outside of it
    soilModal.addEventListener("click", function(event) {
        if (event.target === soilModal) {
            closeSoilModal();
        }
    });
}

// Function to close the soil modal
function closeSoilModal() {
    const soilModal = document.getElementById("soilModal");
    soilModal.style.display = "none";
}



// Initialize speech synthesis
let synth = window.speechSynthesis;
let isReadingPlant = false; // For tracking plant modal reading
let soilModalIsOpen = false; // For tracking soil modal reading

document.addEventListener("DOMContentLoaded", function () {
    // Attach the readPlantText function to the "Read" button in the Plant Modal
    document.querySelector(".plantmodal button").addEventListener("click", readPlantText);

    // Attach close functionality to the Plant Modal close button
    document.querySelector(".plantmodal .close").addEventListener("click", closePlantModal);

    // Attach the readSoilText function to the "Read" button in the Soil Modal
    document.querySelector(".soilmodal button").addEventListener("click", readSoilText);

    // Attach close functionality to the Soil Modal close button
    document.querySelector(".soilmodal .close").addEventListener("click", closeSoilModal);
});

// PLANT MODAL FUNCTIONS
function readPlantText() {
    // Stop any existing reading
    if (synth.speaking || isReadingPlant) {
        synth.cancel();
    }

    // Get text from Plant Modal
    const title = document.getElementById("modal-title")?.textContent;
    const description = document.getElementById("modal-description")?.textContent;
    const solution = document.getElementById("modal-solution")?.textContent;

    if (!title || !description || !solution) {
        console.error("One or more plant modal elements not found.");
        return;
    }

    // Combine all text to read
    const textToRead = `${title}. ${description}. ${solution}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Start reading and set state
    synth.speak(utterance);
    isReadingPlant = true;

    utterance.onend = () => { isReadingPlant = false; };
}

function closePlantModal() {
    document.getElementById("modal").style.display = "none";
    stopReading(); // Stop reading
}

// SOIL MODAL FUNCTIONS
function readSoilText() {
    if (synth.speaking || soilModalIsOpen) {
        synth.cancel();
    }

    // Get text from Soil Modal
    const soilName = document.getElementById("soil-modal-title")?.innerText;
    const description = document.getElementById("soil-modal-description")?.innerText;
    const solution = document.getElementById("soil-modal-solution")?.innerText;
    const plant1 = document.getElementById("suggestion-name1")?.innerText;
    const plant2 = document.getElementById("suggestion-name2")?.innerText;
    const plant3 = document.getElementById("suggestion-name3")?.innerText;
    const plant4 = document.getElementById("suggestion-name4")?.innerText;

    if (!soilName || !description || !solution || !plant1 || !plant2 || !plant3 || !plant4) {
        console.error("One or more soil modal elements not found.");
        return;
    }

    // Prepare the full text to be read
    const fullText = `${soilName}. ${description}. ${solution}. Suggested plants include ${plant1}, ${plant2}, ${plant3}, and ${plant4}.`;
    const utterance = new SpeechSynthesisUtterance(fullText);

    // Start reading and set state
    synth.speak(utterance);
    soilModalIsOpen = true;

    utterance.onend = () => { soilModalIsOpen = false; };
}

function closeSoilModal() {
    document.getElementById("soilModal").style.display = "none";
    stopReading(); // Stop reading
}

// GENERAL STOP READING FUNCTION
function stopReading() {
    if (synth.speaking) {
        synth.cancel();
        isReadingPlant = false;
        soilModalIsOpen = false;
    }
}







// setTimeout(() => {
//     window.location.href = 'login.html'; // Redirect to login page
// }, 3000); 

// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // For demonstration, use static credentials
//     if (username === 'user' && password === 'password') {
//         // Redirect to the main content after successful login
//         window.location.href = 'index.html'; // Change to your main screen filename
//     } else {
//         // Show error message if login fails
//         document.getElementById('error-message').style.display = 'block';
//     }
// });