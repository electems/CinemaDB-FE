import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { fetchData } from "../../Store/fetchDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { STATUSES } from "../../Store/fetchDataSlice";

const AuditionCallListPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state: RootState) => state.fetchData);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/auditioncall/deleteAuditionCall/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting audition call:", error);
    }
  };

  if (status === STATUSES.LOADING) {
    return (
      <img
        src="https://cdn.icon-icons.com/icons2/1812/PNG/512/4213447-arrow-load-loading-refresh-reload-restart-sync_115423.png"
        alt=""
      />
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <h3>
        Something Went Wrong !{" "}
        <img
          src="https://cdn.icon-icons.com/icons2/957/PNG/128/delete_icon-icons.com_74434.png"
          alt=""
        />
      </h3>
    );
  }
  return (
    <div className="userlist">
      <h2>Submitted Audition Call Details:</h2>
      {data.map((audition, index) => (
        <div key={index}>
          <h3>Audition {index + 1}</h3>
          <ul>
            <li>
              <strong>Audition Category:</strong> {audition.auditionCategory}
            </li>
            <li>
              <strong>Audition Description:</strong>
              {""}
              {audition.auditionDescription}
            </li>
            <li>
              <strong>Gender:</strong> {audition.gender}
            </li>
          </ul>
          <div className="action-buttons">
            <button type="button" onClick={() => handleDelete(audition.id)}>
              Delete
            </button>
            <button type="button">
              <Link to={`/audition/${audition.id}`}>Edit</Link>
            </button>
          </div>
          <hr />
        </div>
      ))}
      <button type="submit">
        <Link to="/audition">Create Form</Link>
      </button>
    </div>
  );
};

export default AuditionCallListPage;
