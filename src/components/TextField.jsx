import { useState } from 'react';

export default function TextField({fieldName, variable, handleEvent, type}){
    return(
      <>
        <label htmlFor={`${fieldName}-input`} className="text-field-label">
          Enter {fieldName}:
        </label>
        <input
          id={`${fieldName}-input`}
          type={type}
          value={variable} 
          onChange={handleEvent} 
          placeholder={`enter ${fieldName}`}
          className='text-fields'
        />

        {/*for testing purposes*/}
        <p><strong>Current {fieldName}:</strong> {variable}</p>
      </>
    );
  }