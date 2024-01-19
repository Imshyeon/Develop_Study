import Input from './Input.jsx'

export default function UserInput() {
  return (
    <>
      <div id="user-input">
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
    </>
  );
}
