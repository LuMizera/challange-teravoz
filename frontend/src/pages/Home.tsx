/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from "react";
import Navbar from "../components/Header";
import { Call } from "../models/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCalls,
  toggleCreateModal,
  toggleAttendModal,
  changeFilter
} from "../store/ducks/home/actions";
import { ApplicationState } from "../models";
import Table from "./components/home/Table";
import ModalCreate from "./components/home/ModalCreate";
import { setWebsocket } from "../store/ducks/user/actions";
import ModalAttend from "./components/home/ModalAttend";

const ws = new WebSocket("ws://localhost:5000/");

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const {
    home: { modals }
  } = useSelector((props: ApplicationState) => props);

  ws.onmessage = ({ data }) => {
    dispatch(loadCalls((JSON.parse(data) as unknown) as Call[]));
  };

  const toggleCreate = () => {
    dispatch(toggleCreateModal());
  };

  const toggleAttend = () => {
    dispatch(toggleAttendModal());
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilter(event.target.value));
  };

  useEffect(() => {
    dispatch(setWebsocket(ws));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title is-centered">
          <p>Dashboard</p>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <div className="select">
                  <select defaultValue="" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="call.new">New call</option>
                    <option value="call.standby">Standby call</option>
                    <option value="call.waiting">Waiting to be answered</option>
                    <option value="actor.entered">
                      Waiting for the attendant
                    </option>
                    <option value="call.ongoing">Call is ongoing</option>
                    <option value="actor.left">Client left</option>
                    <option value="call.finished">Call finished</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-6 header-container-button">
            <button className="button is-info" onClick={toggleAttend}>
              Attend #1 of Queue
            </button>
            <button className="button is-success" onClick={toggleCreate}>
              Create new Call
            </button>
          </div>
        </div>
        <Table />
      </div>
      {modals.createOpen ? <ModalCreate /> : ""}
      {modals.attendQueueModal ? <ModalAttend /> : ""}
    </>
  );
};

export default Home;
