import TrainingsPage from './components/TrainingsPage';
import CustomersPage from './components/CustomersPage';
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'
import Home from './components/Home';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';

function App() {
    //App handles tabs - Home/Songs/Albums/TestPage
    //Also render's the whole shabang through index.js ofc
    const [value, setValue] = useState('home');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
    <div className="App">
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="home" label="Home" />
            <Tab value="customers" label="Customers" />
            <Tab value="training" label="Training" />
            <Tab value="calendar" label="Calendar" />
            <Tab value="statistics" label="Statistics" />
        </Tabs>
        {value === 'home' && <Home />}
        {value === 'customers' && <CustomersPage />}
        {value === 'training' && <TrainingsPage />}
        {value === 'calendar' && <Calendar />}
        {value === 'statistics' && <Statistics />}
    </div>);
}

export default App;