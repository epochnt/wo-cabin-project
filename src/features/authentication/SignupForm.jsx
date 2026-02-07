import { useForm } from "react-hook-form";
import { useSignUp } from "../authentication/hooks";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function SignupForm() {
  const { signUp, isCreating } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function onSumbit({ fullName, email, password }) {
    signUp(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSumbit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", { required: "This is a required field" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "This is a required field",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isCreating}
          {...register("password", {
            required: "This is a required field",
            minLength: {
              value: 8,
              message: "Passwords needs min 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isCreating}
          {...register("passwordConfirm", {
            required: "This is a required field",
            validate: (val) => {
              return (
                val === getValues().password ||
                "Re-entered password does not match"
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
