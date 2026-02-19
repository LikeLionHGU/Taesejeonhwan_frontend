import React from "react";
import "../../styles/ToggleSwitch.css";

const ToggleSwitch = ({ isOn, toggle }) => {
    return (
        <div className={`toggle-container ${isOn ? "on" : ""}`} onClick={toggle}>
            <div className="toggle-circle" />
        </div>
    );
};

export default ToggleSwitch;