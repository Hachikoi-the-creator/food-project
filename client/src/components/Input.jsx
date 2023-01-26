import { useRef } from "react";

export default function Input({ e: { name, type, tag }, blurHandler }) {
  const inputRef = useRef();

  return (
    <div className={`input ${name}`}>
      <label htmlFor={name}>{tag || name}</label>
      <input
        type={type}
        placeholder={`Enter a ${tag || name}`}
        id={name}
        ref={inputRef}
        onBlur={() => blurHandler(name, inputRef.current.value)}
      />
      {/* {!!error && <p className="error">Invalid input format</p>} */}
    </div>
  );
}
