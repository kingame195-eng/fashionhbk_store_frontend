import { TextInput, PasswordInput, Select, Checkbox, Radio, FormGroup } from "@components/common";

function FormDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Form Components Demo</h1>

      <FormGroup label="Text Input" error="This field is required">
        <TextInput placeholder="Enter text" />
      </FormGroup>

      <FormGroup label="Password Input">
        <PasswordInput placeholder="Enter password" />
      </FormGroup>

      <FormGroup label="Select">
        <Select
          options={[
            { value: "", label: "Select an option" },
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
        />
      </FormGroup>

      <FormGroup label="Checkbox">
        <Checkbox label="I agree to the terms" />
      </FormGroup>

      <FormGroup label="Radio Group">
        <Radio name="group" value="1" label="Option 1" />
        <Radio name="group" value="2" label="Option 2" />
      </FormGroup>
    </div>
  );
}

export default FormDemo;
