import Input from "./Input.jsx";

export default function UserInput({onChange}) {
  return (
    <div id="user-input" onChange={onChange}>
      <div className="input-group">
        <Input inputId="initial" />
        <Input inputId="annual" />
      </div>
      <br />
      <div className="input-group">
        <Input inputId="expected" />
        <Input inputId="duration" />
      </div>
    </div>
  );
}
