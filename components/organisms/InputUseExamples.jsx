import { useForm } from "react-hook-form";
import InputPassword from "../molecules/InputPassword";
import InputText from "../molecules/InputText";
import InputTextBox from "../molecules/InputTextbox";
import InputDropdown from "../molecules/InputDropdown";
import InputSearch from "../molecules/InputSearch";
import InputUpload from "../molecules/InputUpload";

/**
 * input component 예시 입니다
 * 본 컴포넌트만 테스트 렌더링할 페이지에 불러와 주시면 됩니다.
 */

const options = [
  { value: "COMMON", label: "COMMON" },
  { value: "RARE", label: "RARE" },
  { value: "SUPER RARE", label: "SUPER RARE" },
  { value: "LEGENDARY", label: "LEGENDARY" },
];

function InputUseExamples() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      rank: "",
      photoCardName: "",
      password: "",
      email: "",
      search: "",
      description: "",
      file: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <InputText
        control={control}
        name={"photoCardName"}
        label={"포토카드 이름"}
        placeholder={"포토카드 이름을 입력해 주세요."}
        rules={{
          maxLength: { value: 20, message: "20자 이하로 작성해주세요." },
        }}
      />
      <InputText
        control={control}
        type={"email"}
        name={"email"}
        label={"이메일"}
        placeholder={"이메일을 입력해 주세요."}
        rules={{
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        }}
      />
      <InputPassword
        control={control}
        name={"password"}
        label={"비밀번호 확인"}
        placeholder={"비밀번호를 입력해 주세요."}
        rules={{
          required: "비밀번호는 필수 입력입니다.",
        }}
      />
      <InputSearch control={control} name={"search"} />
      <InputTextBox
        control={control}
        size={"lg"}
        name={"description"}
        label={"포토카드 설명"}
        placeholder={"카드 설명을 입력해 주세요."}
        rules={{
          required: "카드 설명은 필수 입력입니다.",
          maxLength: {
            value: 300,
            message: "300자 이하만 입력 가능합니다.",
          },
        }}
      />
      <InputDropdown
        control={control}
        name={"rank"}
        label={"등급"}
        placeholder={"등급을 선택해 주세요."}
        options={options}
      />

      <InputUpload
        control={control}
        name={"file"}
        label={"사진 업로드"}
        placeholder={"사진을 업로드해 주세요."}
      />
      <button className="text-white border p-5" type="submit">
        제출 버튼
      </button>
    </form>
  );
}

export default InputUseExamples;
