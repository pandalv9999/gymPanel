import React, { useEffect, useState } from "react";
import TrainerSchedule from "./TrainerSchedule";
import axios from "axios";

const Trainers = ({ user }) => {
  const [trainers, setTrainers] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadTrainer = () => {
    const url = `./${user.username}/trainers`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          setErrMsg("There is no course loaded!");
        } else {
          setTrainers(data);
        }
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const onTrainerScheduleExpand = (trainerId) => {
    const curr = [...displays];
    curr[trainerId] = true;
    setDisplays(curr);
    console.log(displays[trainerId]);
  };

  const onTrainerScheduleCollapse = (trainerId) => {
    const curr = [...displays];
    curr[trainerId] = false;
    setDisplays(curr);
    console.log(displays[trainerId]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log(`Loading Trainers`);
    loadTrainer();
  }, []);

  return (
    <React.Fragment>
      <p style={{ color: "red" }}>{errMsg}</p>
      <ul>
        {trainers.map((trainer) => {
          return (
            <li
              key={trainer.id}
              style={{ listStyleType: "None" }}
              className={"outer-list-container"}
            >
              <div className={"list-container"}>
                <img
                  src={trainer.url}
                  alt={trainer.name}
                  width={"120px"}
                  height={"120px"}
                />
                <div className={"list-text"}>
                  <h3>{trainer.name}</h3>
                  <p>{trainer.description}</p>
                </div>
                {!displays[trainer.id] ? (
                  <div className={"schedule-button"}>
                    <button onClick={() => onTrainerScheduleExpand(trainer.id)}>
                      Expand
                    </button>
                  </div>
                ) : (
                  <div className={"schedule-button"}>
                    <button
                      onClick={() => onTrainerScheduleCollapse(trainer.id)}
                    >
                      Collapse
                    </button>
                  </div>
                )}
              </div>
              {displays[trainer.id] && (
                <TrainerSchedule user={user} trainerId={trainer.id} />
              )}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Trainers;
