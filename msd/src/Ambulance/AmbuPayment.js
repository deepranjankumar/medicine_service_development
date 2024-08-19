import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ambulance.css';

const AmbuPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amb_book } = location.state || {}; // Get appointment data from state

    const checkPayment = async () => {
        const currentDate = new Date();

        // Create updatedData directly with the updated fare
        const updatedData = {
            ...amb_book,
            Fare: '1520',
            status: 'Pending', // Correct the spelling here
         date: currentDate.toISOString() // Directly assign the date string to the date field
        };

        console.log("Data being sent to backend:", updatedData);

        try {
            // Send updated data to backend API
            await axios.post('http://localhost:4000/ambulance-book', updatedData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Navigate to confirmation page after saving data
            navigate('/confirmation');
        } catch (error) {
            console.error('Error saving appointment:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="payment-body">
            <div className="payment">
                <div>
                    <img src="/card.png" alt="card" />
                </div>
                <div className="card-input">
                    <input type="text" placeholder="CARD NUMBER" />
                    <input type="text" placeholder="CARD HOLDER NAME" />
                </div>
                <div className="card-date">
                    <input type="text" placeholder="MM" />
                    <input type="text" placeholder="YY" />
                    <input type="text" placeholder="CVV" />
                </div>
                <div className="payment-btn">
                    <button className="paynow" onClick={checkPayment}>PAY NOW</button>
                    <button className="cancel">CANCEL</button>
                </div>
            </div>
        </div>
    );
};

export default AmbuPayment;
