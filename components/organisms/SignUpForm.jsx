import { useForm, FormProvider } from "react-hook-form";
import InputEmail from "@/components/molecules/InputEmail";
import InputPassword from "../molecules/InputPassword";

function SignUpForm() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log("폼 데이터", data);
  };
  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <InputEmail />
        <InputPassword />
        <button className="text-white" type="submit">
          제출
        </button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
