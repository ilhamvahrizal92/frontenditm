import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, LogOut,reset } from './authSlice';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good night';
  }

  return (
    <div>
        <div className="bg-wrapper">
		<div className ="text-right top-right weather">
			<div>{user && user.name}</div>	
			<div className="button">
        <button onClick={logout}> Log Out
        </button>
      </div>
		</div>
		<div className ="text-center centered">
				<div className="block-text">
					<h1>{currentTime.toLocaleTimeString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // Use 24-hour format
      })}</h1>
				</div>
				<h3>{greeting}, {user && user.name}</h3>
		</div>
		<div className ="text-center bottom-third quote">
				<div>Dashboard Live Code ITM</div>
		</div>
	</div>

    </div>
  );
};

export default Dashboard;