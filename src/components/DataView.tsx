import React, { useEffect, useState } from "react";
import { getData } from "../gapis/sheets";
import { ThenArg } from "../utils";

export function DataView() {
  const [data, setData] = useState<ThenArg<ReturnType<typeof getData>>>([]);
  useEffect(() => {
    (async () => {
      try {
        const newData = await getData();
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      <table>
        <thead>
          <tr>
            <td>Student Name</td>
            <td>Gender</td>
            <td>Class Level</td>
            <td>Home State</td>
            <td>Major</td>
            <td>Extracurricular Activity</td>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => (
            <tr key={i}>
              <td>{data.studentName}</td>
              <td>{data.gender}</td>
              <td>{data.classLevel}</td>
              <td>{data.homeState}</td>
              <td>{data.major}</td>
              <td>{data.extracurricularActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
