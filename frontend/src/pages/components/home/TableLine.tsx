/* eslint-disable react/prop-types */
import React from "react";
import { Call, ApplicationState } from "../../../models";
import { useSelector, useDispatch } from "react-redux";
import { toggleAttendModal } from "../../../store/ducks/home/actions";

interface OwnProps {
  call: Call;
}

const TableLine: React.FC<OwnProps> = ({ call }: OwnProps) => {
  const dispatch = useDispatch();

  const {
    user: { ws }
  } = useSelector((props: ApplicationState) => props);

  const tranformStatus = (type: string): string => {
    switch (type) {
      case "call.new":
        return "New Call";
      case "call.standby":
        return "Standby Call";
      case "call.waiting":
        return "Waiting to be answered";
      case "actor.entered":
        return "Waiting for the attendant";
      case "call.ongoing":
        return "Call is ongoing";
      case "actor.left":
        return "Client left";
      case "call.finished":
        return "Call finished";
      default:
        return "";
    }
  };

  const tranformTelephone = (phoneNumber: string): string => {
    if (phoneNumber.length === 11) {
      const DDD = phoneNumber.slice(0, 2);
      const spacedNumber = phoneNumber.slice(2, 3);
      const firstHalf = phoneNumber.slice(3, 7);
      const secondHalf = phoneNumber.slice(7, 11);
      return `(${DDD}) ${spacedNumber} ${firstHalf}-${secondHalf}`;
    } else if (phoneNumber.length === 10) {
      const DDD = phoneNumber.slice(0, 2);
      const firstHalf = phoneNumber.slice(2, 6);
      const secondHalf = phoneNumber.slice(6, 10);
      return `(${DDD}) ${firstHalf}-${secondHalf}`;
    } else {
      return phoneNumber;
    }
  };

  const formatDate = (date: string): string => {
    const initialdate = new Date(date);
    const day = initialdate.getDate();
    const mounth = initialdate.getMonth() + 1;
    const year = initialdate.getFullYear();
    const hour = initialdate.getHours();
    const minutes = initialdate.getMinutes();
    const seconds = initialdate.getSeconds();

    return `${day <= 9 ? "0" + day : day}/${
      mounth <= 9 ? "0" + mounth : mounth
    }/${year} ${hour}:${minutes <= 9 ? "0" + minutes : minutes}:${
      seconds <= 9 ? "0" + seconds : seconds
    }`;
  };

  const sendCallId = (callId: string) => {
    if (ws) {
      ws.send(JSON.stringify({ call_id: callId, type: "call.standby" }));
    }
  };

  const toggleAttend = () => {
    dispatch(toggleAttendModal());
  };

  const handleLeaveCall = (callId: string) => {
    if (ws) {
      ws.send(JSON.stringify({ call_id: callId, type: "actor.left" }));
    }
  };

  const formatReturningCall = (returningCall: boolean | undefined): string => {
    if (returningCall !== undefined) {
      if (returningCall === true) {
        return "Yes";
      } else {
        return "No";
      }
    } else {
      return "Not defined yet.";
    }
  };

  const handleButton = (call: Call) => {
    switch (call.type) {
      case "call.new":
        return (
          <button
            className="button is-success"
            onClick={() => sendCallId(call.call_id)}
          >
            Send To Standby
          </button>
        );
      case "call.standby":
        return (
          <button className="button is-danger" disabled>
            Delegating call
          </button>
        );
      case "call.waiting":
        if (call.queue === 1) {
          return (
            <button className="button is-success" onClick={toggleAttend}>
              Answer call
            </button>
          );
        } else {
          return (
            <button className="button is-danger" disabled>
              Answer the #1 call first.
            </button>
          );
        }
      case "actor.entered":
        return (
          <button className="button is-success" disabled>
            Client entered the call
          </button>
        );
      case "call.ongoing":
        return (
          <button
            className="button is-danger"
            onClick={() => handleLeaveCall(call.call_id)}
          >
            Leave Call
          </button>
        );
      case "actor.left":
        return (
          <button className="button is-danger" disabled>
            Finishing call
          </button>
        );
      case "call.finished":
        return (
          <button className="button is-danger" disabled>
            Call finished
          </button>
        );
      default:
        return "";
    }
  };
  return (
    <tr>
      <td>{call.queue === 0 ? "Not in Queue" : call.queue}</td>
      <td>{tranformStatus(call.type)}</td>
      <td>{tranformTelephone(call.their_number)}</td>
      <td>{call.actor ? call.actor : "Not assigned yet"}</td>
      <td>{formatDate(call.timestamp)}</td>
      <td>{formatReturningCall(call.returningCall)}</td>
      <td>{handleButton(call)}</td>
    </tr>
  );
};

export default TableLine;
