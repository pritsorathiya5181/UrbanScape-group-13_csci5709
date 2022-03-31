import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';

import "./MyOrders.css";
import Table from "./OrdersTable";

const Genres = ({ values }) => {
    return (
      <>
        {values.map((genre, idx) => {
          return (
            <span key={idx} className="badge">
              {genre}
            </span>
          );
        })}
      </>
    );
  };

  export default function MyOrders(){

    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "TV Show",
            // First group columns
            columns: [
              {
                Header: "Name",
                accessor: "show.name"
              },
              {
                Header: "Type",
                accessor: "show.type"
              }
            ]
          },
          {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
              {
                Header: "Language",
                accessor: "show.language"
              },
              {
                Header: "Genre(s)",
                accessor: "show.genres",
                Cell: ({ cell: { value } }) => <Genres values={value} />
              },
              {
                Header: "Runtime",
                accessor: "show.runtime",
                Cell: ({ cell: { value } }) => {
                  const hour = Math.floor(value / 60);
                  const min = Math.floor(value % 60);
                  return (
                    <>
                      {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                      {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                    </>
                  );
                }
              },
              {
                Header: "Status",
                accessor: "show.status"
              }
            ]
          }
        ],
        []
      );

      const [data, setData] = useState([]);

      useEffect(() => {
        (async () => {
          const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
          setData(result.data);
        })();
      }, []);

      return (
        <div className="MyOrders">
          <Table columns={columns} data={data} />
        </div>
      );

  }