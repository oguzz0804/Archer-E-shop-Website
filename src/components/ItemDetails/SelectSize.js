import React from "react";

export const SelectSize = ({ talle, talleSelect }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          const chooseSize = e.target.value;
          talleSelect(chooseSize);
        }}
      >
        <option value={0}>Available stock</option>
        {talle &&
          talle.map((t) => (
            <option value={t} key={`talle-${t}`}>
              {t}
            </option>
          ))}
      </select>
    </div>
  );
};
