import React from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/BasicButton/BasicButton";

const AuthenticationForm = () => {
  return (
    <div>
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="header">
        <InputField
          // value={username}
          label="Username"
          // onChange={handleUsername}
          // error={errorCredentials.length}
          // helperText={errorCredentials}
        />
        <InputField
          // value={username}
          label="Password"
        />

        <Button text="Log in" />
      </div>
    </div>
  );
};

export default AuthenticationForm;
