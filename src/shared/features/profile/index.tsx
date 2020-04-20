import { withFormik } from "formik";
import React from "react";
import ProfileForm, {
  Props as ProfileFormProps
} from "../../components/profile-form";
import { Container, Title } from "./styles";

export type FormValues = {
  avatar?: string;
  firstName?: string;
};

type FormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<any>;
};

const ProfileWrapper = withFormik<FormProps & ProfileFormProps, FormValues>({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => {
    return initialValues;
  },
  handleSubmit: async (values, { setStatus, props: { onSubmit } }) => {
    try {
      await onSubmit(values);
    } catch {
      setStatus("Something went weird.");
    }
  }
})(ProfileForm);

const Profile: React.FC = () => {
  const handleSubmit = async (values: FormValues) => {
    console.log("submit", values);
    Promise.reject("nope");
  };

  const handleDrop = (files: any) => {
    console.log("handleDrop", files);
  };

  return (
    <Container>
      <Title>Profile</Title>
      <ProfileWrapper
        onDrop={handleDrop}
        onSubmit={handleSubmit}
        initialValues={{ avatar: "", firstName: "" }}
      />
    </Container>
  );
};

export default Profile;
