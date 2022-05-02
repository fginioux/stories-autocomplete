import React, { useEffect, useState } from "react";

export enum SortingOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SortingCriterion {
  POPULARITY = "points",
  DATE = "created_at_i",
}

const SortingFields: { [key: string]: string } = {
  [`${SortingCriterion.POPULARITY}`]: "Popularity",
  [`${SortingCriterion.DATE}`]: "Created Date",
};

const SortingField: React.FC<SortingFieldProps> = ({ value, onChange }) => {
  const [state, setState] = useState<SortingFieldValue>(value);

  useEffect(() => {
    onChange(state);
  }, [state, onChange]);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;

    setState((st: any) => {
      return { ...st, [name]: value };
    });
  };

  return (
    <div className="ui form">
      <div className="inline fields">
        <div className="Sorting-criterions">
          {Object.keys(SortingCriterion).map((k) => {
            const c = (SortingCriterion as any)[k];
            return (
              <div className="ui radio checkbox" key={`sorting-criterion-${c}`}>
                <input
                  checked={state.criterion === c}
                  type="radio"
                  name="criterion"
                  value={c}
                  id={`criterion-${c}`}
                  onChange={handleChanges}
                />
                <label htmlFor={`criterion-${c}`}>{SortingFields[c]}</label>
              </div>
            );
          })}
        </div>

        <select
          className="ui fluid dropdown"
          onChange={handleChanges}
          name="order"
          value={state.order}
          data-testid="order-by-dropdown"
        >
          {Object.keys(SortingOrder).map((order) => (
            <option key={`sorting-order-${order}`} value={order}>
              {order}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortingField;

export const DefaultSortingOrder: SortingOrder = SortingOrder.ASC;

export const DefaultSortingCriterion: SortingCriterion = SortingCriterion.DATE;

export type SortingFieldValue = {
  criterion: SortingCriterion;
  order: SortingOrder;
};

interface SortingFieldProps {
  value: SortingFieldValue;
  onChange: (v: SortingFieldValue) => void;
}
