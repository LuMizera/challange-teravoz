import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAttendModal } from "../../../store/ducks/home/actions";
import { ApplicationState, Call } from "../../../models";

const ModalAttend = () => {
  const dispatch = useDispatch();

  const {
    user: { ws },
    home: { data }
  } = useSelector((props: ApplicationState) => props);

  const [values, setValues] = useState({ clientName: "" });

  const toggleModal = () => {
    dispatch(toggleAttendModal());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ clientName: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const firstPosition = data.find((call: Call) => call.queue === 1);
    if (ws && firstPosition) {
      ws.send(
        JSON.stringify({
          type: "actor.entered",
          actor: values.clientName,
          call_id: firstPosition.call_id
        })
      );
    }
    toggleModal();
  };

  return (
    <div className="modal">
      <div className="modal-background" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="columns is-marginless">
          <div className="title is-centered">
            <p>Answer Queue #1</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field field-container">
            <label className="label">{`Client's name: `}</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="clientName"
                placeholder="Ex: Lucas Mila"
                onChange={handleChange}
              />
            </div>
            <button className="button is-success">Send</button>
          </div>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={toggleModal}
      ></button>
    </div>
  );
};

export default ModalAttend;
