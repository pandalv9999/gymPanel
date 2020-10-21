import React, {useEffect, useState} from "react";
import TrainerSchedule from "./TrainerSchedule";
import axios from "axios";

const Trainers = ({user}) => {

    const [trainers, setTrainers] = useState([]);
    const [displays, setDisplays] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const loadTrainer = () => {
        const url = `./${user.username}/trainers` ;
        axios.get(url).then(res => {
            const data = res.data;
            if (data.length === 0) {
                setErrMsg("There is no course loaded!")
            } else {
                setTrainers(data)
            }
        }).catch(err => {
            setErrMsg(err)
        });
    };

    const onTrainerScheduleExpand = (trainerId) => {
       const curr = [...displays];
       curr[trainerId] = true;
       setDisplays(curr);
       console.log(displays[trainerId])
    };

    const onTrainerScheduleCollapse = (trainerId) => {
        const curr = [...displays];
        curr[trainerId] = false;
        setDisplays(curr);
        console.log(displays[trainerId])
    };

    useEffect(() => {
        console.log(`Loading Trainers`);
        loadTrainer();
    }, []);

    return (
        <React.Fragment>
            <h2>Trainer</h2>
            <p style={{color: "red"}}>{errMsg}</p>
            <ul>
                {trainers.map(trainer => {
                    return (
                        <li key={trainer.id} style={{listStyleType: "None"}}>
                            <h3>{trainer.name}</h3>
                            <img src={trainer.url} alt={trainer.name} width={"150px"} height={"150px"}/>
                            <p>{trainer.description}</p>
                            {!displays[trainer.id] ?
                                <button onClick={() => onTrainerScheduleExpand(trainer.id)}>Expand</button>
                                :
                                <React.Fragment>
                                    <button onClick={() => onTrainerScheduleCollapse(trainer.id)}>Collapse</button>
                                    <TrainerSchedule user={user} trainerId={trainer.id}/>
                                </React.Fragment>

                            }
                        </li>
                )
                })}
            </ul>
        </React.Fragment>
    )
};

export default Trainers