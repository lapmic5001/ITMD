// Define the mapping from hex color to characters
const colorToCharMap = {
    "#FF0000": "A", // Red
    "#00FF00": "B", // Green
    "#0000FF": "C", // Blue
    "#FFFF00": "D", // Yellow
    "#FF00FF": "E", // Magenta
    "#00FFFF": "F", // Cyan
    "#800000": "G", // Maroon
    "#008000": "H", // Dark Green
    "#000080": "I", // Navy
    "#808000": "J", // Olive
    "#800080": "K", // Purple
    "#008080": "L", // Teal
    "#C0C0C0": "M", // Silver
    "#808080": "N", // Gray
    "#FF4500": "O", // Orange Red
    "#2E8B57": "P", // Sea Green
    "#4682B4": "Q", // Steel Blue
    "#DA70D6": "R", // Orchid
    "#32CD32": "S", // Lime Green
    "#FFD700": "T", // Gold
    "#D2691E": "U", // Chocolate
    "#1E90FF": "V", // Dodger Blue
    "#ADFF2F": "W", // Green Yellow
    "#FF69B4": "X", // Hot Pink
    "#CD5C5C": "Y", // Indian Red
    "#4B0082": "Z", // Indigo
    "#696969": "0", // Dim Gray
    "#A52A2A": "1", // Brown
    "#5F9EA0": "2", // Cadet Blue
    "#8A2BE2": "3", // Blue Violet
    "#D8BFD8": "4", // Thistle
    "#DC143C": "5", // Crimson
    "#FF8C00": "6", // Dark Orange
    "#FF6347": "7", // Tomato
    "#6B8E23": "8", // Olive Drab
    "#B0E0E6": "9", // Powder Blue
    "#FFFFFF": "_", // White (Underscore)
    "#000000": "-", // Black (Dash)
    "#F5F5F5": " ", // White Smoke (Space)
    "#FFB6C1": ".", // Light Pink (Period)
    "#8B4513": ",", // Saddle Brown (Comma)
    "#7FFF00": "!" // Chartreuse (Exclamation Mark)
};

// Function to decode the uploaded image
function decodeImage() {
    const fileInput = document.getElementById("uploadImage");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let decodedMessage = "";

                // Calculate total number of pixels
                const totalPixels = imageData.data.length / 4; // Each pixel consists of 4 values (RGBA)

                // Determine loading time based on number of pixels
                const loadingTime = Math.min(2000 + totalPixels * 0.01, 10000); // Max loading time of 10 seconds

                // Show loading overlay
                document.getElementById("loading").style.display = "flex";

                setTimeout(() => {
                    // Loop through each pixel, convert color to hex, and map to character
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        const r = imageData.data[i];
                        const g = imageData.data[i + 1];
                        const b = imageData.data[i + 2];

                        // Convert RGB to hex
                        const hexColor = rgbToHex(r, g, b);

                        // Map hex color to character
                        if (colorToCharMap[hexColor]) {
                            decodedMessage += colorToCharMap[hexColor];
                        } else {
                            decodedMessage += ""; // Use a space or any placeholder for unmapped colors
                        }
                    }

                    // Hide loading overlay
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("outputMessage").innerText = decodedMessage;
                }, loadingTime);
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("Please upload an image.");
    }
}

// Helper function to convert RGB values to a hex color
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
