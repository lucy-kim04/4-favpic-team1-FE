import { useForm, FormProvider } from "react-hook-form";
import InputEmail from "@/components/molecules/InputEmail";
import InputPassword from "../molecules/InputPassword";
import InputText from "../molecules/InputText";
import InputTextBox from "../molecules/InputTextbox";
import InputDropdownRank from "../molecules/InputDropdownRank";
import InputSearch from "../molecules/InputSearch";
import InputUpload from "../molecules/InputUpload";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

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
        <InputText />
        <InputTextBox />
        <InputDropdownRank />
        <InputSearch />
        <InputUpload />
        <button className="text-white" type="submit">
          제출
        </button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
