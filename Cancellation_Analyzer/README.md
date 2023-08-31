# Forecasting the Future of Hotel Bookings
Project Vision: 
Create a model which holds the ability to accurately predict whether a hotel reservation made by a customer will eventually be cancelled or not.

Motivation/Inspiration: 
When hotel bookings are canceled, they create massive unexpected shrink for hotel chains. While this has been a persistent issue for some time now, the rate of cancellations has been recently increasing. This is due to mass booking sites like Booking.com and Trivago. This is a financial sink for the hotel chains, which pass on these costs to customers. Our project aims to create a better predictive model for cancellations, such that hotels and customers alike are able to benefit financially. 

Added Value: 
Estimates from Forbes show that hotels lose potentially an extra 30% in income from cancellations. The rate of cancellations have also been increasing, especially for mass booking sites like Booking.com, which is seeing a 40% cancellation rate on average. We hope to reduce this number through our model, or at the very least provide an expected value for hotel chains. This can be used to create cancellation policies and more accurate budgets.


# Methodology

PreProcessing/Cleaning: 
Our initial dataset is in HotelReservations.csv with 18 columns. However, we deemed a portion of this data unusable, and we also converted some of our categorical variables to numerical variables and dummy variables. This brought our column total to 10, visible in hotel_reservations_cleaned.csv. We then converted the data for the Logistic Regression model to read in HotelReservations_finalclean.txt.

It is important to note that the logistic regression model performed a descriptive analysis on the hotel_reservations_cleaned.csv to produce MLDataset.csv. However, as this produced negligible changes, we have decided to opt for the original.

Finally, running a PCA and Feature Analysis, we find that the optimal amount of variables rests between 7 and 10.

Optionally, we have created a RandomForestsOptimizer.ipynb to also under sample and tune hyperparameters. However, as this is very computationally taxing, we have left it to user discretion whether to utilize it.

Research Questions:

1. How well can our predictors predict if a customer will cancel their booking or not? 

2. What are the important predictors that correlate strongly to our response? 

3. How can we use our selected predictors to optimize certain metrics?


# Data
Our repository hosts all data used, both before and after preprocessing for each model. We store this data in the form of .csv and .txt files, which are explained in detail below.

Our initial data is derived from: https://www.kaggle.com/datasets/ahsan81/hotel-reservations-classification-dataset

Our proposal which is labeled [TeamA's proposal.pdf](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/TeamA's%20Proposal.pdf) will give the goals and purpose of this project <br>
[Hotel Reservations.csv](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/data/Hotel%20Reservations.csv) is the raw dataset with the 18 predictors <br>
[MLDataset.csv](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/data/MLDataset.csv) is the dataset that is used for the random forest model <br>
[Hotel_Reservations_finalclean.csv](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/data/Hotel_Reservations_finalclean.txt) is the dataset that is used to make the logarithmic model <br>
We performed the basic feature selection on [IDSC_project.ipynb](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/IDSC_project.ipynb) and used that to get a basic idea of what predictors were significant <br>
All of the data visualizations that were in the presentation were created in [Data Visualizations.ipynb](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/Data%20visualizations.ipynb) <br>
The logarithmic model was created and tested in logarithmic [regression algorithim.rmd](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/logarithmic%20regression%20algorithm.Rmd) <br>
The random forest algorithm was created in [Random_Forest_Algorithm.ipynb](https://github.com/arnabb3/personal-portfolio/blob/main/Cancellation_Analyzer/Random_Forest_Algorithm.ipynb) <br>

## Data Dictionary for MLDataset.csv

long_trip: A boolean on whether or not the Sum of the number of weekday and weekend nights were greater than 2 <br>
lead_time: How many days in advance a customer booked a hotel room <br>
avg_price_per_room: The average price of the hotel room. It can be subject to change depending on the month and other circumstances <br>
month: The numbered month in which the hotel room was booked <br>
prev_show_rate: if they had previous bookings, then its the percentage of time they have commited. If they do not have previous bookings, then it defaults to 0.5 <br>

## Data Dictionary for Hotel_Reservations_finalclean.txt
adult_no: Number of Adults who are listed in the hotel reservation <br>
child_no: Number of Children who are listed in the hotel reservation <br>
weekend_nights_no: Number of Weekdays the hotel room was booked for <br>
weekday_nights_no: Number of Weekends the hotel room was booked for <br>
lead_time: How many days in advance the hotel room was booked <br>
avg_price_per_room: The average price per room <br>
special_requests_no: The number of special requests the individual made before making the booking (eg: prefering a room next with a beach view, wanting a room on a <br> specfic floor) <br>
month: The month in which the hotel reservation was booked for <br>
prev_show_rate: if they had previous bookings, then its the percentage of time they have commited. If they do not have previous bookings, then it defaults to 0.5 <br>



## Data Dictionary for Hotel Reservations.csv

Booking_Id:unique identifier of each booking
no_of_adults: Number of adults in booking
no_of_children: Number of Children in booking
no_of_weekend_nights: Number of weekend nights (Saturday or Sunday) the guest stayed or booked to stay at the hotel
no_of_week_nights: Number of week nights (Monday to Friday) the guest stayed or booked to stay at the hotel
type_of_meal_plan: Type of meal plan booked by the customer
required_car_parking_space: Does the customer require a car parking space?
room_type_reserved,lead_time: Type of room reserved by the customer.
arrival_year: Year of arrival date
arrival_month: Month of arrival date
arrival_date: Date of the month that customer is expected to arrive
market_segment_type: Market segment designation(Online/Offline)
repeated_guest: Is the customer a repeated guest? (Have they booked before?)
no_of_previous_cancellations: Number of previous bookings that were canceled by the customer prior to the current booking
no_of_previous_bookings_not_canceled: Number of previous bookings not canceled by the customer prior to the current booking
avg_price_per_room: Average price per day of the reservation; prices of the rooms are dynamic
no_of_special_requests: Total number of special requests made by the customer
booking_status: Flag indicating if the booking was canceled or not

# Conclusion

Through analysis, we have been able to create two models, a logistic and a random forest algorithm model. The logistic model prioritizes recall while the random forest algorithm has a slightly lower recall but far more accuracy. Clients that use our models can decide which best suits their company's needs and use them accordingly.
