import { forwardRef } from "react";

// 외부에서 들어오는 ref를 사용하기 위해 forwardRef를 사용.
const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  //focus:outline-none focus:border-stone-600 => 입력하려고 눌렀을 때 기존의 outline은 지우고 대신 border color 변경

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        className="text-sm font-bold uppercase text-stone-500"
        htmlFor={label}
      >
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} id={label} {...props} />
      ) : (
        <input ref={ref} className={classes} id={label} {...props} />
      )}
    </p>
  );
});

export default Input;
