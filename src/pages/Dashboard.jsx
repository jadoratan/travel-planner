import { useState } from 'react';

export default function Dashboard({navigatePage}) {
  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
      <button onClick={navigatePage}>log out</button>
    </div>
  );
}
