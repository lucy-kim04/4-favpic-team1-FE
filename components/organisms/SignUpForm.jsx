import { useForm, FormProvider } from "react-hook-form";
import InputEmail from "@/components/molecules/InputEmail";

function SignUpForm() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log("폼 데이터", data);
  };
  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <InputEmail />
        <button className="text-white" type="submit">
          제출
        </button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
