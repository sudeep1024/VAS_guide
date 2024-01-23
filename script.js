document.addEventListener('DOMContentLoaded', (event) => {
    const startBtn = document.getElementById('startBtn');
    const outputDiv = document.getElementById('output');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        outputDiv.innerHTML = 'Listening...';
    });

    recognition.onresult = async (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        outputDiv.innerHTML = 'You said: ' + result;
        await processVoiceCommand(result);
    };

    recognition.onend = () => {
        startBtn.disabled = false;
        outputDiv.innerHTML = 'Voice recognition ended.';
    };

    async function processVoiceCommand(command) {
        // Add logic to process the voice command and guide the user.
        // Use APIs for location services or any other relevant data.

        // For this example, let's simulate fetching nearby transportation information using Google Maps JavaScript API.
        const locationInfo = await getNearbyTransportInfo(); // Replace this with your actual API call

        // For example, you can use text-to-speech to provide information to the user.
        speakResponse(locationInfo);
    }

    function speakResponse(response) {
        const utterance = new SpeechSynthesisUtterance(response);
        window.speechSynthesis.speak(utterance);
    }

    async function getNearbyTransportInfo() {
        // Simulate fetching nearby transportation information using Google Maps JavaScript API.
        // Replace the following with your actual API call.
        // Make sure to replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key.
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7749,-122.4194&radius=500&type=bus_station|taxi_stand|train_station&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract information from the response as needed.
            const places = data.results.map(place => place.name).join(', ');

            return `Nearby transportation options include: ${places}`;
        } catch (error) {
            console.error('Error fetching nearby transport information:', error);
            return 'Sorry, there was an error fetching nearby transport information.';
        }
    }
});
