import React from 'react';

const Room = () => {
  // Sample classroom data (replace with actual data)
  const classrooms = [
    { id: 1, name: 'Room 101', capacity: 30 },
    { id: 2, name: 'Room 102', capacity: 25 },
    { id: 3, name: 'Room 103', capacity: 28 },
    { id: 4, name: 'Room 104', capacity: 35 },
    // Add more classrooms as needed
  ];

  return (
    <div className="container mt-5">
      <h1>Arundel School Classrooms</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map(classroom => (
            <tr key={classroom.id}>
              <td>{classroom.name}</td>
              <td>{classroom.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Room;
