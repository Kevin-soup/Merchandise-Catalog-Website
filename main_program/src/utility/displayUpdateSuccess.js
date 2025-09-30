import { useState, useEffect } from "react";

/**
 * Custom hook to show a temporary success message.
 * 
 * :param duration: Time in milliseconds the message should be visible.
 * :return: [showSuccess, triggerSuccess] - state boolean and function to trigger it.
 */
function displayUpdateSuccess(duration = 3000) {
    const [showSuccess, setShowSuccess] = useState(false);

    // Clear timer if component unmounts or showSuccess changes.
    useEffect(() => {
        let timer;
        if (showSuccess) {
        timer = setTimeout(() => setShowSuccess(false), duration);
        }
        return () => clearTimeout(timer);
    }, [showSuccess, duration]);

    // Function to trigger showing the success message.
    const triggerSuccess = () => setShowSuccess(true);

    return [showSuccess, triggerSuccess];
}

export default displayUpdateSuccess;
