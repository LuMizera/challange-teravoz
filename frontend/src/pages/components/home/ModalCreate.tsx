import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateModal } from "../../../store/ducks/home/actions";
import { ApplicationState } from "../../../models";
import MaskedInput from "../../../components/MaskedInput";

const ModalCreate = () => {
  const dispatch = useDispatch();

  const {
    user: { ws }
  } = useSelector((props: ApplicationState) => props);

  const [values, setValues] = useState({ their_number: "" });

  const toggleModal = () => {
    dispatch(toggleCreateModal());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ their_number: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "call.new",
          their_number: values.their_number.replace(/[( )-]/g, "")
        })
      );
    }
    toggleModal();
  };

  const telephoneMask = (event: string) => {
    console.log(event);
    const [, part2] = event.split("-");
    if (part2 && part2.length === 5 && part2.indexOf("_") === -1) {
      return [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    } else {
      return [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    }
  };

  return (
    <div className="modal">
      <div className="modal-background" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="columns is-marginless">
          <div className="title is-centered">
            <p>Create new call</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field field-container">
            <label className="label">{`Client's phone number: `}</label>
            <div className="control">
              <MaskedInput
                className="input"
                type="text"
                name="their_number"
                placeholder="Ex: (11) 9 1111-1111"
                onChange={handleChange}
                //@ts-ignore
                mask={telephoneMask}
                value={values.their_number}
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

export default ModalCreate;
