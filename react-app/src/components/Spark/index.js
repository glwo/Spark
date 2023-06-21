import React from "react";
import "./Spark.scss";

const Spark = () => {
    return (
        <div className="fire">
          <div className="flames">
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
            <div className="flame"></div>
          </div>
          <div className="logs"></div>
        </div>
      );
    };

export default Spark;
