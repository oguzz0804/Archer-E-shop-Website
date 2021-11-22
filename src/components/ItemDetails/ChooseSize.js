import React from "react";

export const ChooseSize = ({ mySize, selectSize }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          const chooseSize = e.target.value;
          selectSize(chooseSize);
        }}
      >
        <option value={0}>Available stock</option>
        {mySize &&
          mySize.map((t) => (
            <option value={t} key={`mySize-${t}`}>
              {t}
            </option>
          ))}
      </select>
    </div>
  );
};
