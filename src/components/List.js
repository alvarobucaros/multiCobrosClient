import React from 'react';

const List = ({ data, children }) => {
    return (
      <ul>
        {Object.entries(data).map(([ key, description ]) => 
          <li key={key}>
            {children({ key, description })}
          </li>
        )}
      </ul>
    );
  };

export default List;