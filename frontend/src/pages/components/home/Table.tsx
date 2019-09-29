import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState, Call } from "../../../models";
import TableLine from "./TableLine";

const Table = () => {
  const {
    home: { data: callsData }
  } = useSelector((props: ApplicationState) => props);

  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Queue Position</th>
          <th>Status</th>
          <th>Client Number</th>
          <th>Client Name</th>
          <th>Last Change</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {callsData.map((call: Call) => (
          <TableLine key={call.call_id} call={call} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
