import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState, Call } from "../../../models";
import TableLine from "./TableLine";

const Table = () => {
  const {
    home: {
      data: callsData,
      filters: { type }
    }
  } = useSelector((props: ApplicationState) => props);

  return (
    <>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Queue Position</th>
            <th>Status</th>
            <th>Client Number</th>
            <th>Client Name</th>
            <th>Last Change</th>
            <th>Returning call</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {callsData.map((call: Call) =>
            call.type === type || type === "" ? (
              <TableLine key={call.call_id} call={call} />
            ) : (
              ""
            )
          )}
        </tbody>
      </table>
      <div className="error-box">
        {callsData.length === 0 ? "No calls register on database." : ""}
        {callsData.length > 0 &&
        type !== "" &&
        callsData.find(call => call.type === type) === undefined
          ? "No calls found for this status."
          : ""}
      </div>
    </>
  );
};

export default Table;
